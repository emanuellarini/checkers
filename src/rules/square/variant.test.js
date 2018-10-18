import {getSquareVariant} from './variant'

/**
 * The rule states that players must have
 * a light square on nearest row corner
 */
describe('fn:getSquareVariant', () => {
  it('returns a light variant on player 1 right corner', () => {
    expect(getSquareVariant(7, 7)).toEqual('light')
  })

  it('returns a dark variant on player 1 left corner', () => {
    expect(getSquareVariant(7, 0)).toEqual('dark')
  })

  it('returns a light variant on player 2 right corner', () => {
    expect(getSquareVariant(0, 0)).toEqual('light')
  })

  it('returns a dark variant on player 2 left corner', () => {
    expect(getSquareVariant(7, 0)).toEqual('dark')
  })
})
