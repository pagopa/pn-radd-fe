import { DocumentInquiryType } from '../../redux/document-inquiry/types';
import { fireEvent, render, RenderResult, waitFor } from '../../test-utils';
import DocumentInquiryAor from '../DocumentInquiryAor.page';

const steps = ['Dati del destinatario', 'Caricamento documenti', 'Avvisi di avvenuta ricezione'];

jest.mock('../../components/DocumentInquiry/DocumentInquiryForm/DocumentInquiryForm', () => {
  const DocumentInquiryForm = ({
    title,
    onConfirm,
    inquiryType,
  }: {
    title: string;
    onConfirm: () => {};
    inquiryType: DocumentInquiryType;
  }) => {
    return (
      <>
        <h6>{title}</h6>
        <p>Mocked DocumentInquiryForm Component</p>
        <button onClick={onConfirm}>Confirm</button>
      </>
    );
  };
  return DocumentInquiryForm;
});

jest.mock('../../components/DocumentInquiry/DocumentInquiryFiles/DocumentInquiryFiles', () => {
  const DocumentInquiryFiles = ({
    title,
    onConfirm,
    inquiryType,
  }: {
    title: string;
    onConfirm: () => {};
    inquiryType: DocumentInquiryType;
  }) => {
    return (
      <>
        <h6>{title}</h6>
        <p>Mocked DocumentInquiryFiles Component</p>
        <button onClick={onConfirm}>Confirm</button>
      </>
    );
  };
  return DocumentInquiryFiles;
});

jest.mock('../../components/DocumentInquiry/DocumentInquiryPrint/DocumentInquiryPrint', () => {
  const DocumentInquiryPrint = ({
    title,
    onConfirm,
    inquiryType,
  }: {
    title: string;
    onConfirm: () => {};
    inquiryType: DocumentInquiryType;
  }) => {
    return (
      <>
        <h6>{title}</h6>
        <p>Mocked DocumentInquiryPrint Component</p>
        <button onClick={onConfirm}>Confirm</button>
      </>
    );
  };
  return DocumentInquiryPrint;
});

jest.mock('../../components/DocumentInquiry/EndInquiry/EndInquiry', () => {
  const EndInquiry = () => {
    return (
      <>
        <h6>EndInquiry</h6>
        <p>Mocked EndInquiry Component</p>
      </>
    );
  };
  return EndInquiry;
});

function checkChildComponentTitle(ui: RenderResult, expectedTitle: string) {
  const childComponentTitle = ui?.container.querySelector('h6');
  expect(childComponentTitle).toBeInTheDocument();
  expect(childComponentTitle).toHaveTextContent(expectedTitle);
}

describe('DocumentInquiryAor page', () => {
  let result: RenderResult;

  beforeEach(() => {
    result = render(<DocumentInquiryAor />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render first step', () => {
    const pageTitle = result?.container.querySelector('h4');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Avvisi di avvenuta ricezione');

    checkChildComponentTitle(result, steps[0]);

    const goToNextStepButton = result.getByRole('button', { name: 'Confirm' });
    expect(goToNextStepButton);
  });

  it('should render second step', async () => {
    const goToNextStepButton = result.getByRole('button', { name: 'Confirm' });
    fireEvent.click(goToNextStepButton);

    await waitFor(() => {
      checkChildComponentTitle(result, steps[1]);
    });
  });

  it('should render third step', async () => {
    //Render Second child Component
    const goToNextStepButton = result.getByRole('button', { name: 'Confirm' });
    fireEvent.click(goToNextStepButton);

    await waitFor(() => {
      checkChildComponentTitle(result, steps[1]);
    });

    //Render Third child Component
    const goToNextStepButton2 = result.getByRole('button', { name: 'Confirm' });
    fireEvent.click(goToNextStepButton2);

    await waitFor(() => {
      checkChildComponentTitle(result, steps[2]);
    });
  });

  it('should render endinquiry', async () => {
    //Render Second child Component
    const goToNextStepButton = result.getByRole('button', { name: 'Confirm' });
    fireEvent.click(goToNextStepButton);

    await waitFor(() => {
      checkChildComponentTitle(result, steps[1]);
    });

    //Render Third child Component
    const goToNextStepButton2 = result.getByRole('button', { name: 'Confirm' });
    fireEvent.click(goToNextStepButton2);

    await waitFor(() => {
      checkChildComponentTitle(result, steps[2]);
    });

    //Render EndInquiry Component
    const goToNextStepButton3 = result.getByRole('button', { name: 'Confirm' });
    fireEvent.click(goToNextStepButton3);

    await waitFor(() => {
      checkChildComponentTitle(result, 'EndInquiry');
    });
  });
});
