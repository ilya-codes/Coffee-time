import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  email: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isAdmin: false,
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
    adminLogIn: (state) => {
      state.isAdmin = true;
    },
    adminLogOut: (state) => {
      state.isAdmin = false;
    },
  },
});

export default authSlice.reducer;
export const { logIn, logOut, adminLogIn, adminLogOut } = authSlice.actions;
