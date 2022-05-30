import { Command } from '@colyseus/command';

import { defaultDiscs } from '../defaultDiscs';
import GameRoom from '../rooms/GameRoom';
import { DiscSchema } from '../schemas';

export class OnCreateGame extends Command<GameRoom> {
  execute() {
    if (!this.room.state.discs.length) {
      defaultDiscs.map(disc =>
        this.room.state.discs.push(new DiscSchema(disc))
      );
    }

    // Bug?
    console.log(
      'OnCreateGame',
      this.room.state.discs[0],
      this.room.state.discs.at(0)
    );
  }
}
