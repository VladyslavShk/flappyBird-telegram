export const GameSockets = (function () {
  let socket = null;
  let searchRoomCb = null;

  function setConnection(serverUrl) {
    socket = io(serverUrl);
  }

  function findRoom(serverUrl) {
    socket.on("find-room", (room) => {
      if (searchRoomCb) searchRoomCb(room);
    });
  }
  function onSearchRoomUpdate(cb) {
    searchRoomCb = cb;
  }

  function disconnectRoomSearch() {
    if (!socket) return;

    socket.off("find-room");
  }

  return { findRoom, disconnectRoomSearch };
})();
