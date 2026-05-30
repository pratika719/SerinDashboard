import { SOCKET_EVENTS }
from "./socket.events.js";

export const emitPresenceUpdate = ({
    io,
    roomId,
    users,
}) => {

    io.to(roomId).emit(
        SOCKET_EVENTS.PRESENCE_UPDATE,
        {
            users,
            count: users.length,
        }
    );

};


export const emitCursorUpdate = ({
    socket,
    roomId,
    cursor,
}) => {

    socket.to(roomId).emit(
        SOCKET_EVENTS.CURSOR_UPDATE,
        cursor
    );

};

export const emitReaction = ({
    io,
    roomId,
    reaction,
}) => {

    io.to(roomId).emit(
        SOCKET_EVENTS.REACTION_NEW,
        reaction
    );

};