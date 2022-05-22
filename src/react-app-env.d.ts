/// <reference types="react-scripts" />
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    player0: Palette['primary'];
    player1: Palette['primary'];
  }
  interface PaletteOptions {
    player0: PaletteOptions['primary'];
    player1: PaletteOptions['primary'];
  }
}
