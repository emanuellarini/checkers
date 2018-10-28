import React from 'react'
import ReactDOM from 'react-dom'
import {cleanup} from 'react-testing-library'
import Game from './index'
import {Wrapper} from 'utils/tests'

afterEach(cleanup)

describe('The Game component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Wrapper>
        <Game />
      </Wrapper>,
      div,
    )
  })
})
