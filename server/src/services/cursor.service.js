import { roomCursors }
from "../state/cursor.state.js";

import { toId }
from "../utils/socket.utils.js";

export const updateCursor = ({
    roomId,
    userId,
    cursor,
}) => {

    roomId = toId(roomId);
    userId = toId(userId);

    if (!roomCursors.has(roomId)) {
        roomCursors.set(roomId, new Map());
    }

    const roomUsers =
        roomCursors.get(roomId);

    roomUsers.set(userId, {
        x: cursor.x,
        y: cursor.y,
        name: cursor.name,
        color: cursor.color,
    });

};

export const removeCursor = ({
    roomId,
    userId,
}) => {

    roomId = toId(roomId);
    userId = toId(userId);

    const roomUsers =
        roomCursors.get(roomId);

    if (!roomUsers) return;

    roomUsers.delete(userId);

    if (roomUsers.size === 0) {
        roomCursors.delete(roomId);
    }

};

export const getRoomCursors = (
    roomId
) => {

    roomId = toId(roomId);

    const roomUsers =
        roomCursors.get(roomId);

    if (!roomUsers) {
        return {};
    }

    return Object.fromEntries(
        roomUsers
    );

};