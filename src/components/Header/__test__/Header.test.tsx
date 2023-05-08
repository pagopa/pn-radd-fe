import { fireEvent, waitFor, screen } from '@testing-library/react';

import { render } from '../../../test-utils';
import Header from '../Header';
import { loggedUser } from './test-utils';

const handleClick = jest.fn();
const exitFn = jest.fn();

describe('Header Component', () => {
  const { location } = window;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    delete window.location;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.location = {
      href: '',
      assign: exitFn,
    };
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  afterAll((): void => {
    window.location = location;
  });

  it('renders header (no parties and no user dropdown)', async () => {
    // render component
    const result = render(<Header loggedUser={loggedUser} onExitAction={handleClick} />);
    const headers = result.container.querySelectorAll('.MuiContainer-root');
    expect(headers[0]).toBeInTheDocument();
    expect(headers[0]).toHaveTextContent(/PagoPA S.p.A./i);
    const buttons = headers[0]!.querySelectorAll('button');
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent(/Assistenza/i);
    expect(buttons[2]).toHaveTextContent(/Esci/i);
    fireEvent.click(buttons[2]);
    await waitFor(() => expect(handleClick).toBeCalledTimes(1));
  });

  it('clicks on assistanceEmail when value is passed', async () => {
    // render component
    const result = render(
      <Header
        loggedUser={loggedUser}
        onAssistanceClick={() => (window.location.href = 'mailto:email')}
      />
    );
    expect(window.location.href).toBe('');
    const assistanceLink = result.getByText(/Assistenza/i);
    fireEvent.click(assistanceLink);
    expect(window.location.href).toBe('mailto:email');
  });

  it('clicks on assistance link when assistanceEmail has no value', () => {
    // render component
    const result = render(<Header loggedUser={loggedUser} />);
    const assistanceLink = result.getByText(/Assistenza/i);
    fireEvent.click(assistanceLink);
    expect(window.location.href).toBe('');
  });

  it('clicks on exit with default value', async () => {
    const result = render(<Header loggedUser={loggedUser} />);
    const headers = result.container.querySelectorAll('.MuiContainer-root');
    const buttons = headers[0]!.querySelectorAll('button');
    fireEvent.click(buttons[2]);
    await waitFor(() => expect(exitFn).toBeCalledTimes(1));
    await waitFor(() => expect(exitFn).toBeCalledWith(''));
  });
});
