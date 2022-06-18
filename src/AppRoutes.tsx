import React, { useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, useMediaQuery } from "@mui/material";
import { loadPaletteModeFromLocal, selectPaletteMode, selectPreferSystemPaletteMode, setPaletteMode } from "./redux/features/config/configSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

import App from "./App";
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RequireAuth from "./components/RequireAuth";
import Suspense from "./components/Suspense";
import { createMainTheme } from "./themes";
import { loadCurrentUserFromLocal } from "./redux/features/authentication/authenticationSlice";

const Expenses = React.lazy(() => import("./pages/Expenses"));
const Invoices = React.lazy(() => import("./pages/Invoices"));

export default function AppRoutes() {
  const dispatch = useAppDispatch();

  // Check login user
  useEffect(() => {
    dispatch(loadCurrentUserFromLocal());
  }, []);

  // Set palette mode
  const paletteMode = useAppSelector(selectPaletteMode);
  const preferSystemPaletteMode = useAppSelector(selectPreferSystemPaletteMode);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  useEffect(()=>{
    console.log(preferSystemPaletteMode, prefersDarkMode, paletteMode);
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
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="expenses" element={<Suspense><Expenses /></Suspense>} />
          <Route path="invoices" element={<Suspense><Invoices /></Suspense>}>
            <Route index
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Select an invoice</p>
                </main>
              }
            />
            <Route path=":invoiceId" element={<Invoice />} />
          </Route>
          <Route path="login" element={<Suspense><Login /></Suspense>} />
          <Route path="profile" element={<RequireAuth><Suspense><Profile /></Suspense></RequireAuth>} />
          <Route path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}