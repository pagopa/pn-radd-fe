import { render } from '../../../test-utils';
import LoadingPage from '../LoadingPage';

describe('LoadingPage Component', () => {
  it('renders loading page without SideMenu', () => {
    // render component
    const result = render(<LoadingPage></LoadingPage>);
    expect(result.getByTestId('header'));
    expect(result.getByTestId('body'));
    expect(result.getByTestId('footer'));
  });

  it('renders loading page with SideMenu', () => {
    // render component
    const result = render(<LoadingPage renderType="whole"></LoadingPage>);
    expect(result.getByTestId('header'));
    expect(result.getByTestId('menu'));
    expect(result.getByTestId('body'));
    expect(result.getByTestId('footer'));
  });
});
