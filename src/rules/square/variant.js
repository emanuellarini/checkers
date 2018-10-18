/**
 * Determine the variant type of Square
 *
 * @returns {string}
 */
export function getSquareVariant(x, y) {
  const evenX = Number(x) % 2 === 0

  if (Number(y) % 2 === 0) {
    return evenX ? 'light' : 'dark'
  }

  return evenX ? 'dark' : 'light'
}
