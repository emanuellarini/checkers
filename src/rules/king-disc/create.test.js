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

  test('player 1 can create a king', () => {
    expect(canCreateKings(1, player1Discs)).toEqual(['grey1'])
  })

  test('player 2 can create a king', () => {
    expect(canCreateKings(2, player2Discs)).toEqual(['red1'])
  })
})
