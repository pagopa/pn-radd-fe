import { render } from '../../../test-utils';
import Layout from '../Layout';

jest.mock('../../Header/Header', () => () => <div>Header</div>);
jest.mock('../../Footer/Footer', () => () => <div>Footer</div>);
jest.mock('../../SideMenu/SideMenu', () => () => <div>SideMenu</div>);

describe('Layout Component', () => {
  it('renders layout', () => {
    // render component
    const result = render(<Layout showSideMenu></Layout>);
    expect(result.container).toHaveTextContent(/Header/i);
    expect(result.container).toHaveTextContent(/SideMenu/i);
    expect(result.container).toHaveTextContent(/Footer/i);
  });
});
