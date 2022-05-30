import { Command } from '@colyseus/command';

import GameRoom from '../rooms/GameRoom';

export type OnPlayerLeaveRoomCommandData = Player['sessionId'];

export class OnPlayerLeaveRoomCommand extends Command<GameRoom> {
  execute(sessionId: OnPlayerLeaveRoomCommandData) {
    const index = this.state.players.findIndex(
      player => player.sessionId === sessionId
    );

    if (index !== -1) {
      this.state.players.splice(index);

      this.room.broadcast('PLAYER_LEFT_ROOM', index);
    }
  }
}
