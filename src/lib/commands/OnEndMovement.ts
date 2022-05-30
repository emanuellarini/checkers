import { Command } from '@colyseus/command';

// import { getCapturedDiscPosition } from '../../lib/movement';
// import { hasWonThisTurn } from '../../lib/win';
import { getIsKingDisc } from '../disc';
import GameRoom from '../rooms/GameRoom';
// import { DiscSchema } from '../schemas';

export type OnEndMovementData = {
  currentPosition: Position;
  newPosition: Position;
};

export class OnEndMovement extends Command<GameRoom, OnEndMovementData> {
  execute({ currentPosition, newPosition }: OnEndMovementData) {
    const currentPlayerKey = this.state.turn;
    const otherPlayerKey = currentPlayerKey === 0 ? 1 : 0;

    const currentPositionDisc = this.state.discs.find(
      disc => disc.position === currentPosition
    );

    console.log('currentPositionDisc', this.state.discs['$changes'].changes);
    console.log('currentPositionDisc', this.state.discs.at(0).position);

    const isKing = getIsKingDisc(newPosition, currentPositionDisc);
    // const newPositionDisc = new DiscSchema({
    //   ...currentPositionDisc,
    //   position: newPosition,
    //   isKing
    // });

    this.state.discs.at(14).position = newPosition;
    this.state.discs.at(14).isKing = isKing;

    // const capturedPosition = getCapturedDiscPosition(
    //   this.state.discs as Game['discs'],
    //   currentPosition,
    //   newPosition
    // );
    // if (capturedPosition) {
    //   if (
    //     hasWonThisTurn(
    //       this.state.players as Game['players'],
    //       currentPlayerKey,
    //       this.state.discs as Game['discs']
    //     )
    //   ) {
    //     this.state.winner = currentPlayerKey;
    //     this.state.players.at(currentPlayerKey).wins =
    //       this.state.players.at(currentPlayerKey).wins + 1;
    //
    //     if (this.state.players.at(otherPlayerKey)) {
    //       this.state.players.at(otherPlayerKey).losses =
    //         this.state.players.at(otherPlayerKey).losses + 1;
    //     }
    //   }
    //
    //   const capturedDiscIndex = this.state.discs.findIndex(
    //     disc => disc.position === capturedPosition
    //   );
    //
    //   if (this.state.discs.at(capturedDiscIndex)?.isKing) {
    //     this.state.players.at(currentPlayerKey).capturedKings =
    //       this.state.players.at(currentPlayerKey).capturedKings + 1;
    //   } else {
    //     this.state.players.at(currentPlayerKey).capturedDiscs =
    //       this.state.players.at(currentPlayerKey).capturedDiscs + 1;
    //   }
    //
    //   this.state.discs.splice(capturedDiscIndex, 1);
    // }

    console.log('currentPositionDisc', this.state.discs);

    this.state.movements = this.state.movements + 1;

    const data = {
      winner: this.state.winner,
      movements: this.state.movements,
      capturedPosition: undefined,
      updateDisc: {
        disc: this.state.discs.at(14),
        key: 112213
      },
      currentPlayer: this.state.players.at(currentPlayerKey),
      otherPlayer: this.state.players.at(otherPlayerKey)
    };

    // has correct data but player does not receive it correctly
    console.log(data);

    this.room.broadcast('END_MOVEMENT', data);
  }
}
