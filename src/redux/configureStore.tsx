// store.js
import { configureStore } from '@reduxjs/toolkit';
import memoReducer from './memoSlice';

const store = configureStore({
  reducer: {
    memo: memoReducer,
  },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store;
