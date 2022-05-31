import { Command } from '@colyseus/command';

import { getCapturedDiscPosition } from '../../lib/movement';
import { hasWonThisTurn } from '../../lib/win';
import { getIsKingDisc } from '../disc';
import GameRoom from '../rooms/GameRoom';

export type OnEndMovementCommandData = {
  currentPosition: Position;
  newPosition: Position;
};

export class OnEndMovementCommand extends Command<
  GameRoom,
  OnEndMovementCommandData
> {
  execute({ currentPosition, newPosition }: OnEndMovementCommandData) {
    const currentPlayerKey = this.state.turn;
    const otherPlayerKey = currentPlayerKey === 0 ? 1 : 0;

    const currentPositionDiscIndex = this.state.discs.findIndex(
      disc => disc.position === currentPosition
    );

    const isKing = getIsKingDisc(
      newPosition,
      this.state.discs[currentPositionDiscIndex]
    );

    this.state.discs[currentPositionDiscIndex].position = newPosition;
    this.state.discs[currentPositionDiscIndex].isKing = isKing;

    const capturedPosition = getCapturedDiscPosition(
      this.state.discs as Game['discs'],
      currentPosition,
      newPosition
    );
    if (capturedPosition) {
      const capturedDiscIndex = this.state.discs.findIndex(
        disc => disc.position === capturedPosition
      );

      if (this.state.discs[capturedDiscIndex]?.isKing) {
        this.state.players[currentPlayerKey].capturedKings =
          this.state.players[currentPlayerKey].capturedKings + 1;
      } else {
        this.state.players[currentPlayerKey].capturedDiscs =
          this.state.players[currentPlayerKey].capturedDiscs + 1;
      }

      this.state.discs.splice(capturedDiscIndex, 1);
    }

    if (
      hasWonThisTurn(
        this.state.players as Game['players'],
        currentPlayerKey,
        this.state.discs as Game['discs']
      )
    ) {
      this.state.winner = currentPlayerKey;
      this.state.players[currentPlayerKey].wins =
        this.state.players[currentPlayerKey].wins + 1;

      if (this.state.players[otherPlayerKey]) {
        this.state.players[otherPlayerKey].losses =
          this.state.players[otherPlayerKey].losses + 1;
      }
    }

    this.state.movements = this.state.movements + 1;

    const data = {
      winner: this.state.winner,
      movements: this.state.movements,
      capturedPosition,
      updateDisc: {
        disc: this.state.discs[currentPositionDiscIndex],
        key: currentPositionDiscIndex
      },
      currentPlayer: {
        key: currentPlayerKey,
        data: this.state.players[currentPlayerKey]
      },
      otherPlayer: {
        key: otherPlayerKey,
        data: this.state.players[otherPlayerKey]
      }
    };

    this.room.broadcast('END_MOVEMENT', data);
  }
}
