import { createSlice } from "@reduxjs/toolkit";

import { User } from "../../interfaces/User";

const auth: User = {
  accessToken: null,
  user: null,
  roles: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: auth,
  reducers: {
    setCredentials: (state, action) => {
      const { user, access_token } = action.payload;

      if (user) {
        state.user = user;
      }
      if (access_token) {
        state.accessToken = access_token;
      }
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
    },
    setRoles:(state, action) => {
      state.roles = action.payload
    }
  },
});

export default authSlice.reducer;
export const { setCredentials, logOut,setRoles } = authSlice.actions;
