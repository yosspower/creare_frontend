import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: localStorage.getItem("token") ? true : false,
  user: {},
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuth = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      localStorage.removeItem("token");
      state.isAuth = false;
      state.user = {};
    },
  },
});
export const { setAuth, logOut, setUser } = authSlice.actions;
export default authSlice.reducer;
