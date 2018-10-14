import {
  calculateMovableSquares,
  getCapturedDiscKey,
  canCreateKing,
} from './helpers'

/**
 * x = player1 discs
 * o = player2 discs
 */
describe('The Game Helpers fn:calculateMovableSquares', () => {
  const player1 = 1

  /**
   * Considering only 0,0 to 2,2 of the board
   *
   * _ _ o         ! _ _ o         _ x o
   * x _ _   ===>    _ _ _    OR   _ _ _
   * _ _ _           _ _ _         _ _ _
   *                invalid        valid
   */
  it('can move x to right diagonal and can not move outside of the board', () => {
    const xCoords = [1, 0]
    const discs = [{g1: xCoords}, {r1: [0, 2]}]
    expect(calculateMovableSquares(player1, 'g1', discs)).toEqual([[0, 1]])
  })

  /**
   * Considering only 0,5 to 2,7 of the board
   *
   * _ _ o          _ _ o !        _ x o
   * _ _ x   !==>   _ _ _     OR   _ _ _
   * _ _ _          _ _ _          _ _ _
   *                invalid        valid
   */
  it('can move x to left diagonal and can not move outside of the board', () => {
    const xCoords = [1, 7]
    const discs = [{g1: xCoords}, {r1: [0, 2]}]
    expect(calculateMovableSquares(player1, 'g1', discs)).toEqual([[0, 6]])
  })

  /**
   * Considering only 0,0 to 2,2 of the board
   *
   * _ _ o          _ _ o        _ _ o
   * _ _ _   ===>   x _ _   OR   _ _ x
   * _ x _          _ _ _        _ _ _
   *                valid        valid
   */
  it('can move x to left diagonal and right diagonal', () => {
    const xCoords = [2, 1]
    const discs = [{g1: xCoords}, {r1: [0, 2]}]
    expect(calculateMovableSquares(player1, 'g1', discs)).toEqual([
      [1, 0],
      [1, 2],
    ])
  })

  /**
   * Considering only 0,0 to 2,2 of the board
   *
   * _ _ o          _ _ o        _ _ o
   * _ _ x   ===>   x _ x   OR   _ _ !
   * _ x _          _ _ _        _ _ _
   *                valid        invalid
   */
  it('can move x to left diagonal and not to the right when is blocked by friendly disc', () => {
    const xCoords = [2, 1]
    const discs = [{g1: xCoords, g2: [1, 2]}, {r1: [0, 2]}]
    expect(calculateMovableSquares(player1, 'g1', discs)).toEqual([[1, 0]])
  })

  /**
   * Considering only 0,0 to 2,2 of the board
   *
   * _ _ o          _ _ o        _ _ o
   * x _ _   ===>   x _ x   OR   ! _ _
   * _ x _          _ _ _        _ x _
   *                valid        invalid
   */
  it('can move x to right diagonal and not to the left when is blocked by friendly disc', () => {
    const xCoords = [2, 1]
    const discs = [{g1: xCoords, g2: [1, 0]}, {r1: [0, 2]}]
    expect(calculateMovableSquares(player1, 'g1', discs)).toEqual([[1, 2]])
  })

  /**
   * Considering only 0,0 to 2,2 of the board
   *
   * _ _ _          _ _ x
   * _ o _   ===>   _ o _
   * x _ _          _ _ _
   *                valid
   */
  it('can make a jump towards', () => {
    const xCoords = [2, 0]
    const discs = [{g1: xCoords}, {r1: [1, 1]}]
    expect(calculateMovableSquares(player1, 'g1', discs)).toEqual([[0, 2]])
  })

  /**
   * Considering only 0,0 to 2,2 of the board
   *
   * _ _ o          _ _ !
   * _ o _   ===>   _ o _
   * x _ _          _ _ _
   *               invalid
   */
  it('can not make a jump towards if there is an enemy disc on land square', () => {
    const xCoords = [2, 0]
    const discs = [{g1: xCoords}, {r1: [1, 1], r2: [0, 2]}]
    expect(calculateMovableSquares(player1, 'g1', discs)).toEqual([])
  })

  /**
   * Considering only 0,0 to 2,2 of the board
   *
   * _ _ x          _ _ !
   * _ o _   ===>   _ o _
   * x _ _          _ _ _
   *               invalid
   */
  it('can not make a jump towards if there is a friendly disc on land square', () => {
    const xCoords = [2, 0]
    const discs = [{g1: xCoords, g2: [0, 2]}, {r1: [1, 1]}]
    expect(calculateMovableSquares(player1, 'g1', discs)).toEqual([])
  })
  /////////////

  /**
   * Considering only 0,0 to 2,2 of the board
   *
   * _ _ x          _ _ _
   * _ o _   ===>   _ o _
   * _ _ _          x _ _
   *                valid
   */
  it('can make a jump backwards', () => {
    const xCoords = [0, 2]
    const discs = [{g1: xCoords}, {r1: [1, 1]}]
    expect(calculateMovableSquares(player1, 'g1', discs)).toEqual([[2, 0]])
  })

  /**
   * Considering only 0,0 to 2,2 of the board
   *
   * _ _ x          _ _ _
   * _ o _   ===>   _ o _
   * x _ _          ! _ _
   *               invalid
   */
  it('can not make a jump bakwards if there is a disc on land square', () => {
    const xCoords = [0, 2]
    const discs = [{g1: xCoords, g2: [2, 0]}, {r1: [1, 1]}]
    expect(calculateMovableSquares(player1, 'g1', discs)).toEqual([])
  })
})

describe('The Game Helpers fn:getCapturedDiscKey', () => {
  /**
   * Considering only 0,0 to 2,2 of the board
   *
   * _ _ _          _ _ x
   * _ o _   ===>   _ _ _
   * x _ _          _ _ _
   *               captured!
   */
  it('retrieve the disc key name when a capture is achieved', () => {
    const xCoords = [2, 0]
    const landedCoords = [0, 2]
    const discs = [{g1: xCoords}, {r1: [1, 1]}]
    expect(getCapturedDiscKey(landedCoords, 1, 'g1', discs)).toEqual('r1')
  })

  /**
   * Considering only 0,0 to 2,2 of the board
   *
   * _ _ o          _ _ o
   * _ _ _   ===>   _ x _
   * x _ _          _ _ _
   *               not captured!
   */
  it('does not retrieve the disc key name when a capture is achieved', () => {
    const xCoords = [2, 0]
    const landedCoords = [1, 1]
    const discs = [{g1: xCoords}, {r1: [0, 2]}]
    expect(getCapturedDiscKey(landedCoords, 1, 'g1', discs)).toEqual(null)
  })
})

describe('The Game heleprs fn:canCreateKing', () => {
  it('determine if player 1 created a King Disc', () => {
    expect(canCreateKing([0, 2], 1)).toEqual(true)
  })

  it('determine if player 2 created a King Disc', () => {
    expect(canCreateKing([7, 2], 2)).toEqual(true)
  })
})
