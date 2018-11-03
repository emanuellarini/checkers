import React from 'react'
import {Provider} from 'react-redux'
import createStore from 'utils/create-store'

export default ({children}) => (
  <Provider store={createStore()}>{children}</Provider>
)
