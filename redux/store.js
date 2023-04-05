import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import userReducer from './slices/userSlice';
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
});
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
