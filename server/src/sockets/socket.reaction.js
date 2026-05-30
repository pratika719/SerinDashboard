import { SOCKET_EVENTS }
from "./socket.events.js";

import {
    addReaction,
} from "../services/reaction.service.js";

import {
    emitReaction,
} from "./socket.emitter.js";

export const registerReactionEvents = ({
    io,
    socket,
}) => {

    socket.on(
        SOCKET_EVENTS.REACTION_ADD,
        ({
            roomId,
            reaction,
        }) => {

            const payload = {
                id: crypto.randomUUID(),

                emoji: reaction.emoji,

                x: reaction.x,
                y: reaction.y,

                user: reaction.user,

                createdAt: Date.now(),
            };

            addReaction({
                roomId,
                reaction: payload,
            });

            emitReaction({
                io,
                roomId,
                reaction: payload,
            });

        }
    );

};