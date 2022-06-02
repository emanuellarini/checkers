/**
 * Returns the x and y positions needed to drop correctly the disc
 * All the numbers are based on empiric tests
 */
export const getDropXYCoords = (
  player: PlayerKey,
  currentPosition: Position,
  nextPosition: Position,
  nextPositionBound: { x: number; y: number; width: number; height: number }
) => {
  const sloppyClickPosition = nextPositionBound.width / 24;

  // upper-left-jump or upper-left - OK
  if (
    nextPosition - currentPosition === -18 ||
    nextPosition - currentPosition === -9
  ) {
    return {
      x: nextPositionBound.x - sloppyClickPosition * 2,
      y: nextPositionBound.y - sloppyClickPosition
    };
  }

  // upper-right-jump or upper-right - OK
  if (
    nextPosition - currentPosition === -14 ||
    nextPosition - currentPosition === -7
  ) {
    return {
      x: nextPositionBound.x + sloppyClickPosition * 4,
      y: nextPositionBound.y - sloppyClickPosition * 2
    };
  }

  // lower-left-jump or lower-left
  if (
    nextPosition - currentPosition === 14 ||
    nextPosition - currentPosition === 7
  ) {
    return {
      x: nextPositionBound.x - sloppyClickPosition,
      y: nextPositionBound.y + sloppyClickPosition * 3
    };
  }

  // lower-right-jump or lower-right - OK
  return {
    x: nextPositionBound.x + sloppyClickPosition * 4,
    y: nextPositionBound.y + sloppyClickPosition * 3
  };
};
