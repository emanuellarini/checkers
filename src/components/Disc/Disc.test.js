import React from 'react'
import ReactDOM from 'react-dom'
import {cleanup} from 'react-testing-library'
import Disc from './Disc'
import {Wrapper} from 'utils/tests'

afterEach(cleanup)

describe('The Disc component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Wrapper>
        <Disc dragKeyName="test-drag" player={1} />
      </Wrapper>,
      div,
    )
  })
})
