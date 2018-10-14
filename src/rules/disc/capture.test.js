import {getCapturedDiscKey} from './capture'

describe('fn:getCapturedDiscKey', () => {
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
