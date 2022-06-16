import { LoginForm, User } from "../../../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import AuthenticationService from "../../../services/AuthenticationService";
import { RootState } from "../../app/store";

export type AuthenticationState = {
  currentUser: User | undefined,
  loading: boolean,
  error: string | undefined
};

const initialState: AuthenticationState = {
  currentUser: undefined,
  loading: false,
  error: undefined
};

export const loginAsync = createAsyncThunk(
  "authentication/loginAsync",
  async (loginForm: LoginForm) => {
    const authenticationService = new AuthenticationService();
    const response = await authenticationService.login(loginForm);
    return response;
  }
);

const getCurrentUser = (): User | undefined => {
  const expirationString = localStorage.getItem("expirationTime");
  if (!expirationString) {
    return undefined;
  }

  const expirationTime = new Date(expirationString);
  if (expirationTime <= new Date()) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
    return undefined;
  }

  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : undefined
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = undefined;

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
        state.error = undefined;
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