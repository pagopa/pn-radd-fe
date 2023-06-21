import { RenderResult, fireEvent } from '@testing-library/react';
import Home from '../Home.page';
import { render } from '../../test-utils';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Home page', () => {
  let result: RenderResult;

  beforeEach(() => {
    result = render(<Home />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const actRequestCard = result.getByTestId('act-request-card');
    const aorRequestCard = result.getByTestId('aor-request-card');
    const previousRequestsCard = result.getByTestId('previous-requests-card');

    expect(actRequestCard).toBeInTheDocument();
    expect(aorRequestCard).toBeInTheDocument();
    expect(previousRequestsCard).toBeInTheDocument();
  });

  it('handle click on actRequest link', () => {
    const actRequestButton = result.getByTestId('act-request-button');
    fireEvent.click(actRequestButton);
    expect(mockNavigate).toBeCalled();
  });

  it('handle click on aorRequest link', () => {
    const aorRequestButton = result.getByTestId('aor-request-button');
    fireEvent.click(aorRequestButton);
    expect(mockNavigate).toBeCalled();
  });

  it('handle click on previousRequests link', () => {
    const actRequestButton = result.getByTestId('previous-requests-button');
    fireEvent.click(actRequestButton);
    expect(mockNavigate).toBeCalled();
  });
});
