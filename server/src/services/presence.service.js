import {
    roomPresence,
    socketRooms,
} from "../state/presence.state.js";

import { toId } from "../utils/socket.utils.js";

export const addPresence = ({
    roomId,
    user,
    socketId,
}) => {

    roomId = toId(roomId);
    const userId = toId(user.id);
    let isNewUser = false;

    if (!roomPresence.has(roomId)) {
        roomPresence.set(roomId, new Map());
    }

    const roomUsers = roomPresence.get(roomId);

    if (!roomUsers.has(userId)) {

        roomUsers.set(userId, {
            user,
            socketIds: new Set(),
        });
        isNewUser = true;

    } else {
        const entry = roomUsers.get(userId);
        entry.user = user;
    }

    roomUsers.get(userId)
        .socketIds
        .add(socketId);

    if (!socketRooms.has(socketId)) {
        socketRooms.set(socketId, new Set());
    }

    socketRooms.get(socketId).add(roomId);

    return isNewUser;
};

export const removePresence = ({
    roomId,
    userId,
    socketId,
}) => {

    roomId = toId(roomId);
    let targetUserId = userId ? toId(userId) : null;
    let wasUserRemoved = false;

    const roomUsers = roomPresence.get(roomId);

    if (!roomUsers) return false;

    if (!targetUserId) {
        for (const [uId, presence] of roomUsers.entries()) {
            if (presence.socketIds.has(socketId)) {
                targetUserId = uId;
                break;
            }
        }
    }

    if (!targetUserId) return false;

    const presence = roomUsers.get(targetUserId);

    if (!presence) return false;

    presence.socketIds.delete(socketId);

    if (presence.socketIds.size === 0) {
        roomUsers.delete(targetUserId);
        wasUserRemoved = true;
    }

    if (roomUsers.size === 0) {
        roomPresence.delete(roomId);
    }

    const joinedRooms = socketRooms.get(socketId);

    if (joinedRooms) {

        joinedRooms.delete(roomId);

        if (joinedRooms.size === 0) {
            socketRooms.delete(socketId);
        }

    }

    return wasUserRemoved;
};

export const removeSocketFromAllRooms = ({
    socketId,
    userId,
}) => {

    const joinedRooms = socketRooms.get(socketId);

    if (!joinedRooms) {
        return [];
    }

    const affectedRooms = Array.from(joinedRooms);

    for (const roomId of affectedRooms) {

        removePresence({
            roomId,
            userId,
            socketId,
        });

    }

    socketRooms.delete(socketId);

    return affectedRooms;

};

export const getRoomUsers = (roomId) => {

    roomId = toId(roomId);

    const roomUsers = roomPresence.get(roomId);

    if (!roomUsers) {
        return [];
    }

    return Array.from(
        roomUsers.values()
    ).map((entry) => entry.user);

};