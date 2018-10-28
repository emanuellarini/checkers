import React from 'react'
import {render, cleanup} from 'react-testing-library'
import Board from './index'
import ReactDOM from 'react-dom'
import {Wrapper, createFromStore} from 'utils/tests'

afterEach(cleanup)

describe('The Board component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Wrapper>
        <Board />
      </Wrapper>,
      div,
    )
  })

  it('renders 64 Squares by default', async () => {
    const {getByTestId} = render(
      <Wrapper>
        <Board />
      </Wrapper>,
    )

    expect(getByTestId('board').children.length).toEqual(64)
  })

  it('renders 12 Player 1 Discs', async () => {
    const {getAllByTestId} = render(
      <Wrapper>
        <Board />
      </Wrapper>,
    )

    expect(getAllByTestId(/disc-player-1-*/).length).toEqual(12)
  })

  it('renders 12 Player 2 Discs', async () => {
    const {getAllByTestId} = render(
      <Wrapper>
        <Board />
      </Wrapper>,
    )

    expect(getAllByTestId(/disc-player-2-*/).length).toEqual(12)
  })

  it('renders Players King Discs', async () => {
    const store = createFromStore({
      player2: {kings: ['red1']},
      player1: {kings: ['grey1']},
    })

    const {getAllByTestId} = render(
      <Wrapper store={store}>
        <Board />
      </Wrapper>,
    )

    expect(getAllByTestId(/king-disc-player-1-*/).length).toEqual(1)
    expect(getAllByTestId(/king-disc-player-2-*/).length).toEqual(1)
  })
})
