import {createMuiTheme} from '@material-ui/core/styles'

export default () => {
  return createMuiTheme({
    palette: {
      primary: {
        light: '#7d7d7d',
        main: '#212121',
      },
      secondary: {
        main: '#B20000',
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
    overrides: {
      MuiAppBar: {
        root: {
          backgroundColor: '#313131 !important',
          color: '#fff !important',
        },
      },
    },
  })
}
