import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from './types';
import { currentUser } from '../../utils/user.utils';
import { RootState } from '../store';

interface UserState {
  user: User;
}

function getLoggedUser(): User {
  return currentUser();
}

const initialState: UserState = {
  user: getLoggedUser(),
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const userSelector = (state: RootState) => state.user.user;

const { actions, reducer } = slice;

export const {} = actions;

export default reducer;
