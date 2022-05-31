import { Command } from '@colyseus/command';

import GameRoom from '../rooms/GameRoom';

export class OnEndTurnCommand extends Command<GameRoom> {
  execute() {
    this.state.turn = this.state.turn === 0 ? 1 : 0;
    this.state.movements = 0;

    this.room.broadcast('END_TURN', {
      turn: this.state.turn,
      movements: this.state.movements
    });
  }
}
