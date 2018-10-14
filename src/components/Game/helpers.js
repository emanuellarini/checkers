function calculateDiagonal(player, diagonal, discs, orientation) {
  const arrayOfDiscs = [...Object.values(discs[0]), ...Object.values(discs[1])]
  const [x, y] = diagonal

  // outside of board
  if (x > 7 || x < 0 || y > 7 || y < 0) return []

  // has no disc after it
  if (
    !Object.values(arrayOfDiscs).some(
      item => item.toString() === diagonal.toString(),
    )
  ) {
    return diagonal
  }

  // has an enemy disc after it
  if (
    Object.values(discs[player === 1 ? 1 : 0]).some(
      item => item.toString() === diagonal.toString(),
    )
  ) {
    diagonal = [
      player === 1 ? x - 1 : x + 1,
      orientation === 'left' ? y - 1 : y + 1,
    ]
  }

  // has enemy disc but not another disc after it (jumpable)
  if (
    !Object.values(arrayOfDiscs).some(
      item => item.toString() === diagonal.toString(),
    )
  ) {
    return diagonal
  }

  // has enemy disc but another disc after it
  return []
}

export function calculateMovableSquares(player, disckKey, discs) {
  const [x, y] = discs[Number(player) - 1][disckKey]
  let leftDiagonal = []
  let rightDiagonal = []

  if (player === 1) {
    leftDiagonal = calculateDiagonal(1, [x - 1, y - 1], discs, 'left')
    rightDiagonal = calculateDiagonal(1, [x - 1, y + 1], discs, 'right')
  } else if (player === 2) {
    leftDiagonal = calculateDiagonal(2, [x + 1, y - 1], discs, 'left')
    rightDiagonal = calculateDiagonal(2, [x + 1, y + 1], discs, 'right')
  }

  return [leftDiagonal, rightDiagonal].filter(item => item.length)
}
