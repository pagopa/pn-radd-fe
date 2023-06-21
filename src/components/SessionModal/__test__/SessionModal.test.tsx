import { render } from '../../../test-utils';
import SessionModal from '../SessionModal';

describe('test SessionModal component', () => {
  it('renders the component without confirm button', () => {
    const result = render(<SessionModal open title={'Test title'} message={'test message'} />);

    expect(result.baseElement).toHaveTextContent(/test title/i);
    expect(result.baseElement).toHaveTextContent(/test message/i);
  });

  it('renders the full component with custom label', () => {
    const result = render(
      <SessionModal
        open
        title={'Test title'}
        message={'test message'}
        onConfirm={() => {}}
        onConfirmLabel={'Confirm'}
      />
    );

    expect(result.baseElement).toHaveTextContent(/test title/i);
    expect(result.baseElement).toHaveTextContent(/test message/i);
    expect(result.baseElement).toHaveTextContent(/confirm/i);
  });

  it('renders the full component with default label', () => {
    const result = render(
      <SessionModal open title={'Test title'} message={'test message'} onConfirm={() => {}} />
    );

    expect(result.baseElement).toHaveTextContent(/test title/i);
    expect(result.baseElement).toHaveTextContent(/test message/i);
    expect(result.baseElement).toHaveTextContent(/riprova/i);
  });

  it('renders the full component in mobile view', () => {
    const result = render(
      <SessionModal
        open
        title={'Test title'}
        message={'test message'}
        onConfirm={() => {}}
        onConfirmLabel={'Confirm'}
      />
    );

    expect(result.baseElement).toHaveTextContent(/test title/i);
    expect(result.baseElement).toHaveTextContent(/test message/i);
    expect(result.baseElement).toHaveTextContent(/confirm/i);
  });
});
