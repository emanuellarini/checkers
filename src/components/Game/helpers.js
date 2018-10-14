import _findKey from 'lodash/findKey'

/**
 * Retrieve coordinates to next iteration of movement
 *
 * @param player
 * @param coords
 * @param discs
 * @param orientation
 * @returns {*[]}
 */
function calculateDiagonal(player, coords, discs, orientation) {
  const arrayOfDiscs = [...Object.values(discs[0]), ...Object.values(discs[1])]
  const [x, y] = coords

  // outside of board
  if (x > 7 || x < 0 || y > 7 || y < 0) return []

  // has no disc after it
  if (
    !Object.values(arrayOfDiscs).some(
      item => item.toString() === coords.toString(),
    )
  ) {
    return coords
  }

  // has an enemy disc after it
  if (
    Object.values(discs[player === 1 ? 1 : 0]).some(
      item => item.toString() === coords.toString(),
    )
  ) {
    coords = [
      player === 1 ? x - 1 : x + 1,
      orientation === 'left' ? y - 1 : y + 1,
    ]
  }

  // has enemy disc but not another disc after it (jumpable)
  if (
    !Object.values(arrayOfDiscs).some(
      item => item.toString() === coords.toString(),
    )
  ) {
    return coords
  }

  // has enemy disc but another disc after it
  return []
}

/**
 * Retrieve all possible coordinates of a Disc from the Player
 *
 * @param player
 * @param disckKey
 * @param discs
 * @returns {*[]}
 */
export function calculateMovableSquares(player, disckKey, discs) {
  const [x, y] = discs[player - 1][disckKey]
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

/**
 * Retrieve the captured disc key
 *
 * @param nextCoords
 * @param player
 * @param disckKey
 * @param discs
 * @returns {string|null}
 */
export function getCapturedDiscKey(nextCoords, player, disckKey, discs) {
  const [x, y] = discs[player - 1][disckKey]
  const [nextX, nextY] = nextCoords

  // if a player disc didnt leap through an enemy disc
  // it hasnt made a capture, right?
  if (Math.abs(nextX - x) !== 2) return null

  const enemyDiscs = discs[player === 1 ? 1 : 0]

  const capturedCoords = [(nextX + x) / 2, (nextY + y) / 2]

  return _findKey(
    enemyDiscs,
    item => item.toString() === capturedCoords.toString(),
  )
}
