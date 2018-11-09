import {createMuiTheme} from '@material-ui/core/styles'

export default () => {
  return createMuiTheme({
    palette: {
      primary: {
        main: '#494949',
      },
      secondary: {
        main: '#B20000',
      },
      background: {
        default: '#fafafa',
      },
      square: {
        dark: '#88665D',
        light: '#BCAA99',
        border: '#E2B100',
      },
      board: {
        border: '#492510',
      },
    },
    typography: {
      useNextVariants: true,
    },
  })
}
