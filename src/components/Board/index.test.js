import React from 'react'
import {render, cleanup} from 'react-testing-library'
import Board from './index'

afterEach(cleanup)

describe('The Board component', () => {
  test('renders 64 Squares by default', async () => {
    const {getByTestId} = render(<Board />)

    expect(getByTestId('board').children.length).toEqual(64)
  })

  test('renders Players Discs', async () => {
    const playerOne = {g1: [0, 0], g2: [0, 2]}
    const playerTwo = {r1: [7, 0], r2: [7, 2]}

    const props = {
      playerOne: {discs: playerOne, kings: []},
      playerTwo: {discs: playerTwo, kings: []},
    }

    const {getAllByTestId} = render(<Board {...props} />)

    expect(getAllByTestId('disc-player-1').length).toEqual(2)
    expect(getAllByTestId('disc-player-2').length).toEqual(2)
  })

  test('renders Players King Discs', async () => {
    const playerOne = {g1: [0, 0], g2: [0, 2]}
    const playerTwo = {r1: [7, 0], r2: [7, 2]}

    const props = {
      playerOne: {discs: playerOne, kings: ['g1']},
      playerTwo: {discs: playerTwo, kings: ['r2']},
    }

    const {getAllByTestId} = render(<Board {...props} />)

    expect(getAllByTestId('king-disc-player-1').length).toEqual(1)
    expect(getAllByTestId('king-disc-player-2').length).toEqual(1)
  })
})
