import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { path: "/ws" });

io.on("connection", socket => {
  console.log("Player connected:", socket.id);
  socket.on("flap", () => console.log("Flap from", socket.id));
});

app.get("/", (_, res) => res.send("Game server is running 🚀"));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
