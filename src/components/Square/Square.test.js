import React from 'react'
import ReactDOM from 'react-dom'
import {cleanup} from 'react-testing-library'
import Square from './styled'

afterEach(cleanup)

describe('The Square component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Square coords={[0, 0]} isDropping={false} />, div)
  })
})
