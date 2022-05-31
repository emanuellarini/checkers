import { Command } from '@colyseus/command';
import { Client } from 'colyseus';

import GameRoom from '../rooms/GameRoom';

export type OnPlayerLeaveRoomCommandData = {
  client: Client;
  consented?: boolean;
};

export class OnPlayerLeaveRoomCommand extends Command<GameRoom> {
  async execute({ client, consented }: OnPlayerLeaveRoomCommandData) {
    const index = this.state.players.findIndex(
      player => player.sessionId === client.sessionId
    );

    this.room.unlock();

    try {
      if (consented) {
        throw new Error();
      }

      this.state.players[index].isConnected = false;

      this.room.broadcast('PLAYER_DISCONNECTED_ROOM', index, {
        except: client
      });

      await this.room.allowReconnection(client);

      this.state.players[index].isConnected = true;

      this.room.broadcast('PLAYER_JOINED_ROOM', this.state);
    } catch (e) {
      this.state.players.splice(index);

      this.room.broadcast('PLAYER_LEFT_ROOM', index);
    }
  }
}
