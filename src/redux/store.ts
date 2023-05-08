import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app/slice';
import userReducer from './user/slice';
import documentInquiryReducer from './document-inquiry/slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    documentInquiry: documentInquiryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
