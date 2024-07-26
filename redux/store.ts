import { configureStore } from "@reduxjs/toolkit";
import { expenses } from "@/redux/slice/api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [expenses.reducerPath]: expenses.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expenses.middleware),
});
setupListeners(store.dispatch);