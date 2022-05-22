import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    player1: {
      main: 'black',
      contrastText: 'white'
    },
    player2: {
      main: 'red',
      contrastText: 'white'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#313131 !important',
          color: '#fff !important'
        }
      }
    }
  }
});
