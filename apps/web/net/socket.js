export const GameSockets = (function () {
  let socket = null;
  let searchRoomCb = null;
  let onGotConnection = null;
  let roomOnUpdateClb = null;
  function setConnection(serverUrl, name, clb, roomOnClb) {
    socket = io(serverUrl, {
      auth: {
        userName: name,
      },
    });

    roomOnUpdateClb = roomOnClb;

    socket.on("connect", () => {
      clb(socket);
    });

    socket.on("findRoom", (roomData) => {
      roomOnUpdateClb(roomData);
    });
  }

  return { setConnection };
})();
