import { monitor } from '@colyseus/monitor';
import { Server } from 'colyseus';
import cors from 'cors';
import express from 'express';
import http from 'http';

import GameRoom from './rooms/GameRoom';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use('/colyseus', monitor());

// Create HTTP & WebSocket servers
const server = http.createServer(app);
const gameServer = new Server({
  server
});
gameServer.define('game', GameRoom).enableRealtimeListing();

server.listen(port);
console.log(`Server started on port ${port}`);
