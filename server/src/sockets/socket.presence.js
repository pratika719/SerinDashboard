import { SOCKET_EVENTS }
from "./socket.events.js";

import {
    addPresence,
    removePresence,
    removeSocketFromAllRooms,
    getRoomUsers,
} from "../services/presence.service.js";

import {
    removeCursor,
    getRoomCursors,
} from "../services/cursor.service.js";

import {
    joinRoom,
    leaveRoom,
} from "./socket.rooms.js";

import {
    emitPresenceUpdate,
} from "./socket.emitter.js";

export const registerPresenceEvents = ({
    io,
    socket,
}) => {

    socket.on(
        SOCKET_EVENTS.PRESENCE_JOIN,
        ({ roomId, user }) => {

            socket.userId = user.id;

            joinRoom({
                socket,
                roomId,
            });

            addPresence({
                roomId,
                user,
                socketId: socket.id,
            });

            const existingCursors = getRoomCursors(roomId);
            Object.entries(existingCursors).forEach(([uId, cursorData]) => {
                if (uId !== user.id) {
                    socket.emit(SOCKET_EVENTS.CURSOR_UPDATE, {
                        userId: uId,
                        ...cursorData,
                    });
                }
            });

            const users =
                getRoomUsers(roomId);

            emitPresenceUpdate({
                io,
                roomId,
                users,
            });

        }
    );

    socket.on(
        SOCKET_EVENTS.PRESENCE_LEAVE,
        ({ roomId, userId }) => {

            leaveRoom({
                socket,
                roomId,
            });

            removePresence({
                roomId,
                userId,
                socketId: socket.id,
            });

            removeCursor({
                roomId,
                userId,
            });

            socket.to(roomId).emit(
                SOCKET_EVENTS.CURSOR_UPDATE,
                {
                    userId,
                    x: null,
                    y: null,
                }
            );

            const users =
                getRoomUsers(roomId);

            emitPresenceUpdate({
                io,
                roomId,
                users,
            });

        }
    );

    socket.on(
        SOCKET_EVENTS.DISCONNECT,
        () => {
            const userId = socket.userId;
            const affectedRooms =
                removeSocketFromAllRooms({
                    socketId: socket.id,
                    userId: socket.userId,
                });

            affectedRooms.forEach(
                (roomId) => {

                    if (userId) {
                        removeCursor({
                            roomId,
                            userId,
                        });

                        socket.to(roomId).emit(
                            SOCKET_EVENTS.CURSOR_UPDATE,
                            {
                                userId,
                                x: null,
                                y: null,
                            }
                        );
                    }

                    const users =
                        getRoomUsers(roomId);

                    emitPresenceUpdate({
                        io,
                        roomId,
                        users,
                    });

                }
            );

        }
    );

};