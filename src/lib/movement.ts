import { getPlayerId } from './disc';

const getPositions = (player: number, discPosition: number) => ({
  upperLeft: player === 1 ? discPosition - 7 : discPosition + 7,
  upperRight: player === 1 ? discPosition - 9 : discPosition + 9,
  twoUpperLeft: player === 1 ? discPosition - 14 : discPosition + 14,
  twoUpperRight: player === 1 ? discPosition - 18 : discPosition + 18
});

export const calculatePlayerMovablePositions = (
  player: number,
  discs: Discs,
  squares: Squares,
  discPosition: number
): number[] => {
  const possibleMoves = [];

  // player 1 goes up and player 2 goes down when moving!
  const { upperLeft, upperRight, twoUpperLeft, twoUpperRight } = getPositions(
    player,
    discPosition
  );

  // see if square is dark square (able to receive a disc)
  // if (squares.hasOwnProperty(upperLeft)) {
  const upperLeftDiscId = Object.keys(discs).find(
    key => discs[key] === upperLeft
  );
  // has no disc on it, safe to move
  if (!upperLeftDiscId) {
    possibleMoves.push(upperLeft);
  } else if (
    // has a disc on it, need to check if it's a capture movement
    // squares.hasOwnProperty(twoUpperLeft) && // safe to move
    getPlayerId(upperLeftDiscId) !== player // disc from other player
  ) {
    possibleMoves.push(twoUpperLeft);
  }
  // }

  // if (squares.hasOwnProperty(upperRight)) {
  const upperRightDiscId = Object.keys(discs).find(
    key => discs[key] === upperRight
  );
  if (!upperRightDiscId) {
    possibleMoves.push(upperRight);
  } else if (
    // squares.hasOwnProperty(twoUpperRight) &&
    getPlayerId(upperRightDiscId) !== player
  ) {
    possibleMoves.push(twoUpperRight);
  }
  // }

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

export const calculatePlayerMovablePositionsWhenMultiCapturing = (
  player: number,
  discs: Discs,
  squares: Squares,
  discPosition: number
) => {
  const possibleMoves = [];
  const { upperLeft, upperRight, twoUpperLeft, twoUpperRight } = getPositions(
    player,
    discPosition
  );

  // see if square is dark square (able to receive a disc)
  const upperLeftDiscId = Object.keys(discs).find(
    key => discs[key] === upperLeft
  );
  if (
    // squares.hasOwnProperty(upperLeft) &&
    // squares.hasOwnProperty(twoUpperLeft) &&
    upperLeftDiscId &&
    getPlayerId(upperLeftDiscId) !== player
  ) {
    possibleMoves.push(twoUpperLeft);
  }

  const upperRightDiscId = Object.keys(discs).find(
    key => discs[key] === upperRight
  );
  if (
    // squares.hasOwnProperty(upperRight) &&
    // squares.hasOwnProperty(twoUpperRight) &&
    upperRightDiscId &&
    getPlayerId(upperRightDiscId) !== player
  ) {
    possibleMoves.push(twoUpperRight);
  }

  return possibleMoves;
};
