import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    user: {
      isAuthorization: false,
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
      state.user = { isAuthorization: true, ...action.payload };
    },
    doGetAccountAction: (user) => {
      console.log(`user:`, user);
    },
  },
});

// Action creators are generated for each case reducer function
export const { doLoginAction, doGetAccountAction } = accountSlice.actions;

export default accountSlice.reducer;
