export const getIsKingDisc = (position: Position, disc?: Disc) => {
  if (!disc) return false;

  if (disc.isKing) return true;

  if (disc.player === 0) {
    return [1, 3, 5, 7].includes(position);
  }

  return [56, 58, 60, 62].includes(position);
};
