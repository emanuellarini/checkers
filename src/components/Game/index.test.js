import React from 'react'
import {render, cleanup} from 'react-testing-library'
import Game from './index'
import Board from 'components/Board'

afterEach(cleanup)

describe('The Game component', () => {
  test('renders a Board', async () => {
    const GameComponent = render(<Game />)

    const BoardComponent = render(<Board />)

    expect(GameComponent.asFragment()).toEqual(BoardComponent.asFragment())
  })
})
