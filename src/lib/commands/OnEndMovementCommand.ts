import { Command } from '@colyseus/command';

import { getIsKingDisc } from '../disc';
import { getCapturedDiscPosition } from '../movement';
import GameRoom from '../rooms/GameRoom';
import { hasWonThisTurn } from '../win';

export type OnEndMovementCommandData = {
  currentPosition: Position;
  newPosition: Position;
};

export class OnEndMovementCommand extends Command<
  GameRoom,
  OnEndMovementCommandData
> {
  execute({ currentPosition, newPosition }: OnEndMovementCommandData) {
    const currentPositionDisc = this.state.discs.find(
      disc => disc.position === currentPosition
    );

    if (!currentPositionDisc) return;

    const isKing = getIsKingDisc(newPosition, currentPositionDisc);

    const currentPlayerKey = currentPositionDisc?.player;
    const otherPlayerKey = currentPlayerKey === 0 ? 1 : 0;

    const capturedPosition = getCapturedDiscPosition(
      this.state.discs as Game['discs'],
      currentPosition,
      newPosition
    );

    currentPositionDisc.position = newPosition;
    currentPositionDisc.isKing = isKing;
    const updatedDisc = { ...currentPositionDisc };

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
      updatedDisc,
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
