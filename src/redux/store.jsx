import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import accountReducer from "./accountSlice";
import managerUsersReducer from "./managerUsersSlice";
import managerBooksReducer from "./managerBooksSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["account"],
};

const rootReducer = combineReducers({
  account: accountReducer,
  managerUsers: managerUsersReducer,
  managerBooks: managerBooksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // Thêm bất kỳ middleware hoặc cấu hình khác nếu cần thiết
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
