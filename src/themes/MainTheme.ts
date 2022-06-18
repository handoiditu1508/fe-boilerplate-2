import { PaletteMode, Theme, ThemeOptions, colors, createTheme } from "@mui/material";

type ThemeOptionDictionaryType = { [key in PaletteMode]: ThemeOptions | undefined }

const themeOptionDictionary: ThemeOptionDictionaryType = {
  light: {
    palette: {
      mode: "light",
      favorite: {
        main: colors.lime["A100"]
      }
    }
  },
  dark: {
    palette: {
      mode: "dark",
      favorite: {
        main: colors.lime["A100"]
      }
    }
  }
};

export const createMainTheme = (mode: PaletteMode): Theme => {
  return createTheme(themeOptionDictionary[mode]);
};