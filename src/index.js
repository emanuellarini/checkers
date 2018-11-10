import React from 'react'
import ReactDOM from 'react-dom'
import Game from './components/Game'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import {Provider} from 'react-redux'
import createTheme from 'utils/theme'
import configureStore from './utils/create-store'
import CssBaseline from '@material-ui/core/CssBaseline'
// import * as serviceWorker from './serviceWorker';

const theme = createTheme()
const store = configureStore()

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <React.Fragment>
        <CssBaseline />
        <Game />
      </React.Fragment>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
