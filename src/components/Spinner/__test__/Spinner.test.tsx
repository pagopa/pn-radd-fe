import { defaultPreloadedState, render } from '../../../test-utils';
import { Spinner } from '../Spinner';
import { AppStatus } from '../../../redux/app/types';

const preloadedStateWithSpinner = (open: boolean) => ({
  ...defaultPreloadedState,
  app: { ...defaultPreloadedState.app, status: open ? AppStatus.LOADING : AppStatus.IDLE },
});

describe('Spinner Component', () => {
  let useSelectorSpy: jest.SpyInstance;

  it('renders spinner (false)', () => {
    // render component
    const result = render(<Spinner />, { preloadedState: preloadedStateWithSpinner(false) });
    const spinner = result.queryByRole('loadingSpinner');
    expect(spinner).not.toBeInTheDocument();
  });

  it('renders loading overlay (true)', () => {
    // render component
    const result = render(<Spinner />, { preloadedState: preloadedStateWithSpinner(true) });
    const spinner = result?.queryByRole('loadingSpinner');
    expect(spinner).toBeInTheDocument();
  });
});
