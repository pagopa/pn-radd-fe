import { act, screen } from '@testing-library/react';
import { defaultPreloadedState, render } from '../../test-utils';
import RouteGuard from '../RouteGuard';
import { DENIED_ACCESS_TITLE } from '../../utils/string.utils';

jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    Outlet: () => <div>Generic Page</div>,
  };
});

const mockLoggedUserState = {
  ...defaultPreloadedState,
  user: {
    ...defaultPreloadedState.user,
    user: { ...defaultPreloadedState.user.user, sessionToken: 'mocked-token' },
  },
};

describe('RouteGuard component', () => {
  it('No user logged', async () => {
    await act(async () => void render(<RouteGuard />, { preloadedState: defaultPreloadedState }));
    const pageComponent = screen.queryByText('Generic Page');
    const accessDeniedComponent = screen.queryByText(DENIED_ACCESS_TITLE);
    expect(pageComponent).toBeNull();
    expect(accessDeniedComponent).toBeTruthy();
  });

  it('Logged user', async () => {
    await act(async () => void render(<RouteGuard />, { preloadedState: mockLoggedUserState }));
    const pageComponent = screen.queryByText('Generic Page');
    const accessDeniedComponent = screen.queryByText(DENIED_ACCESS_TITLE);
    expect(pageComponent).toBeTruthy();
    expect(accessDeniedComponent).toBeNull();
  });
});
