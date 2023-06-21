import { MessageType } from '../../../redux/app/types';
import { render } from '../../../test-utils';
import Snackbar from '../Snackbar';

describe('Snackbar Component', () => {
  it('should render', () => {
    const message = 'test message';
    let result = render(
      <Snackbar
        duration={null}
        id="test-id"
        message={message}
        type={MessageType.ERROR}
        onClose={() => {}}
      />
    );

    expect(result.getByTestId('snackbar-container')).toBeInTheDocument();
    expect(result.getByTestId('snackbar-alert')).toBeInTheDocument();
    expect(result.getByText(message)).toBeInTheDocument();
  });
});
