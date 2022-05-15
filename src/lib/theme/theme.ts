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
  }
});
