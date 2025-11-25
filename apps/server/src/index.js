import { createServer, Server } from "http";
import express from "express";
// ------------ Конфиг -------------
const PORT = process.env.PORT || 3000;
const TICK_RATE = 60; // серверный тик в Hz
const PIPE_SPAWN_MS = 1500; // каждые 1.5s новая труба
const PIPE_SPEED = 100; // px/s — скорость движения труб влево
const GRAVITY = 900; // px/s^2
const JUMP_VELOCITY = -320; // px/s
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const PIPE_WIDTH = 60;
const GAP_SIZE = 140;
const ROOM_CLEANUP_AFTER_MS = 10_000; // удаляем комнату через 10s после конца/пустая

// ------------ Инициализация -------------
// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: { origin: "*" },
// });

// app.use(express.static("../../web/")); // отдаём фронт из /public

// ------------ Хранилище комнат -------------
/*
rooms: Map<roomId, Room>
Room = {
  id, hostId, players: Map<socketId, Player>,
  maxPlayers, status, pipes: Array<Pipe>, tickHandle, lastPipeSpawnAt, createdAt
}
Player = { id(socketId), x, y, vy, alive, joinedAt, lastInputSeq }
Pipe = { id, x, gapY }
*/
const rooms = new Map();

const makeId = (len = 6) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex")
    .slice(0, len)
    .toUpperCase();
};

console.log(makeId());
