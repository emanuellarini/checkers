import {calculateKingMovableSquares} from './movement'

/**
 * k = player1 king discs
 * x = player1 discs
 * o = player2 discs
 */
describe('The fn:calculateKingMovableSquares', () => {
  const player1 = 1

  /**
   * starting from 0,7
   *
   * _ _ _
   * _ _ _
   * k _ _
   *
   */
  it('can move in all diagonals', () => {
    const kingCoords = [5, 2]
    const discs = [{g1: kingCoords}, {r1: [3, 2]}]

    const upRightDiagonals = [[4, 3], [3, 4], [2, 5], [1, 6], [0, 7]]
    const upLeftDiagonals = [[4, 1], [3, 0]]
    const downLeftDiagonals = [[6, 1], [7, 0]]
    const downRightDiagonals = [[6, 3], [7, 4]]

    const result = [
      ...upRightDiagonals,
      ...upLeftDiagonals,
      ...downLeftDiagonals,
      ...downRightDiagonals,
    ]
    expect(calculateKingMovableSquares(player1, 'g1', discs)).toEqual(result)
  })

  /**
   * starting from 0,7
   *
   * _ _ o
   * _ x _
   * k _ _
   *
   */
  it('can not move over friendly discs', () => {
    const kingCoords = [7, 0]
    const discs = [{g1: kingCoords, g2: [6, 1]}, {r1: [5, 2]}]
    expect(calculateKingMovableSquares(player1, 'g1', discs)).toEqual([])
  })

  /**
   * starting from 0,7
   *
   * _ _ _
   * _ o _
   * k _ _
   *
   */
  it('can move over enemy discs', () => {
    const kingCoords = [7, 0]
    const discs = [{g1: kingCoords}, {r1: [6, 1]}]
    const upRightDiagonals = [[5, 2], [4, 3], [3, 4], [2, 5], [1, 6], [0, 7]]
    expect(calculateKingMovableSquares(player1, 'g1', discs)).toEqual(
      upRightDiagonals,
    )
  })

  /**
   * starting from 0,7
   *
   * _ _ o
   * _ o _
   * k _ _
   *
   */
  it('can not move over two adjacent enemy discs', () => {
    const kingCoords = [7, 0]
    const discs = [{g1: kingCoords}, {r1: [6, 1], r2: [5, 2]}]
    expect(calculateKingMovableSquares(player1, 'g1', discs)).toEqual([])
  })
})
