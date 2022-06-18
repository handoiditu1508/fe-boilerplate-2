import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { PaletteMode } from "@mui/material"
import { RootState } from "../../app/store";

export type ConfigState = {
  preferSystemPaletteMode: boolean,
  paletteMode: PaletteMode
};

const initialState: ConfigState = {
  preferSystemPaletteMode: true,
  paletteMode: "light"
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setPaletteMode: (state, action: PayloadAction<PaletteMode>) => {
      state.paletteMode = action.payload;
    },
    enableSystemPaletteMode: (state) => {
      state.preferSystemPaletteMode = true;
      localStorage.removeItem("paletteMode");
    },
    disableSystemPaletteMode: (state, action: PayloadAction<PaletteMode>) => {
      state.preferSystemPaletteMode = false;
      state.paletteMode = action.payload;
      localStorage.setItem("paletteMode", action.payload);
    },
    loadPaletteModeFromLocal: (state) => {
      const localPaletteMode = localStorage.getItem("paletteMode");
      if (localPaletteMode) {
        if (localPaletteMode === "light") {
          state.preferSystemPaletteMode = false;
          state.paletteMode = "light";
        } else if (localPaletteMode === "dark") {
          state.preferSystemPaletteMode = false;
          state.paletteMode = "dark";
        }
      }
    }
  }
});

export const { setPaletteMode, enableSystemPaletteMode, disableSystemPaletteMode, loadPaletteModeFromLocal } = configSlice.actions;

export const selectPaletteMode = (state: RootState) => state.config.paletteMode;
export const selectPreferSystemPaletteMode = (state: RootState) => state.config.preferSystemPaletteMode;

export default configSlice.reducer;