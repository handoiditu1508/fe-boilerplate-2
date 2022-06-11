import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import authenticationService from "../../../services/authenticationService";

export interface AuthenticationState {
  currentUser: any | null,
  loading: boolean,
  error: string | null | undefined
};

const initialState: AuthenticationState = {
  currentUser: null,
  loading: false,
  error: null
};

export const loginAsync = createAsyncThunk(
  "authentication/loginAsync",
  async (loginForm:any) => {
    const response = await authenticationService.login(loginForm);
    return response;
  }
);

const getCurrentUser = (): any | null => {
  const expirationString = localStorage.getItem("expirationTime");
  if (!expirationString) {
    return null;
  }

  const expirationTime = new Date(expirationString);
  if (expirationTime <= new Date()) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
    return null;
  }

  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("user");
    },
    loadCurrentUserFromLocal: (state) => {
      state.currentUser = getCurrentUser()
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("expirationTime", action.payload.expirationTime.toString());
        localStorage.setItem("user", JSON.stringify(action.payload.user));

        state.currentUser = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { logout, loadCurrentUserFromLocal } = authenticationSlice.actions;

export const selectCurrentUser = (state: RootState) => state.authentication.currentUser;
export const selectLoading = (state: RootState) => state.authentication.loading;
export const selectError = (state: RootState) => state.authentication.error;

export default authenticationSlice.reducer;