import {canCreateKings} from './create'

describe('The fn:canCreateKings', () => {
  const player1Discs = {
    grey1: [0, 1],
    grey2: [1, 0],
  }

  const player2Discs = {
    red1: [7, 0],
    red2: [6, 1],
  }

  it('returns King Discs Coords', () => {
    expect(canCreateKings(player1Discs, player2Discs)).toEqual({
      1: ['grey1'],
      2: ['red1'],
    })
  })
})
