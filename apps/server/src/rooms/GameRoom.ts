import { Dispatcher } from '@colyseus/command';
import { Room, Client } from 'colyseus';
import crypto from 'crypto';

import {
  OnPlayerJoinRoomCommand,
  OnPlayerJoinRoomCommandData,
  OnEndMovementCommand,
  OnEndTurnCommand,
  OnConfirmRematchCommand,
  OnPlayerLeaveRoomCommand
} from '../commands';
import { GameSchema } from '../schemas';

export type OnJoinRoomData = { player: OnPlayerJoinRoomCommandData };

export default class GameRoom extends Room<GameSchema> {
  dispatcher = new Dispatcher(this);

  // number of clients per room
  override maxClients = 2;

  // do not delete the room once created!
  override autoDispose = false;

  override onAuth(client: Client, data: OnJoinRoomData) {
    if (this.state.players.some(p => p.email === data.player.email))
      return true;

    return this.clients.length <= this.maxClients;
  }

  override onCreate() {
    this.roomId = crypto.randomBytes(10).toString('hex').slice(0, 10);
    this.setState(
      new GameSchema({
        confirmedRematch: 0,
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

    this.onMessage('CONFIRM_REMATCH', () => {
      this.dispatcher.dispatch(new OnConfirmRematchCommand());
    });
  }

  override async onJoin(client: Client, data: OnJoinRoomData) {
    if (!data?.player) {
      throw new Error('Invalid player data');
    }

    const player = {
      name: data.player.name,
      email: data.player.email,
      id: this.clients.length === 2 ? 1 : 0,
      sessionId: client.id
    };

    this.dispatcher.dispatch(new OnPlayerJoinRoomCommand(), player);

    if (this.clients.length === this.maxClients) {
      await this.lock();
    }
  }

  override onLeave(client: Client, consented: boolean) {
    this.dispatcher.dispatch(new OnPlayerLeaveRoomCommand(), {
      client,
      consented
    });
  }

  override onDispose() {
    this.dispatcher.stop();
  }
}
