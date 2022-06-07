import { createTheme } from '@mui/material';
import { red, grey, green } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      light: grey['900'],
      main: grey['900'],
      contrastText: 'white'
    },
    secondary: {
      light: red['900'],
      main: red['900'],
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
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          '& .MuiStepLabel-label': {
            fontWeight: 'inherit !important'
          },
          '& .MuiStepLabel-iconContainer .Mui-completed': {
            color: green['300']
          }
        }
      }
    }
  }
});
