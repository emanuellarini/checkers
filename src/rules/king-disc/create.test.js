import {canCreateKing} from './create'

describe('The fn:canCreateKing', () => {
  it('determine if player 1 created a King Disc', () => {
    expect(canCreateKing([0, 2], 1)).toEqual(true)
  })

  it('determine if player 2 created a King Disc', () => {
    expect(canCreateKing([7, 2], 2)).toEqual(true)
  })
})
