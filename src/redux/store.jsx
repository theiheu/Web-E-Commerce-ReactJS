import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import managerUsersReducer from "./managerUsersSlice";
import managerBooksReducer from "./managerBooksSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    managerUsers: managerUsersReducer,
    managerBooks: managerBooksReducer,
  },
});

export default store;
