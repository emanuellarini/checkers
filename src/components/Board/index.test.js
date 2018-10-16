import React from 'react'
import {render, cleanup} from 'react-testing-library'
import Board from './index'
import ReactDOM from 'react-dom'

afterEach(cleanup)

describe('The Board component', () => {
  const playerOne = {g1: [0, 1], g2: [0, 3]}
  const playerTwo = {r1: [7, 0], r2: [7, 2]}
  let props = {
    playerOne: {discs: playerOne, kings: []},
    playerTwo: {discs: playerTwo, kings: []},
    onDragEnd: jest.fn(),
  }

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Board {...props} />, div)
  })

  it('renders 64 Squares by default', async () => {
    const {getByTestId} = render(<Board {...props} />)

    expect(getByTestId('board').children.length).toEqual(64)
  })

  it('renders Players Discs', async () => {
    const {getAllByTestId} = render(<Board {...props} />)

    expect(getAllByTestId(/disc-player-1-*/).length).toEqual(2)
    expect(getAllByTestId(/disc-player-2-*/).length).toEqual(2)
  })

  it('renders Players King Discs', async () => {
    props = {
      ...props,
      playerOne: {discs: playerOne, kings: ['g1']},
      playerTwo: {discs: playerTwo, kings: ['r2']},
    }

    const {getAllByTestId} = render(<Board {...props} />)

    expect(getAllByTestId(/king-disc-player-1-*/).length).toEqual(1)
    expect(getAllByTestId(/king-disc-player-2-*/).length).toEqual(1)
  })
})
