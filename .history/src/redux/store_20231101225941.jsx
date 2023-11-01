import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";

configureStore({
  reducer: {
    account: accountReducer,
  },
});

export default configureStore;
