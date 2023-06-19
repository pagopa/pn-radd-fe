import { RenderResult, fireEvent, render } from '../../test-utils';
import { DENIED_ACCESS_TITLE } from '../../utils/string.utils';
import AccessDenied from '../AccessDenied.page';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AccessDenied Component when user is not logged', () => {
  let result: RenderResult;

  beforeEach(() => {
    result = render(<AccessDenied isLogged={false} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders access denied', () => {
    const heading = result?.queryByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(DENIED_ACCESS_TITLE);

    const button = result.getByRole('button', { name: 'Accedi' });
    expect(button).toBeInTheDocument();
  });
});

describe('AccessDenied Component when user is logged', () => {
  let result: RenderResult;

  beforeEach(() => {
    result = render(<AccessDenied isLogged={true} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders access denied', () => {
    const heading = result?.queryByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(DENIED_ACCESS_TITLE);
    const button = result.getByRole('button', { name: 'Vai alla home page' });
    expect(button).toBeInTheDocument();
  });

  it('handle click on button', () => {
    const button = result.getByRole('button', { name: 'Vai alla home page' });
    fireEvent.click(button);
    expect(mockNavigate).toBeCalled();
  });
});
