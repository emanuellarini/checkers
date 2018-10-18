import {calculateLowerDiagonalCapture} from './capture'

/**
 * Retrieve coordinates to next iteration of movement
 *
 * @param player
 * @param coords
 * @param discs
 * @param orientation
 * @returns {*[]}
 */
function calculateUpperDiagonal(player, coords, discs, orientation) {
  const [x, y] = coords

  // outside of board
  if (x > 7 || x < 0 || y > 7 || y < 0) return []

  let stringCoords = JSON.stringify(coords)
  const stringDiscsCoords = JSON.stringify(discs)
  const stringEnemyDiscsCoords = JSON.stringify(discs[player === 1 ? 1 : 0])

  // has no disc after it
  if (!stringDiscsCoords.includes(stringCoords)) {
    return coords
  }

  // has an enemy disc after it and free space 2 moves ahead
  const twoAheadCoords = [
    player === 1 ? x - 1 : x + 1,
    orientation === 'left' ? y - 1 : y + 1,
  ]
  const stringTwoAheadCoords = JSON.stringify(twoAheadCoords)

  if (
    stringEnemyDiscsCoords.includes(stringCoords) &&
    !stringDiscsCoords.includes(stringTwoAheadCoords)
  ) {
    return twoAheadCoords
  }

  // has enemy disc but another disc after it
  return []
}

/**
 * Retrieve all possible coordinates of a Disc from the Player
 *
 * @param player
 * @param discKey
 * @param discs
 * @returns {*[]}
 */
export function calculateMovableSquares(player, discKey, discs) {
  const [x, y] = discs[player - 1][discKey]

  const playerMoves = {
    1: {
      upperLeft: [x - 1, y - 1],
      upperRight: [x - 1, y + 1],
      lowerLeft: [x + 2, y - 2],
      lowerRight: [x + 2, y + 2],
    },
    2: {
      upperLeft: [x + 1, y - 1],
      upperRight: [x + 1, y + 1],
      lowerLeft: [x - 2, y - 2],
      lowerRight: [x - 2, y + 2],
    },
  }

  const currentPlayerMoves = playerMoves[player]
  const upperLeftDiagonal = calculateUpperDiagonal(
    player,
    currentPlayerMoves.upperLeft,
    discs,
    'left',
  )
  const upperRightDiagonal = calculateUpperDiagonal(
    player,
    currentPlayerMoves.upperRight,
    discs,
    'right',
  )
  const lowerLeftDiagonal = calculateLowerDiagonalCapture(
    player,
    currentPlayerMoves.lowerLeft,
    discs,
    'left',
  )
  const lowerRightDiagonal = calculateLowerDiagonalCapture(
    player,
    currentPlayerMoves.lowerRight,
    discs,
    'right',
  )

  return [
    upperLeftDiagonal,
    upperRightDiagonal,
    lowerLeftDiagonal,
    lowerRightDiagonal,
  ].filter(item => item.length)
}
