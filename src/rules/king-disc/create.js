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
