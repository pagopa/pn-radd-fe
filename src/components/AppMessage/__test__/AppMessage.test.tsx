import { MessageType } from '../../../redux/app/types';
import { defaultPreloadedState, fireEvent, render, screen, waitFor } from '../../../test-utils';
import { LEAVING_APP_MESSAGE } from '../../../utils/string.utils';
import AppMessage from '../AppMessage';

const mockedMessage = {
  id: 'test-message-1',
  type: MessageType.SUCCESS,
  message: 'test message',
  duration: null,
};

const mockedUnauthorizedMessage = {
  id: 'test-message-2',
  type: MessageType.ERROR,
  message: 'test message',
  duration: null,
  status: 401,
};

const preloadedStateWithMessage = {
  ...defaultPreloadedState,
  app: { ...defaultPreloadedState.app, messages: [mockedMessage] },
};

const preloadedStateWithUnauthorizedMessage = {
  ...defaultPreloadedState,
  app: { ...defaultPreloadedState.app, messages: [mockedUnauthorizedMessage] },
};

describe('AppMessage', () => {
  it('should render a message', () => {
    const result = render(<AppMessage />, { preloadedState: preloadedStateWithMessage });
    expect(result.getByRole('alert'));
  });

  it('should close a message', async () => {
    const result = render(<AppMessage />, { preloadedState: preloadedStateWithMessage });
    expect(result.getByRole('alert'));
    const closeButton = await result.findByRole('button', { name: 'close message' });
    fireEvent.click(closeButton);
    await waitFor(() => expect(result.queryByRole('alert')).toBeNull());
  });

  it('should render Session Modal', () => {
    const result = render(<AppMessage />, {
      preloadedState: preloadedStateWithUnauthorizedMessage,
    });
    expect(result.getByText(LEAVING_APP_MESSAGE));
  });
});
