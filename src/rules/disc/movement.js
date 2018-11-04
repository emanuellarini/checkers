import {
  calculateLowerDiagonalCapture,
  calculateUpperDiagonalCapture,
} from './capture'

/**
 * Retrieve coordinates to next iteration of movement
 *
 * @param player
 * @param coords
 * @param discs
 * @param orientation
 * @returns {*[]}
 */
function calculateUpperDiagonalMovement(player, coords, discs, orientation) {
  const [x, y] = coords

  // outside of board
  if (x > 7 || x < 0 || y > 7 || y < 0) return []

  let stringCoords = JSON.stringify(coords)
  const stringDiscsCoords = JSON.stringify(discs)

  // has no disc after it
  if (!stringDiscsCoords.includes(stringCoords)) {
    return coords
  }

  // calculate upper diagonal capture and return it or
  // has enemy disc but another disc after it and we return []
  return calculateUpperDiagonalCapture(player, coords, discs, orientation)
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
  const upperLeftDiagonal = calculateUpperDiagonalMovement(
    player,
    currentPlayerMoves.upperLeft,
    discs,
    'left',
  )
  const upperRightDiagonal = calculateUpperDiagonalMovement(
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

/**
 * Retrieve coords if it is possible to do a multi capture movement
 *
 * @param player
 * @param discKey
 * @param discs
 * @returns {*[]}
 */
export function calculateMultiCaptureCoords(player, discKey, discs) {
  const [x, y] = discs[player - 1][discKey]

  const playerMoves = {
    1: {
      upperLeft: [x - 1, y - 1],
      upperRight: [x - 1, y + 1],
    },
    2: {
      upperLeft: [x + 1, y - 1],
      upperRight: [x + 1, y + 1],
    },
  }

  const currentPlayerMoves = playerMoves[player]
  const upperLeftDiagonal = calculateUpperDiagonalCapture(
    player,
    currentPlayerMoves.upperLeft,
    discs,
    'left',
  )
  const upperRightDiagonal = calculateUpperDiagonalCapture(
    player,
    currentPlayerMoves.upperRight,
    discs,
    'right',
  )

  return [upperLeftDiagonal, upperRightDiagonal].filter(item => item.length)
}
