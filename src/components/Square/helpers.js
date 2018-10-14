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
