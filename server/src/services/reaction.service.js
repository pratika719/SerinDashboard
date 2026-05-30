import { roomReactions }
from "../state/reaction.state.js";

import { toId }
from "../utils/socket.utils.js";

export const addReaction = ({
    roomId,
    reaction,
}) => {

    roomId = toId(roomId);

    if (!roomReactions.has(roomId)) {
        roomReactions.set(roomId, []);
    }

    const reactions =
        roomReactions.get(roomId);

    reactions.push(reaction);

    if (reactions.length > 100) {
        reactions.shift();
    }

};