import React from 'react'
import ReactDOM from 'react-dom'
import {cleanup} from 'react-testing-library'
import Square from './styled'
import {Wrapper} from 'utils/tests'

afterEach(cleanup)

describe('The Square component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Wrapper>
        <Square coords={[0, 0]} isDropping={false} />
      </Wrapper>,
      div,
    )
  })
})
