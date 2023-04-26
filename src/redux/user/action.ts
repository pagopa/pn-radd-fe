import { AuthApi } from '../../api/auth/Auth.api';
import { createAppAsyncThunk } from '../thunk';
import { User } from './types';

export const exchangeToken = createAppAsyncThunk<User, string>(
  'exchangeToken',
  async (spidToken: string, { rejectWithValue }) => {
    try {
      const user = await AuthApi.exchangeToken(spidToken);
      sessionStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const logout = createAppAsyncThunk<User>('logout', async () => {
  sessionStorage.clear();
  return {
    sessionToken: '',
    name: '',
    family_name: '',
    fiscal_number: '',
    email: '',
    mobile_phone: '',
    from_aa: false,
    uid: '',
    level: '',
    iat: 0,
    exp: 0,
    iss: '',
    jti: '',
    aud: '',
  } as User;
});
