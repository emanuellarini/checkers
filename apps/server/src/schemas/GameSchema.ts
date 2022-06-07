import { defaultDiscs } from '@checkers/game-common';
import { Player, Disc } from '@checkers/game-interfaces';

import { Schema, type, ArraySchema } from '@colyseus/schema';

export class PlayerSchema extends Schema implements Player {
  @type('boolean')
  isConnected = false;

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
  confirmedRematch = 0;

  @type('number')
  winner = -1;

  @type('number')
  movements = 0;

  @type('number')
  turn = 0;

  @type([PlayerSchema])
  players: ArraySchema<PlayerSchema> = new ArraySchema<PlayerSchema>();

  @type([DiscSchema])
  discs: ArraySchema<DiscSchema> = new ArraySchema(
    ...defaultDiscs.map(disc => new DiscSchema().assign(disc))
  );
}
