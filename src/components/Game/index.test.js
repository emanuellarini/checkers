import React from 'react'
import ReactDOM from 'react-dom'
import {cleanup} from 'react-testing-library'
import Game from './index'

afterEach(cleanup)

describe('The Game component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Game />, div)
  })
})
