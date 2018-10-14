import React from 'react'
import ReactDOM from 'react-dom'
import {cleanup} from 'react-testing-library'
import Disc from './Disc'

afterEach(cleanup)

describe('The Disc component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Disc dragKeyName="test-drag" player={1} />, div)
  })
})
