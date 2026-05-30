import { Server }
from "socket.io";

import {
    registerPresenceEvents,
} from "./src/sockets/socket.presence.js";

import {
    registerCursorEvents,
} from "./src/sockets/cursor.socket.js";

import {
    registerReactionEvents,
} from "./src/sockets/socket.reaction.js";

export const initializeSocketServer = (
    httpServer
) => {

    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {

        console.log(
            `Socket connected: ${socket.id}`
        );

        registerPresenceEvents({
            io,
            socket,
        });

        registerCursorEvents({
            io,
            socket,
        });

        registerReactionEvents({
            io,
            socket,
        });

    });

    return io;

};