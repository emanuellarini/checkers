import { PlayerKey, Disc, Position } from '@checkers/game-interfaces';

import { defaultSquares } from './defaultSquares';

const isDroppableSquare = (position: Position) =>
  // position is within board
  position >= 0 &&
  // position is within board
  position <= 63 &&
  // needs to be a dark square
  defaultSquares.find(square => square.position === position)?.isDarkSquare;

const canDropInAdjacentSquare = (discs: Disc[], position: Position) =>
  isDroppableSquare(position) &&
  !discs.some(disc => disc.position === position);

const canDropInJumpedSquare = (
  discs: Disc[],
  position: Position,
  player: PlayerKey
) =>
  canDropInAdjacentSquare(discs, position) &&
  discs.find(disc => disc.position === position)?.player !== player;

const getPositions = (player: PlayerKey, position: Position) => {
  const upperLeft = player === 0 ? position - 7 : position + 7;
  const upperRight = player === 0 ? position - 9 : position + 9;
  const twoUpperLeft = player === 0 ? position - 14 : position + 14;
  const twoUpperRight = player === 0 ? position - 18 : position + 18;
  const lowerLeft = player === 0 ? position + 7 : position - 7;
  const lowerRight = player === 0 ? position + 9 : position - 9;
  const twoLowerLeft = player === 0 ? position + 14 : position - 14;
  const twoLowerRight = player === 0 ? position + 18 : position - 18;

  return {
    upperLeft: isDroppableSquare(upperLeft) ? upperLeft : -1,
    upperRight: isDroppableSquare(upperRight) ? upperRight : -1,
    twoUpperLeft: isDroppableSquare(twoUpperLeft) ? twoUpperLeft : -1,
    twoUpperRight: isDroppableSquare(twoUpperRight) ? twoUpperRight : -1,
    lowerLeft: isDroppableSquare(lowerLeft) ? lowerLeft : -1,
    lowerRight: isDroppableSquare(lowerRight) ? lowerRight : -1,
    twoLowerLeft: isDroppableSquare(twoLowerLeft) ? twoLowerLeft : -1,
    twoLowerRight: isDroppableSquare(twoLowerRight) ? twoLowerRight : -1
  };
};

const getDirectionPossibleMoves = (
  position: Position,
  doublePosition: Position,
  discs: Disc[],
  player: PlayerKey
) => {
  const possibleMoves = [];

  if (canDropInAdjacentSquare(discs, position)) {
    possibleMoves.push(position);
  } else if (canDropInJumpedSquare(discs, doublePosition, player)) {
    possibleMoves.push(doublePosition);
  }

  return possibleMoves;
};

export const calculatePlayerMovablePositions = (
  player: PlayerKey,
  discs: Disc[],
  position: Position
): Position[] => {
  const {
    upperLeft,
    upperRight,
    twoUpperLeft,
    twoUpperRight,
    lowerLeft,
    lowerRight,
    twoLowerLeft,
    twoLowerRight
  } = getPositions(player, position);

  const disc = discs.find(disc => disc.position === position);

  const upperLeftPossibleMoves = getDirectionPossibleMoves(
    upperLeft,
    twoUpperLeft,
    discs,
    player
  );

  const upperRightPossibleMoves = getDirectionPossibleMoves(
    upperRight,
    twoUpperRight,
    discs,
    player
  );

  let lowerLeftPossibleMoves: Position[] = [];
  let lowerRightPossibleMoves: Position[] = [];
  // king moves!
  if (disc?.isKing) {
    lowerLeftPossibleMoves = getDirectionPossibleMoves(
      lowerLeft,
      twoLowerLeft,
      discs,
      player
    );

    lowerRightPossibleMoves = getDirectionPossibleMoves(
      lowerRight,
      twoLowerRight,
      discs,
      player
    );
  }

  return [
    ...upperLeftPossibleMoves,
    ...upperRightPossibleMoves,
    ...lowerLeftPossibleMoves,
    ...lowerRightPossibleMoves
  ];
};

export const getCapturedDiscPosition = (
  discs: Disc[],
  currentPosition: Position,
  newPosition: Position
): Position | undefined => {
  const distance = newPosition - currentPosition;

  const middlePosition = (newPosition + currentPosition) / 2;

  // these numbers mean the disc has jump over
  // no need to check if the disc belongs to te opposite player here
  // because we already did that in possible moves fn
  if (
    ![-18, -14, 14, 18].includes(distance) ||
    !discs.find(disc => disc.position === middlePosition)
  )
    return undefined;

  return middlePosition;
};

export const calculatePlayerMovablePositionsWhenMultiCapturing = (
  player: PlayerKey,
  discs: Disc[],
  position: Position
): Position[] => {
  const possibleMoves: Position[] = [];
  const disc = discs.find(disc => disc.position === position);

  const {
    upperLeft,
    upperRight,
    twoUpperLeft,
    twoUpperRight,
    lowerLeft,
    lowerRight,
    twoLowerLeft,
    twoLowerRight
  } = getPositions(player, position);

  const {
    discUpperLeft,
    discUpperRight,
    discTwoUpperLeft,
    discTwoUpperRight,
    discLowerLeft,
    discLowerRight,
    discTwoLowerLeft,
    discTwoLowerRight
  } = discs.reduce((acc, disc) => {
    if (disc.position === upperLeft) {
      acc.discUpperLeft = disc;
    } else if (disc.position === upperRight) {
      acc.discUpperRight = disc;
    } else if (disc.position === twoUpperLeft) {
      acc.discTwoUpperLeft = disc;
    } else if (disc.position === twoUpperRight) {
      acc.discTwoUpperRight = disc;
    } else if (disc.position === lowerLeft) {
      acc.discLowerLeft = disc;
    } else if (disc.position === twoLowerLeft) {
      acc.discTwoLowerLeft = disc;
    } else if (disc.position === lowerRight) {
      acc.discLowerRight = disc;
    } else if (disc.position === twoLowerRight) {
      acc.discTwoLowerRight = disc;
    }

    return acc;
  }, {} as { [k: string]: Disc });

  if (discUpperLeft && discUpperLeft.player !== player && !discTwoUpperLeft) {
    possibleMoves.push(twoUpperLeft);
  }

  if (
    discUpperRight &&
    discUpperRight.player !== player &&
    !discTwoUpperRight
  ) {
    possibleMoves.push(twoUpperRight);
  }

  if (
    disc?.isKing &&
    discLowerLeft &&
    discLowerLeft.player !== player &&
    !discTwoLowerLeft
  ) {
    possibleMoves.push(twoLowerLeft);
  }

  if (
    disc?.isKing &&
    discLowerRight &&
    discLowerRight.player !== player &&
    !discTwoLowerRight
  ) {
    possibleMoves.push(twoLowerRight);
  }

  return possibleMoves;
};
