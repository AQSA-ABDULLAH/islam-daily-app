// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import prayerReducer from "./features/prayerSlice";
import sehriIftarReducer from "./features/sehriIftarSlice";
import visitorReducer from "./features/visitorSlice";

const store = configureStore({
  reducer: {
    prayer: prayerReducer,
    visitor: visitorReducer,
    sehriIftar: sehriIftarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
