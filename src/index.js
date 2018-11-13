import React from 'react'
import ReactDOM from 'react-dom'
import Game from './components/Game'
import CssBaseline from '@material-ui/core/CssBaseline'
import Provider from './components/Provider'
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider>
    <React.Fragment>
      <CssBaseline />
      <Game />
    </React.Fragment>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
