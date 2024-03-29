import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { createAppError } from '../../utils/messages.utils';
import { AppMessage, AppStatus } from './types';

interface AppState {
  status: AppStatus;
  messages: Array<AppMessage>;
  isAppInitialized: boolean;
}

const initialState: AppState = {
  status: AppStatus.IDLE,
  messages: [],
  isAppInitialized: false,
};

// const isPending = (action: AnyAction) => action.type.endsWith('/pending');

const isFulfilled = (action: AnyAction) => action.type.endsWith('/fulfilled');

const isRejected = (action: AnyAction) => action.type.endsWith('/rejected');

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoadingStatus(state) {
      state.status = AppStatus.LOADING;
    },
    closeMessage(state, action: PayloadAction<string>) {
      state.messages = state.messages.filter((message) => message.id !== action.payload);
    },
    finishAppInitialization(state) {
      state.isAppInitialized = true;
    },
  },
  extraReducers: (builder) => {
    // builder.addMatcher(isPending, (state, action) => {
    //     state.status = AppStatus.LOADING;
    // }),
    builder.addMatcher(isFulfilled, (state) => {
      state.status = AppStatus.IDLE;
    });
    builder.addMatcher(isRejected, (state, action) => {
      state.status = AppStatus.ERROR;
      if (!action.payload || !action.payload.blockNotification) {
        const error = createAppError(action.payload);
        // Reinitialize array, preventing multiple messages displayed
        state.messages = [error];
      }
    });
  },
});

export const loadingSelector = (state: RootState) => state.app.status === AppStatus.LOADING;

export const messagesSelector = (state: RootState) => state.app.messages;

export const isAppInitializedSelector = (state: RootState) => state.app.isAppInitialized;

const { actions, reducer } = slice;

export const { setLoadingStatus, closeMessage, finishAppInitialization } = actions;

export default reducer;
