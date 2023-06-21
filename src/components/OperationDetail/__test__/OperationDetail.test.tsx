import data from '../../../mocks/data';
import { render } from '../../../test-utils';
import { formatString } from '../../../utils/date.utils';
import OperationDetail from '../OperationDetail';

describe('OperationDetail Component', () => {
  it('should render', () => {
    const operation = data.NOTIFICATION_INQUIRY.INQUIRY_BY_IUN_OK.operations
      ? data.NOTIFICATION_INQUIRY.INQUIRY_BY_IUN_OK.operations[0]
      : {};
    const result = render(<OperationDetail operation={operation} />);
    const { operationId, recipientTaxId, operationStartDate } = operation;
    expect(result.getByText(operationId!));
    expect(result.getByText(recipientTaxId!));
    expect(result.getByText(formatString(operationStartDate!)));
  });
});
