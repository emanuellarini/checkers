import {createMuiTheme} from '@material-ui/core/styles'

export default (color = '#8516FE') => {
  return createMuiTheme({
    primaryColor: color,
    palette: {
      primary: {
        main: color,
      },
      background: {
        default: '#fff',
      },
    },
  })
}
