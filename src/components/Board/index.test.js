import React from 'react'
import {render, cleanup} from 'react-testing-library'
import Board from './index'

afterEach(cleanup)

describe('The Board component', () => {
  test('renders 64 squares by default', async () => {
    const {getByTestId} = render(<Board />)

    expect(getByTestId('board').children.length).toEqual(64)
  })

  test('renders 16 squares', async () => {
    const {getByTestId} = render(<Board height={4} width={4} />)

    expect(getByTestId('board').children.length).toEqual(16)
  })
})
