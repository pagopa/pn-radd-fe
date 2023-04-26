import { createSlice } from '@reduxjs/toolkit';
import { adaptedTokenExchangeError, currentUser } from '../../utils/user.utils';
import { RootState } from '../store';
import { User } from './types';
import { exchangeToken, logout } from './action';

interface UserState {
  user: User;
  isUnauthorizedUser: boolean;
  isClosedSession: boolean;
  messageUnauthorizedUser: { title: string; message: string };
}

function getLoggedUser(): User {
  return currentUser();
}

const emptyUnauthorizedMessage = { title: '', message: '' };

const initialState: UserState = {
  user: getLoggedUser(),
  isUnauthorizedUser: false,
  isClosedSession: false,
  messageUnauthorizedUser: emptyUnauthorizedMessage,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(exchangeToken.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(exchangeToken.rejected, (state, action) => {
      const adaptedError = adaptedTokenExchangeError(action.payload);
      state.isUnauthorizedUser = adaptedError.isUnauthorizedUser;
      state.messageUnauthorizedUser = adaptedError.isUnauthorizedUser
        ? adaptedError.response.customMessage
        : emptyUnauthorizedMessage;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isUnauthorizedUser = false;
      state.isClosedSession = true;
    });
  },
});

export const userSelector = (state: RootState) => state.user.user;

export const userStateSelector = (state: RootState) => state.user;

const { reducer } = slice;

// export const {} = actions;

export default reducer;
