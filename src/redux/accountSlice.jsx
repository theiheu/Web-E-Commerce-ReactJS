import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    isAuthenticated: false,
    isLoading: true,
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
      return {
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    },
    doGetAccountAction: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    },
    doLogoutAction: (state) => {
      localStorage.removeItem("access_token");
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: "",
          email: "",
          phone: "",
          fullName: "",
          role: "",
          avatar: "",
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { doLoginAction, doGetAccountAction, doLogoutAction } =
  accountSlice.actions;

export default accountSlice.reducer;
