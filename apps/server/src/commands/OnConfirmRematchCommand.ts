import { defaultDiscs } from '@checkers/game-common';

import { Command } from '@colyseus/command';
import { ArraySchema } from '@colyseus/schema';

import { DiscSchema } from '../schemas';

export class OnConfirmRematchCommand extends Command {
  execute() {
    this.state.confirmedRematch = this.state.confirmedRematch + 1;

    if (this.state.confirmedRematch === 2) {
      this.state.discs = new ArraySchema(
        ...defaultDiscs.map(disc => new DiscSchema().assign(disc))
      );
      this.state.turn = this.state.winner === 1 ? 0 : 1;
      this.state.movements = 0;
      this.state.winner = -1;
      this.state.confirmedRematch = 0;
      this.state.players[0].capturedDiscs = 0;
      this.state.players[0].capturedKings = 0;
      this.state.players[1].capturedDiscs = 0;
      this.state.players[1].capturedKings = 0;

      this.room.broadcast('REMATCH', this.state);
    }
  }
}
