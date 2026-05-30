import { SOCKET_EVENTS }
from "./socket.events.js";

import {
    updateCursor,
    removeCursor,
} from "../services/cursor.service.js";

import {
    emitCursorUpdate,
} from "./socket.emitter.js";

export const registerCursorEvents = ({
    io,
    socket,
}) => {

    socket.on(
        SOCKET_EVENTS.CURSOR_MOVE,
        ({
            roomId,
            userId,
            cursor,
        }) => {

            socket.roomId = roomId;
            socket.userId = userId;

            updateCursor({
                roomId,
                userId,
                cursor,
            });

            emitCursorUpdate({
                socket,
                roomId,
                cursor: {
                    userId,
                    ...cursor,
                },
            });

        }
    );

    socket.on(
        SOCKET_EVENTS.DISCONNECT,
        () => {

            if (
                socket.roomId &&
                socket.userId
            ) {

                removeCursor({
                    roomId: socket.roomId,
                    userId: socket.userId,
                });

                socket.to(socket.roomId).emit(
                    SOCKET_EVENTS.CURSOR_UPDATE,
                    {
                        userId: socket.userId,
                        x: null,
                        y: null,
                    }
                );

            }

        }
    );

};