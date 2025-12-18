// server/index.ts
import http from "http";
import express from "express";
import { Server, Socket } from "socket.io";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "../../");
const PORT = process.env.port || 3000;
const TICK_RATE = 60;

// --------------------------
// Типы
// --------------------------
type RoomState = "waiting" | "ready" | "countdown" | "playing" | "finished";

interface Player {
  id: string;
  name: string;
}

interface Room {
  id: string;
  players: Player[];
  state: RoomState;
  tickInterval: NodeJS.Timeout | null;
  maxPlayers: number;
}

// --------------------------

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.static(path.join(PROJECT_ROOT, "web")));

// Хранилище комнат
const rooms: Map<string, Room> = new Map();

const makeId = (len = 6) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex")
    .slice(0, len)
    .toUpperCase();
};

io.on("connect", (socket) => {
  socket.join("lobby");

  socket.on("findRoom", (_, ack) => {
    console.log("findRoom");
    const player: Player = {
      id: socket.id,
      name: socket.handshake.auth.userName,
    };
    console.log(player);
    const room = findRoomForPlayer(player);
    socket.data.roomId = room.id;
    if (room.maxPlayers === room.players.length) room.state = "ready";

    console.log(rooms);
    socket.leave("lobby");
    socket.join(room.id);

    if (room.maxPlayers === room.players.length) {
      io.to(room.id).emit("findRoom", serializedRoom(room));
    } else {
      io.to(room.id).emit("findRoom", serializedRoom(room));
    }
  });
});

const serializedRoom = (room: Room) => {
  return {
    state: room.state,
    players: room.players,
  };
};

const startGame = (room: Room) => {
  const dt = 1000 / TICK_RATE;
  room.state = "playing";
  room.tickInterval = setInterval(() => roomTick(room), dt);
};

const roomTick = (room: Room) => {
  io.to(room.id).emit("room-update", {
    players: room.players,
  });
};

const findRoomForPlayer = (player: Player): Room => {
  const room = Array.from(rooms.values()).find((room) => {
    return room.state === "waiting";
  });

  if (room) {
    room.players.push(player);
    return room;
  } else {
    const id = makeId(6);
    let newRoom: any = {
      id: id,
      players: [player],
      state: "waiting",
      tickInterval: null,
      maxPlayers: 2,
    };
    rooms.set(id, newRoom);

    return newRoom;
  }
};

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
