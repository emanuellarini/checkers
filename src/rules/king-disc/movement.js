/**
 * Determine the impossibility of movement
 * returns true when disc is out of the board or found a friendly disc
 *
 * @param coords
 * @param playerDiscs
 * @returns {boolean}
 */
function isImpossibleToKeepMoving(coords, playerDiscs, axis) {
  const [x, y] = coords
  return (
    x > 7 ||
    x < 0 ||
    y > 7 ||
    y < 0 ||
    playerDiscs.some(item => item.toString() === [x, y].toString())
  )
}

/**
 * Determine if there are two enemy discs ahead
 *
 * @param nextCoords
 * @param enemyDiscs
 * @param axis
 * @param i
 */
function hasTwoAdjacentEnemyDiscs(nextCoords, enemyDiscs, axis, i) {
  const nextAfterNextCoords = getNextCoords(axis, nextCoords, i + 1)

  return (
    enemyDiscs.some(item => item.toString() === nextCoords.toString()) &&
    enemyDiscs.some(
      enemy => enemy.toString() === nextAfterNextCoords.toString(),
    )
  )
}

/**
 * Retrieve next coords based on axis
 *
 * @param axis
 * @param coords
 * @param i
 * @returns {*[]}
 */
export function getNextCoords(axis, coords, i) {
  const [x, y] = coords

  if (axis === 'upRight') {
    return [x - i, y + i]
  }
  if (axis === 'upLeft') {
    return [x - i, y - i]
  }

  if (axis === 'downLeft') {
    return [x + i, y - i]
  }

  return [x + i, y + i]
}

/**
 * Calculate possible diagonals that a King Disc can land
 *
 * @param playerDiscs
 * @param coords
 * @param enemyDiscs
 * @param axis
 */
function calculateDiagonals(playerDiscs, enemyDiscs, coords, axis) {
  const length = 7 - Math.min(coords[0], coords[1])
  const range = Array.from({length}, (v, k) => k)

  const diagonals = []
  range.some(i => {
    const [x, y] = getNextCoords(axis, coords, i + 1)

    if (
      isImpossibleToKeepMoving([x, y], playerDiscs, axis) ||
      hasTwoAdjacentEnemyDiscs([x, y], enemyDiscs, axis, i)
    ) {
      return true
    }

    // did not found an enemy disc
    if (!enemyDiscs.some(item => item.toString() === [x, y].toString())) {
      diagonals.push([x, y])
    }

    return false
  })

  return diagonals
}

/**
 * Retrieve all possible coordinates of a King Disc from the Player
 *
 * @param player
 * @param disckKey
 * @param discs
 * @returns {*[]}
 */
export function calculateKingMovableSquares(player, disckKey, discs) {
  const coords = discs[player - 1][disckKey]
  const playerDiscs = Object.values(discs[player - 1])
  const enemyDiscs = Object.values(discs[player === 1 ? 1 : 0])

  const upRightDiagonals = calculateDiagonals(
    playerDiscs,
    enemyDiscs,
    coords,
    'upRight',
  )
  const upLeftDiagonals = calculateDiagonals(
    playerDiscs,
    enemyDiscs,
    coords,
    'upLeft',
  )
  const downLeftDiagonals = calculateDiagonals(
    playerDiscs,
    enemyDiscs,
    coords,
    'downLeft',
  )
  const downRightDiagonals = calculateDiagonals(
    playerDiscs,
    enemyDiscs,
    coords,
    'downRight',
  )

  return [
    ...upRightDiagonals,
    ...upLeftDiagonals,
    ...downLeftDiagonals,
    ...downRightDiagonals,
  ].filter(item => item.length)
}
