import { Player } from '@checkers/game-interfaces';

import { Command } from '@colyseus/command';

import GameRoom from '../rooms/GameRoom';
import { PlayerSchema } from '../schemas';

export type OnPlayerJoinRoomCommandData = Pick<
  Player,
  'id' | 'name' | 'email' | 'sessionId'
>;
export class OnPlayerJoinRoomCommand extends Command<
  GameRoom,
  OnPlayerJoinRoomCommandData
> {
  execute(data: OnPlayerJoinRoomCommandData) {
    const playerData = {
      ...data,
      isConnected: true,
      wins: 0,
      losses: 0,
      capturedKings: 0,
      capturedDiscs: 0
    };

    const player = new PlayerSchema().assign(playerData);

    if (
      !this.room.state.players.some(player => player.email === playerData.email)
    ) {
      this.room.state.players.push(player);
    }

    this.room.broadcast('PLAYER_JOINED_ROOM', this.room.state);
  }
}
