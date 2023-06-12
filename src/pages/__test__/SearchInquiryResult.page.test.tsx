import { RenderResult, defaultPreloadedState, render, screen, waitFor } from '../../test-utils';
import SearchInquiryResult from '../SearchInquiryResult.page';
import data from '../../mocks/data';

const preloadedStateWithResult = {
  ...defaultPreloadedState,
  inquiryHistory: {
    searchData: { ...defaultPreloadedState.inquiryHistory.searchData },
    resultSearch: data.NOTIFICATION_INQUIRY.INQUIRY_BY_IUN_OK,
  },
};

const preloadedStateWithoutResult = {
  ...defaultPreloadedState,
};

describe('SearchInquiryResultPage', () => {
  let result: RenderResult;

  it('should render table with results', () => {
    result = render(<SearchInquiryResult />, { preloadedState: preloadedStateWithResult });
    const newRequestBtn = screen.getByRole('button', { name: 'Nuova ricerca' });
    expect(newRequestBtn).toBeInTheDocument();
    const operationsTable = screen.getByRole('table');
    expect(operationsTable).toBeInTheDocument();
  });

  it('should render table without results', async () => {
    result = render(<SearchInquiryResult />, { preloadedState: preloadedStateWithoutResult });
    await waitFor(() =>
      expect(screen.getByText(/Non ci sono elementi da visualizzare/i)).toBeInTheDocument()
    );
  });
});
