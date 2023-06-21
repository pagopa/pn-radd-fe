import {
  render,
  screen,
  checkFormElements,
  checkRadioElements,
  changeRadioValue,
  changeInputValue,
  fireEvent,
  RenderResult,
  waitFor,
} from '../../../test-utils';
import SearchInquiryForm from '../SearchInquiryForm';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SearchInquiryForm', () => {
  let result: RenderResult;

  beforeEach(async () => {
    result = render(<SearchInquiryForm />);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should render clean form', () => {
    const form = result.container.querySelector('form');

    checkRadioElements(form!, 'inquiryType', [
      'Documenti allegati e attestazioni opponibili a terzi',
      'Avvisi di avvenuta ricezione',
    ]);
    checkRadioElements(form!, 'searchType', [
      'Codice IUN',
      'ID operazione',
      'Codice Fiscale destinatario',
    ]);
    checkFormElements(form!, 'iun', 'Codice IUN*');

    const searchButton = screen.getByRole('button', { name: 'Cerca' });
    expect(searchButton).toBeDisabled();
  });

  it('render different inputs when searchType changes', async () => {
    const form = result.container.querySelector('form');

    await changeRadioValue(form!, 'searchType', 1);
    checkFormElements(form!, 'operationId', 'ID operazione*');

    await changeRadioValue(form!, 'searchType', 2);
    checkFormElements(form!, 'taxId', 'Codice Fiscale destinatario*');
    checkFormElements(form!, 'from', 'Dal');
    checkFormElements(form!, 'to', 'Al');

    const searchButton = screen.getByRole('button', { name: 'Cerca' });
    expect(searchButton).toBeDisabled();
  });

  it('enable searchButton when required fields are provided', async () => {
    const form = result.container.querySelector('form');

    await changeRadioValue(form!, 'searchType', 2);
    checkFormElements(form!, 'taxId', 'Codice Fiscale destinatario*');
    checkFormElements(form!, 'from', 'Dal');
    checkFormElements(form!, 'to', 'Al');

    changeInputValue(form!, 'taxId', 'PPPPLT80A01H501V');
    changeInputValue(form!, 'from', '20/01/2022');
    changeInputValue(form!, 'to', '22/01/2022');

    const searchButton = screen.getByRole('button', { name: 'Cerca' });
    expect(searchButton).not.toBeDisabled();
  });

  it('submit form', async () => {
    const form = result.container.querySelector('form');

    await changeInputValue(form!, 'iun', 'test');
    const searchButton = screen.getByRole('button', { name: 'Cerca' });
    expect(searchButton).not.toBeDisabled();
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockNavigate).toBeCalled();
    });
  });
});
