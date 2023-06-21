import { render, RenderResult } from '../../test-utils';
import SearchInquiry from '../SearchInquiry.page';

jest.mock('../../components/SearchInquiryForm/SearchInquiryForm', () => {
  const SearchInquiryForm = () => {
    return (
      <>
        <h6>SearchInquiryForm</h6>
        <p>Mocked SearchInquiryForm Component</p>
      </>
    );
  };
  return SearchInquiryForm;
});

describe('SearchInquiry page', () => {
  let result: RenderResult;

  beforeEach(() => {
    result = render(<SearchInquiry />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const pageTitle = result.container.querySelector('h4');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Richieste precedenti');
    const childComponentTitle = result.container.querySelector('h6');
    expect(childComponentTitle).toBeInTheDocument();
    expect(childComponentTitle).toHaveTextContent('SearchInquiryForm');
  });
});
