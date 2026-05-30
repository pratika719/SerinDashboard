import express from "express";
import { createServer } from "http";
import cors from "cors";
import { initializeSocketServer } from "./socketServer.js";

const app = express();

app.use(cors());

const server = createServer(app);

initializeSocketServer(server);

server.listen(4000, () => {
  console.log("Socket server running on port 4000");
});