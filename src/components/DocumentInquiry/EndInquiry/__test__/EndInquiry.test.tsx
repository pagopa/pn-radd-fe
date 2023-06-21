import { RenderResult, fireEvent, render } from '../../../../test-utils';
import EndInquiry from '../EndInquiry';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('EndInquiry', () => {
  let result: RenderResult;
  beforeEach(() => {
    result = render(<EndInquiry />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const title = result.getByText('Grazie!');
    const previousRequestsLink = result.getByRole('link', { name: 'qui.' });

    expect(title).toBeInTheDocument();
    expect(previousRequestsLink).toBeInTheDocument();

    const closeButton = result.getByRole('button', { name: 'Chiudi' });
    expect(closeButton).toBeInTheDocument();
  });

  it('should handle click on close button', () => {
    const closeButton = result.getByRole('button', { name: 'Chiudi' });
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    expect(mockNavigate).toBeCalled();
  });
});
