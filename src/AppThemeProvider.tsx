import { ComponentProps, useEffect, useMemo } from "react";
import { ThemeProvider, useMediaQuery } from "@mui/material";
import { loadPaletteModeFromLocal, selectPaletteMode, selectPreferSystemPaletteMode, setPaletteMode } from "./redux/features/config/configSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

import { createMainTheme } from "./themes";

type AppThemeProviderProps = Omit<ComponentProps<typeof ThemeProvider>, "theme">;

export default function AppThemeProvider(props: AppThemeProviderProps) {
  const dispatch = useAppDispatch();

  const paletteMode = useAppSelector(selectPaletteMode);
  const preferSystemPaletteMode = useAppSelector(selectPreferSystemPaletteMode);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Set palette mode
  useEffect(() => {
    if (preferSystemPaletteMode) {
      if (prefersDarkMode) {
        if (paletteMode !== "dark") {
          dispatch(setPaletteMode("dark"));
        }
      } else if (paletteMode !== "light") {
        dispatch(setPaletteMode("light"));
      }
    }
  }, [preferSystemPaletteMode, prefersDarkMode, paletteMode]);

  // Check palette mode in local storage
  useEffect(() => {
    dispatch(loadPaletteModeFromLocal());
  }, []);

  // Create theme base on palete mode
  const theme = useMemo(() => createMainTheme(paletteMode), [paletteMode]);

  return (
    <ThemeProvider theme={theme} {...props} />
  )
}