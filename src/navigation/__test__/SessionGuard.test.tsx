import { act, screen, waitFor } from '@testing-library/react';
import { render, defaultPreloadedState } from '../../test-utils';
import { SessionGuard } from '../SessionGuard';
import { LEAVING_APP_TITLE } from '../../utils/string.utils';

jest.setTimeout(15000);

const mockNavigateFn = jest.fn(() => {});

/* eslint-disable functional/no-let */
let mockLocationHash: string; // #token=mocked_token

jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    Outlet: () => <div>Generic Page</div>,
    useNavigate: () => mockNavigateFn,
    useLocation: () => ({ hash: mockLocationHash }),
  };
});

const mockSessionCheckFn = jest.fn(() => {});

jest.mock('../../hooks/useSessionCheck', () => {
  return {
    useSessionCheck: () => mockSessionCheckFn,
  };
});

jest.mock('../../components/SessionModal/SessionModal', () => {
  const SessionModal = ({ title }: { title: string }) => (
    <>
      <div>Session Modal</div>
      <div>{title}</div>
    </>
  );

  return SessionModal;
});

// jest.mock('../../api/auth/Auth.api', () => {
//   const original = jest.requireActual('../../api/auth/Auth.api');
//   return {
//     ...original,
//     AuthApi: {
//       exchangeToken: (token: string) => {
//         console.log('Called exchangeToken', token);
//         return token.startsWith('good')
//           ? Promise.resolve({ sessionToken: 'good-session-token' })
//           : Promise.reject({ response: { status: 403 } });
//       },
//     },
//   };
// });

describe('SessionGuard Component', () => {
  beforeEach(() => {
    mockLocationHash = '';
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  // cosa si aspetta: entra nell'app, non fa nessun navigate, lancia il sessionCheck
  // it('reload - session token presente', async () => {
  //   const mockReduxState = {
  //     ...defaultPreloadedState,
  //     user: {
  //       ...defaultPreloadedState.user,
  //       user: { ...defaultPreloadedState.user.user, sessionToken: 'mocked-token', exp: 20000 },
  //     },
  //   };

  //   await act(async () => void render(<SessionGuard />, { preloadedState: mockReduxState }));
  //   const pageComponent = screen.queryByText('Generic Page');
  //   expect(pageComponent).toBeTruthy();

  //   expect(mockNavigateFn).toBeCalledTimes(0);
  //   expect(mockSessionCheckFn).toBeCalledTimes(1);
  // });

  // cosa si aspetta: entra nell'app, non fa nessun navigate, non lancia il sessionCheck
  // it('senza spid token - ingresso anonimo', async () => {
  //   await act(async () => void render(<SessionGuard />));
  //   const pageComponent = screen.queryByText('Generic Page');
  //   expect(pageComponent).toBeTruthy();

  //   expect(mockNavigateFn).toBeCalledTimes(0);
  //   expect(mockSessionCheckFn).toBeCalledTimes(0);
  // });

  // cosa si aspetta: non entra nell'app, messaggio associato all'errore di exchangeToken
  it('errore nel selfCare token', async () => {
    mockLocationHash = '#token=token-ko';

    await act(async () => void render(<SessionGuard />));
    await waitFor(
      () => {
        const logoutComponent = screen.queryByText('Session Modal');
        expect(logoutComponent).toBeTruthy();
        const logoutTitleComponent = screen.queryByText(LEAVING_APP_TITLE);
        expect(logoutTitleComponent).toBeTruthy();

        expect(mockNavigateFn).toBeCalledTimes(0);
        expect(mockSessionCheckFn).toBeCalledTimes(0);
      },
      { timeout: 5000 }
    );
  });

  // cosa si aspetta: non entra nell'app, messaggio di logout
  it('logout', async () => {
    const mockReduxState = {
      ...defaultPreloadedState,
      user: {
        ...defaultPreloadedState.user,
        user: { ...defaultPreloadedState.user.user, sessionToken: 'mocked-token' },
        isClosedSession: true,
      },
    };

    await act(async () => void render(<SessionGuard />, { preloadedState: mockReduxState }));
    const logoutComponent = screen.queryByText('Session Modal');
    expect(logoutComponent).toBeTruthy();
    const logoutTitleComponent = screen.queryByText(LEAVING_APP_TITLE);
    expect(logoutTitleComponent).toBeTruthy();

    expect(mockNavigateFn).toBeCalledTimes(0);
    expect(mockSessionCheckFn).toBeCalledTimes(0);
  });
});
