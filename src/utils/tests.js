import React from 'react'
import Provider from 'components/Provider'
import {createStore} from 'redux'
import reducers from 'store'

export const Wrapper = props => {
  const store = createStore(reducers, props.store || {})

  return <Provider store={store}>{props.children}</Provider>
}
