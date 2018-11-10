/**
 * Retrieve the winner if the opposite player doesnt own a Disc
 *
 * @param {Object} playersDiscs
 * @returns {number|null}
 */
function playerDoesntOwnADisc(playersDiscs) {
  if (!Object.keys(playersDiscs[1].discs).length) {
    return 2
  }

  if (!Object.keys(playersDiscs[2].discs).length) {
    return 1
  }

  return null
}

/**
 * Retrieve the winner if the player owns a king disc versus a common disc from opponent
 *
 * @param {Object} playersDiscs
 * @returns {number|null}
 */
function playerHasADiscVersusAKing(playersDiscs) {
  if (
    Object.keys(playersDiscs[1].discs).length === 1 &&
    playersDiscs[1].kings.length === 0 &&
    playersDiscs[2].kings.length === 1
  ) {
    return 2
  }

  if (
    Object.keys(playersDiscs[2].discs).length === 1 &&
    playersDiscs[2].kings.length === 0 &&
    playersDiscs[1].kings.length === 1
  ) {
    return 1
  }

  return null
}

/**
 * Retrieve the winner player if it exists
 *
 * @param {Object} player1
 * @param {Object} player2
 * @returns {number|null}
 */
export default function lookForAWinner(player1, player2) {
  let player = null

  const playersDiscs = {
    1: player1,
    2: player2,
  }

  player = playerDoesntOwnADisc(playersDiscs)

  if (player) return player

  return playerHasADiscVersusAKing(playersDiscs)
}
