/**
 * Retrieve the Kings Coords from a player discs and its coords
 *
 * @param player
 * @param discs
 * @returns {Array}
 */
function getKingsCoords(player, discs) {
  const kingCoords = {
    1: JSON.stringify([[0, 1], [0, 3], [0, 5], [0, 7]]),
    2: JSON.stringify([[7, 0], [7, 2], [7, 4], [7, 6]]),
  }

  return Object.keys(discs).reduce((a, v) => {
    const stringifyedCoord = JSON.stringify(discs[v])

    if (kingCoords[player].includes(stringifyedCoord)) {
      a.push(v)
    }

    return a
  }, [])
}

/**
 * Retrieve the Discs who will be transformed into Kings
 *
 * @param player1Discs
 * @param player2Discs
 * @returns {boolean}
 */
export function canCreateKings(player1Discs, player2Discs) {
  return {
    1: getKingsCoords(1, player1Discs),
    2: getKingsCoords(2, player2Discs),
  }
}
