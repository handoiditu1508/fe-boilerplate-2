import { Box, ButtonGroup, IconButton, useTheme } from "@mui/material";
import { disableSystemPaletteMode, enableSystemPaletteMode, selectPaletteMode, selectPreferSystemPaletteMode } from "../../redux/features/config/configSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import React from "react";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

function Header() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const paletteMode = useAppSelector(selectPaletteMode);
  const preferSystemPaletteMode = useAppSelector(selectPreferSystemPaletteMode);

  const handleLightMode = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(disableSystemPaletteMode("light"));
  };

  const handleSystemMode = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(enableSystemPaletteMode());
  };

  const handleDarkMode = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(disableSystemPaletteMode("dark"));
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.primary.main }}>
      Header
      <ButtonGroup aria-label="outlined primary button group">
        <IconButton color="secondary" onClick={handleLightMode} disabled={!preferSystemPaletteMode && paletteMode === "light"}><LightModeIcon /></IconButton>
        <IconButton color="secondary" onClick={handleSystemMode} disabled={preferSystemPaletteMode}><SettingsSuggestIcon /></IconButton>
        <IconButton color="secondary" onClick={handleDarkMode} disabled={!preferSystemPaletteMode && paletteMode === "dark"}><DarkModeIcon /></IconButton>
      </ButtonGroup>
    </Box>
  );
}

export default Header;