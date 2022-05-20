import { getPlayerId } from './disc';

export const calculatePlayerMovablePositions = (
  player: number,
  discs: Discs,
  squares: Squares,
  discPosition: number
): number[] => {
  const possibleMoves = [];

  // player 1 goes up and player 2 goes down when moving!
  const upperLeft = player === 1 ? discPosition - 7 : discPosition + 7;
  const twoUpperLeft = player === 1 ? discPosition - 14 : discPosition + 14;
  const upperRight = player === 1 ? discPosition - 9 : discPosition + 9;
  const twoUpperRight = player === 1 ? discPosition - 18 : discPosition + 18;

  // see if square is dark square (able to receive a disc)
  if (squares.hasOwnProperty(upperLeft)) {
    const upperLeftDiscId = Object.keys(discs).find(
      key => discs[key] === upperLeft
    );
    // has no disc on it, safe to move
    if (!upperLeftDiscId) {
      possibleMoves.push(upperLeft);
    } else if (
      // has a disc on it, need to check if it's a capture movement
      squares.hasOwnProperty(twoUpperLeft) && // safe to move
      getPlayerId(upperLeftDiscId) !== player // disc from other player
    ) {
      possibleMoves.push(twoUpperLeft);
    }
  }

  if (squares.hasOwnProperty(upperRight)) {
    const upperRightDiscId = Object.keys(discs).find(
      key => discs[key] === upperRight
    );
    if (!upperRightDiscId) {
      possibleMoves.push(upperRight);
    } else if (
      getPlayerId(upperRightDiscId) !== player &&
      squares.hasOwnProperty(twoUpperRight)
    ) {
      possibleMoves.push(twoUpperRight);
    }
  }

  return possibleMoves;
};

export const getCapturedDisc = (
  discs: Discs,
  discId: string,
  newPosition: number
): string | undefined => {
  const currentPosition = discs[discId];
  const distance = newPosition - currentPosition;

  // did a jump over
  if (![-18, -14, 14, 18].includes(distance)) return undefined;

  return Object.keys(discs).find(
    key =>
      discs[key] === newPosition - distance / 2 &&
      getPlayerId(key) !== getPlayerId(discId)
  );
};
