import React from 'react'
import {Provider} from 'react-redux'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import {createStore} from 'redux'
import reducers from 'store'
import createTheme from './theme'

const store = createStore(reducers)
const theme = createTheme()

export const createFromStore = data => createStore(reducers, data)

export const Wrapper = props => (
  <MuiThemeProvider theme={theme}>
    <Provider store={props.store || store}>{props.children}</Provider>
  </MuiThemeProvider>
)
