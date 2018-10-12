import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Game from './components/Game'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createTheme from 'utils/theme'
// import * as serviceWorker from './serviceWorker';

const theme = createTheme()

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Game />
  </MuiThemeProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
