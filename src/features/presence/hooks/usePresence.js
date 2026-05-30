"use client";

import { useEffect, useState } from "react";
import socket from "@/shared/socket/socketClient";

export const usePresence = (roomId = "landing-page") => {
    const [presence, setPresence] = useState({
        users: [],
        count: 0
    });
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        let userId = localStorage.getItem("nexus_user_id");
        let userName = localStorage.getItem("nexus_user_name");
        let userColor = localStorage.getItem("nexus_user_color");

        if (!userId) {
            userId = crypto.randomUUID();
            userName = `Explorer_${userId.substring(0, 8)}`;
            userColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            
            localStorage.setItem("nexus_user_id", userId);
            localStorage.setItem("nexus_user_name", userName);
            localStorage.setItem("nexus_user_color", userColor);
        }

        const user = {
            id: userId,
            name: userName,
            color: userColor
        };

        function onConnect() {
            setIsConnected(true);
            socket.emit("presence:join", { roomId, user });
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onPresenceUpdate(data) {
            setPresence(data);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("presence:update", onPresenceUpdate);

        if (socket.connected) {
            onConnect();
        } else {
            socket.connect();
        }

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("presence:update", onPresenceUpdate);
            socket.emit("presence:leave", { roomId, userId });
        };
    }, [roomId]);

    return { ...presence, isConnected };
};