/// <reference types="react-scripts" />
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    player1: Palette['primary'];
    player2: Palette['primary'];
  }
  interface PaletteOptions {
    player1: PaletteOptions['primary'];
    player2: PaletteOptions['primary'];
  }
}
