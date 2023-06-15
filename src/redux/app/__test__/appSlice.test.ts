import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from '../slice';
import { AppStatus } from '../types';

describe('App state slice tests', () => {
  it('Initial state', () => {
    const state = configureStore({
      reducer: {
        appState: appStateReducer
      }
    }).getState();
    expect(state.appState).toEqual({
      status: AppStatus.IDLE,
      messages: [],
      isAppInitialized: false
    });
  });
});
