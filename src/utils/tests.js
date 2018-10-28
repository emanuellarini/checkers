import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducers from 'store'

const store = createStore(reducers)

export const createFromStore = data => createStore(reducers, data)

export const Wrapper = props => (
  <Provider store={props.store || store}>{props.children}</Provider>
)
