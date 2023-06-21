import data from '../../../mocks/data';
import { store } from '../../store';
import { exchangeToken, logout } from '../action';

describe('UserSlice state test', () => {
  it('Test initial state', () => {
    const state = store.getState();
    expect(state.user).toEqual({
      user: {
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
      },
      isUnauthorizedUser: false,
      isClosedSession: false,
      messageUnauthorizedUser: { title: '', message: '' },
    });
  });

  it('handle exchangeToken action', async () => {
    const spidToken = 'test';

    const action = await store.dispatch(exchangeToken(spidToken));
    expect(action.type).toBe('exchangeToken/fulfilled');
    const stateAfter = store.getState().user;

    expect(stateAfter.user).toEqual(data.USER);
  });

  it('handle logout action', async () => {
    const action = await store.dispatch(logout());
    expect(action.type).toBe('logout/fulfilled');
    const stateAfter = store.getState().user;

    expect(stateAfter.user).toEqual({
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
    });
  });
});
