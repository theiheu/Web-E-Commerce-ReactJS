import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import managerUsersReducer from "./managerUsersSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    managerUsers: managerUsersReducer,
  },
});

export default store;
