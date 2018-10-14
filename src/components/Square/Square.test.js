import React from 'react'
import ReactDOM from 'react-dom'
import {cleanup} from 'react-testing-library'
import Square from './Square'

afterEach(cleanup)

describe('The Square component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Square size={8} coords={[0, 0]} isDropping={false} />, div)
  })
})
