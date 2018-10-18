import _findKey from 'lodash/findKey'

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

/**
 * Calculate satisfiable condition to make a backwards jump
 *
 * @param player
 * @param coords
 * @param discs
 * @param orientation
 * @returns {Array}
 */
export function calculateLowerDiagonalCapture(
  player,
  coords,
  discs,
  orientation,
) {
  const [x, y] = coords
  // outside of board
  if (x > 7 || x < 0 || y > 7 || y < 0) return []

  const stringMiddleCoords = JSON.stringify([
    player === 1 ? x - 1 : x + 1,
    orientation === 'left' ? y + 1 : y - 1,
  ])

  const stringCoords = JSON.stringify(coords)
  const stringDiscsCoords = JSON.stringify(discs)
  const stringEnemyDiscsCoords = JSON.stringify(discs[player === 1 ? 1 : 0])

  // has enemy disc in the middle and empty space after it
  if (
    stringEnemyDiscsCoords.includes(stringMiddleCoords) &&
    !stringDiscsCoords.includes(stringCoords)
  ) {
    return coords
  }

  return []
}
