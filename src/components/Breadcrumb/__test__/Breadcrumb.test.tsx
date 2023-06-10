import { fireEvent, render } from '../../../test-utils';
import Breadcrumb from '../Breadcrumb';

describe('BreadcrumbLink Component', () => {
  const backActionHandlerMock = jest.fn();

  it('renders breadcrumb link', () => {
    const breadcrumbsLinks = [
      {
        linkLabel: 'mocked-label',
        linkRoute: 'mocked-route',
      },
    ];
    // render component
    const result = render(
      <Breadcrumb
        goBackAction={backActionHandlerMock}
        goBackLabel={'mocked-back-label'}
        links={breadcrumbsLinks}
        currentLocationLabel={'mocked-current-label'}
      />
    );
    expect(result.container).toHaveTextContent(/mocked-label/i);
    expect(result.container).toHaveTextContent(/mocked-current-label/i);
    const button = result.container.querySelector('button');
    expect(button).toHaveTextContent(/mocked-back-label/i);
    fireEvent.click(button!);
    expect(backActionHandlerMock).toBeCalledTimes(1);
  });
});
