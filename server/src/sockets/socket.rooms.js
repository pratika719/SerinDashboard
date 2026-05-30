export const joinRoom = ({
    socket,
    roomId,
}) => {

    socket.join(roomId);

};

export const leaveRoom = ({
    socket,
    roomId,
}) => {

    socket.leave(roomId);

};