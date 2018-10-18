/**
 * Determine the impossibility of movement
 * returns true when disc is out of the board or found a friendly disc
 *
 * @param coords
 * @param playerDiscs
 * @returns {boolean}
 */
function isImpossibleToKeepMoving(coords, playerDiscs) {
  return (
    coords[0] > 7 ||
    coords[0] < 0 ||
    coords[1] > 7 ||
    coords[1] < 0 ||
    JSON.stringify(playerDiscs).includes(JSON.stringify(coords))
  )
}

/**
 * Determine if there are two enemy discs ahead
 *
 * @param nextCoords
 * @param enemyDiscs
 * @param axis
 */
function hasTwoAdjacentEnemyDiscs(nextCoords, enemyDiscs, axis) {
  const stringNextCoords = JSON.stringify(nextCoords)
  const stringTwoAheadCoords = JSON.stringify(
    getNextCoords(axis, nextCoords, 1),
  )
  const stringEnemyDiscs = JSON.stringify(enemyDiscs)

  return (
    stringEnemyDiscs.includes(stringNextCoords) &&
    stringEnemyDiscs.includes(stringTwoAheadCoords)
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
      isImpossibleToKeepMoving([x, y], playerDiscs) ||
      hasTwoAdjacentEnemyDiscs([x, y], enemyDiscs, axis)
    ) {
      return true
    }

    // has empty square
    if (!JSON.stringify(enemyDiscs).includes(JSON.stringify([x, y]))) {
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
