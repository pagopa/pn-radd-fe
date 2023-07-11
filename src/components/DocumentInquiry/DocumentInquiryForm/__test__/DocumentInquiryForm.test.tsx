import { DocumentInquiryType } from '../../../../redux/document-inquiry/types';
import {
  render,
  screen,
  checkFormElements,
  checkRadioElements,
  changeRadioValue,
  changeInputValue,
  fireEvent,
  RenderResult,
  act,
  waitFor,
} from '../../../../test-utils';
import DocumentInquiryForm from '../DocumentInquiryForm';

describe('DocumentInquiryForm ACT', () => {
  let result: RenderResult;
  let mockOnConfirm = jest.fn();

  beforeEach(async () => {
    await act(async () => {
      result = render(
        <DocumentInquiryForm
          title="test"
          inquiryType={DocumentInquiryType.ACT}
          onConfirm={mockOnConfirm}
        />
      );
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should render clean form', () => {
    const form = result.container.querySelector('form');
    checkFormElements(form!, 'iun', 'Codice IUN*');

    checkRadioElements(form!, 'recipientType', ['Persona fisica', 'Persona giuridica']);
    checkFormElements(form!, 'recipientTaxId', 'Codice Fiscale destinatario*');
    checkFormElements(form!, 'delegateTaxId', 'Codice Fiscale o Partita IVA delegato');

    const confirmButton = screen.getByRole('button', { name: 'Continua' });
    expect(confirmButton).toBeDisabled();
  });

  it('submit form', async () => {
    const form = result.container.querySelector('form');

    await changeInputValue(form!, 'iun', 'test');
    await changeInputValue(form!, 'recipientTaxId', 'CLMCST42R12D969Z');
    const confirmButton = screen.getByRole('button', { name: 'Continua' });
    expect(confirmButton).not.toBeDisabled();
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(mockOnConfirm).toBeCalled();
    });
    await waitFor(() => {
      expect(confirmButton).not.toBeDisabled();
    });
  });
});

describe('DocumentInquiryForm AOR', () => {
  let result: RenderResult;
  let mockOnConfirm = jest.fn();

  beforeEach(async () => {
    await act(async () => {
      result = render(
        <DocumentInquiryForm
          title="test"
          inquiryType={DocumentInquiryType.AOR}
          onConfirm={mockOnConfirm}
        />
      );
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should render clean form', () => {
    const form = result.container.querySelector('form');

    checkRadioElements(form!, 'recipientType', ['Persona fisica', 'Persona giuridica']);
    checkFormElements(form!, 'recipientTaxId', 'Codice Fiscale destinatario*');
    checkFormElements(form!, 'delegateTaxId', 'Codice Fiscale o Partita IVA delegato');

    const confirmButton = screen.getByRole('button', { name: 'Continua' });
    expect(confirmButton).toBeDisabled();
  });

  it('submit form OK', async () => {
    const form = result.container.querySelector('form');

    await changeInputValue(form!, 'recipientTaxId', 'CLMCST42R12D969Z');
    const confirmButton = screen.getByRole('button', { name: 'Continua' });
    expect(confirmButton).not.toBeDisabled();
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockOnConfirm).toBeCalled();
    });
    await waitFor(() => {
      expect(confirmButton).not.toBeDisabled();
    });
  });
});
