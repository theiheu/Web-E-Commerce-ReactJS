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
      state.user = {action.payload}
    },
  },
});

// Action creators are generated for each case reducer function
export const { doLoginAction } = accountSlice.actions;

export default accountSlice.reducer;
