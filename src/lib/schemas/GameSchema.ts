import { Schema, type, ArraySchema } from '@colyseus/schema';

import { defaultDiscs } from '../defaultDiscs';

export class PlayerSchema extends Schema implements Player {
  @type('number')
  id = 0;

  @type('string')
  sessionId = '';

  @type('string')
  name = '';

  @type('string')
  email = '';

  @type('number')
  wins = 0;

  @type('number')
  losses = 0;

  @type('number')
  capturedDiscs = 0;

  @type('number')
  capturedKings = 0;
}

export class DiscSchema extends Schema implements Disc {
  @type('string')
  id = 'disc';

  @type('number')
  player = -1;

  @type('boolean')
  isKing = false;

  @type('number')
  position = -1;
}

export class GameSchema extends Schema {
  @type('number')
  winner = -1;

  @type('number')
  movements = 0;

  @type('number')
  turn = 0;

  @type({ map: PlayerSchema })
  players: ArraySchema<PlayerSchema> = new ArraySchema<PlayerSchema>();

  @type({ map: DiscSchema })
  discs: ArraySchema<DiscSchema> = new ArraySchema(
    ...defaultDiscs.map(disc => new DiscSchema(disc))
  );
}
