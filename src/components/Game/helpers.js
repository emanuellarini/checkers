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
function calculateUpperDiagonal(player, coords, discs, orientation) {
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
 * Calculate satisfiable condition to make a backwards jump
 *
 * @param player
 * @param coords
 * @param discs
 * @param orientation
 * @returns {Array}
 */
function calculateLowerDiagonalCapture(player, coords, discs, orientation) {
  const arrayOfDiscs = [...Object.values(discs[0]), ...Object.values(discs[1])]
  const [x, y] = coords
  const middleCoords = [
    player === 1 ? x - 1 : x + 1,
    orientation === 'left' ? y + 1 : y - 1,
  ]

  // outside of board
  if (x > 7 || x < 0 || y > 7 || y < 0) return []

  // has enemy disc in the middle and empty space after it
  if (
    Object.values(discs[player === 1 ? 1 : 0]).some(
      item => item.toString() === middleCoords.toString(),
    ) &&
    !Object.values(arrayOfDiscs).some(
      item => item.toString() === coords.toString(),
    )
  ) {
    return coords
  }

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
  let upperLeftDiagonal = []
  let upperRightDiagonal = []
  let lowerLeftDiagonal = []
  let lowerRightDiagonal = []

  if (player === 1) {
    upperLeftDiagonal = calculateUpperDiagonal(1, [x - 1, y - 1], discs, 'left')
    upperRightDiagonal = calculateUpperDiagonal(
      1,
      [x - 1, y + 1],
      discs,
      'right',
    )
    lowerLeftDiagonal = calculateLowerDiagonalCapture(
      1,
      [x + 2, y - 2],
      discs,
      'left',
    )
    lowerRightDiagonal = calculateLowerDiagonalCapture(
      1,
      [x + 2, y + 2],
      discs,
      'right',
    )
  } else if (player === 2) {
    upperLeftDiagonal = calculateUpperDiagonal(2, [x + 1, y - 1], discs, 'left')
    upperRightDiagonal = calculateUpperDiagonal(
      2,
      [x + 1, y + 1],
      discs,
      'right',
    )
    lowerLeftDiagonal = calculateLowerDiagonalCapture(
      2,
      [x - 2, y - 2],
      discs,
      'left',
    )
    lowerRightDiagonal = calculateLowerDiagonalCapture(
      2,
      [x - 2, y + 2],
      discs,
      'right',
    )
  }

  return [
    upperLeftDiagonal,
    upperRightDiagonal,
    lowerLeftDiagonal,
    lowerRightDiagonal,
  ].filter(item => item.length)
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

/**
 * Determine if a king disc is creatable based on player coords
 *
 * @param nextCoords
 * @param player
 * @returns {boolean}
 */
export function canCreateKing(nextCoords, player) {
  return Array.from(
    new Array(8),
    (x, i) => (player === 1 ? [0, i] : [7, i]),
  ).some(item => item.toString() === nextCoords.toString())
}
