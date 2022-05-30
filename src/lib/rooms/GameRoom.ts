import { Dispatcher } from '@colyseus/command';
import { Room, Client, updateLobby } from 'colyseus';

import {
  OnPlayerJoinRoomCommand,
  OnPlayerLeaveRoomCommand,
  OnPlayerJoinRoomCommandData,
  OnEndMovement
} from '../commands';
import { createGameId } from '../gameId';
import { GameSchema } from '../schemas';

export type OnJoinRoomData = { player: OnPlayerJoinRoomCommandData };

export default class GameRoom extends Room<GameSchema> {
  LOBBY_CHANNEL = 'lobby';

  dispatcher = new Dispatcher(this);

  // number of clients per room
  maxClients = 2;

  // do not delete the room once created!
  autoDispose = false;

  async generateRoomId(): Promise<string> {
    const currentIds = await this.presence.smembers(this.LOBBY_CHANNEL);
    let id;
    do {
      id = createGameId();
    } while (currentIds.includes(id));

    await this.presence.sadd(this.LOBBY_CHANNEL, id);

    return id;
  }

  async onCreate() {
    this.roomId = await this.generateRoomId();
    this.setState(
      new GameSchema({
        turn: 0,
        movements: 0,
        winner: -1
      })
    );

    this.onMessage('MOVE_DISC', (client, data) => {
      this.dispatcher.dispatch(new OnEndMovement(), data);
    });

    this.clock.setTimeout(() => {
      updateLobby(this);
    }, 5000);
  }

  onJoin(client: Client, data: OnJoinRoomData) {
    if (!data?.player) return;

    const player = {
      name: data.player.name,
      email: data.player.email,
      id: this.clients.length === 2 ? 1 : 0,
      sessionId: client.id
    };

    this.dispatcher.dispatch(new OnPlayerJoinRoomCommand(), player);

    if (this.clients.length === this.maxClients) {
      this.lock();
    }
  }

  onLeave(client: Client) {
    // update players
    this.dispatcher.dispatch(new OnPlayerLeaveRoomCommand(), client.id);
    this.unlock();
  }

  onDispose() {
    this.dispatcher.stop();
    this.clock.clear();
  }
}
