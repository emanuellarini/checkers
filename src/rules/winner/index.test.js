import verifyWinner from './index'

/**
 * The rule states that players must have
 * a light square on nearest row corner
 */
describe('fn:verifyWinner', () => {
  const player1 = {
    discs: {grey1: [0, 2]},
    kings: ['grey1'],
  }

  const player2 = {
    discs: {red1: [6, 4]},
    kings: ['red1'],
  }

  const player1WithoutDiscs = {
    ...player1,
    discs: {},
  }

  const player2WithoutDiscs = {
    ...player2,
    discs: {},
  }

  const player1WithoutKings = {
    ...player1,
    kings: [],
  }

  const player2WithoutKings = {
    ...player2,
    kings: [],
  }

  it('returns player 1 won when player 2 has no discs', () => {
    expect(verifyWinner(player1, player2WithoutDiscs)).toEqual(1)
  })

  it('returns player 2 won when player 1 has no discs', () => {
    expect(verifyWinner(player1WithoutDiscs, player2)).toEqual(2)
  })

  it('returns player 1 won when player 2 has a disc versus a king disc', () => {
    expect(verifyWinner(player1, player2WithoutKings)).toEqual(1)
  })

  it('returns player 2 won when player 1 has a disc versus a king disc', () => {
    expect(verifyWinner(player1WithoutKings, player2)).toEqual(2)
  })

  it('returns null when player still have discs', () => {
    expect(verifyWinner(player1, player2)).toEqual(null)
  })
})
