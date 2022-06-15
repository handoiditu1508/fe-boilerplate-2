import { PaletteColor, PaletteColorOptions } from "@mui/material/styles";

declare module '@mui/material/styles' {
  export interface Theme {
  }

  export interface ThemeOptions {
  }

  export interface Palette {
    favorite?: PaletteColor
  }

  export interface PaletteOptions {
    favorite?: PaletteColorOptions
  }
}