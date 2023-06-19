import { render } from '../../test-utils';
import NotFound from '../NotFound.page';

describe('NotFound Component', () => {
  it('renders not found', () => {
    // render component
    const result = render(<NotFound />);
    const heading = result?.container.querySelector('h4');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Qualcosa è andato storto/i);
    expect(result.getByText('Non siamo riusciti a trovare la pagina.')).toBeInTheDocument();
  });
});
