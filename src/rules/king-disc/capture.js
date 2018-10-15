import _findKey from 'lodash/findKey'
import {getNextCoords} from './movement'

/**
 * Retireve the axis of diagonal movement
 *
 * @param fromCoords
 * @param toCoords
 * @returns {string}
 */
function getAxisOfMovement(fromCoords, toCoords) {
  const [fromX, fromY] = fromCoords
  const [toX, toY] = toCoords

  const xSign = Math.sign(toX - fromX)
  const ySign = Math.sign(toY - fromY)

  if (xSign === 1 && ySign === 1) {
    return 'downRight'
  }
  if (xSign === 1 && ySign === -1) {
    return 'downLeft'
  }
  if (xSign === -1 && ySign === 1) {
    return 'upRight'
  }

  return 'upLeft'
}

/**
 * Calculate the coordinates between two diagonal points based on an axis
 *
 * @param from
 * @param to
 * @param axis
 * @returns {*[][]}
 */
function getCoordsBetween(from, to, axis) {
  const length = Math.abs(from[0] - to[0])

  return Array.from({length}, (v, k) => k).map(i =>
    getNextCoords(axis, from, i + 1),
  )
}

/**
 * Retrieve all the captured discs by the King from start to end of movement
 *
 * @param toCoords
 * @param player
 * @param disckKey
 * @param discs
 * @returns {*[]}
 */
export function getKingCapturedDiscsKeys(toCoords, player, disckKey, discs) {
  const fromCoords = discs[player - 1][disckKey]
  const axis = getAxisOfMovement(fromCoords, toCoords)

  const enemyDiscs = discs[player === 1 ? 1 : 0]

  const coordsBetween = getCoordsBetween(fromCoords, toCoords, axis)

  return coordsBetween
    .map(coord =>
      _findKey(enemyDiscs, item => item.toString() === coord.toString()),
    )
    .filter(i => Boolean(i))
}
