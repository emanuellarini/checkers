import { Command } from '@colyseus/command';
import { ArraySchema } from '@colyseus/schema';

import { defaultDiscs } from '../defaultDiscs';
import GameRoom from '../rooms/GameRoom';
import { DiscSchema } from '../schemas';

export class OnRematchCommand extends Command<GameRoom> {
  execute() {
    this.state.discs = new ArraySchema(
      ...defaultDiscs.map(disc => new DiscSchema().assign(disc))
    );
    this.state.turn = 0;
    this.state.movements = 0;
    this.state.winner = -1;

    this.room.broadcast('REMATCH', this.state);
  }
}
