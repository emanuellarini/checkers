import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import {Provider as ReduxProvider} from 'react-redux'
import createTheme from 'utils/theme'
import configureStore from 'utils/create-store'
import 'utils/i18n'

const defaultTheme = createTheme()
const defaultStore = configureStore()

export default function({
  children,
  store = defaultStore,
  theme = defaultTheme,
}) {
  return (
    <MuiThemeProvider theme={theme}>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </MuiThemeProvider>
  )
}
