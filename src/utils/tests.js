import React from 'react'
import {Provider} from 'react-redux'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import {createStore} from 'redux'
import 'utils/i18n'
import reducers from 'store'
import createTheme from './theme'

const theme = createTheme()

export const Wrapper = props => {
  const store = createStore(reducers, props.store || {})

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>{props.children}</Provider>
    </MuiThemeProvider>
  )
}
