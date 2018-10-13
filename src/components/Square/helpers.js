/**
 * Retrieve the Square variant type
 *
 * @param x
 * @param y
 * @returns {string} dark|light
 */
export function getSquareVariant(x, y) {
  const evenX = x % 2 === 0

  if (y % 2 === 0) {
    return evenX ? 'light' : 'dark'
  }

  return evenX ? 'dark' : 'light'
}

/**
 * Determine if Square is disabled or not
 * //TODO: implement the diagonally and towards movement
 *
 * @returns {boolean}
 * @param x
 * @param y
 * @param playerOneDiscs
 * @param playerTwoDiscs
 */
export function determineDisableStatus(x, y, playerOneDiscs, playerTwoDiscs) {
  const coords = [x, y].toString()
  const variant = getSquareVariant(x, y)

  return (
    variant === 'light' ||
    Object.values(playerOneDiscs).some(item => item.toString() === coords) ||
    Object.values(playerTwoDiscs).some(item => item.toString() === coords)
  )
}
