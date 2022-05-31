import { Dispatcher } from '@colyseus/command';
import { Room, Client, updateLobby } from 'colyseus';

import {
  OnPlayerJoinRoomCommand,
  OnPlayerJoinRoomCommandData,
  OnEndMovementCommand,
  OnEndTurnCommand,
  OnRematchCommand,
  OnPlayerLeaveRoomCommand
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

  onAuth(client: Client, data: OnJoinRoomData) {
    if (this.state.players.some(p => p.email === data.player.email))
      return true;

    return this.clients.length <= this.maxClients;
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

    this.onMessage('END_MOVEMENT', (client, data) => {
      this.dispatcher.dispatch(new OnEndMovementCommand(), data);
    });

    this.onMessage('END_TURN', () => {
      this.dispatcher.dispatch(new OnEndTurnCommand());
    });
    this.onMessage('REMATCH', () => {
      this.dispatcher.dispatch(new OnRematchCommand());
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

  onLeave(client: Client, consented: boolean) {
    this.dispatcher.dispatch(new OnPlayerLeaveRoomCommand(), {
      client,
      consented
    });
  }

  onDispose() {
    this.dispatcher.stop();
    this.clock.clear();
  }
}
