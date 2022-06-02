import { monitor } from '@colyseus/monitor';
import { Server } from 'colyseus';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import next from 'next';

import GameRoom from '../lib/rooms/GameRoom';

const dev = process.env.NODE_ENV !== 'production';
const port = Number(process.env.PORT || 3000);
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  app.use(cors({ origin: '*', credentials: true }));
  app.use(express.json());
  const server = createServer(app);
  const gameServer = new Server({ server });

  app.use('/colyseus', monitor());

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  gameServer.define('game', GameRoom).enableRealtimeListing();

  gameServer.listen(Number(port));
  console.log(`Listening on ws://localhost:${port}`);
});
