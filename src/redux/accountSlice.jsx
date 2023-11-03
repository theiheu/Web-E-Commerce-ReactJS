import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    isAuthenticated: false,
    user: {
      id: "",
      email: "",
      phone: "",
      fullName: "",
      role: "",
      avatar: "",
    },
  },
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      // state = { isAuthenticated: true, user: action.payload };
    },
    doGetAccountAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      // state = { isAuthenticated: true, user: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { doLoginAction, doGetAccountAction } = accountSlice.actions;

export default accountSlice.reducer;
