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

// --------------------------
// Типы
// --------------------------

interface Player {
  id: string;
  name: string;
}

interface Room {
  id: string;
  players: Player[];
  state: any;
  tickInterval: NodeJS.Timeout | null;
}

// --------------------------

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
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

console.log(makeId());

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
