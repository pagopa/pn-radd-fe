import { render, RenderResult, fireEvent, waitFor } from '../../../test-utils';
import ImageOverview from '../ImageOverview';

describe('ImageVisualizer', () => {
  let result: RenderResult;

  beforeEach(() => {
    result = render(<ImageOverview src="test" alt="alt-test" />);
  });

  it('should render an image in a modal', () => {
    const img = result.getByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('should allow to click on img to open it in full screen mode', async () => {
    const img = result.getByRole('img');
    fireEvent.click(img);
    await waitFor(() => {
      const closeIconBtn = result.getByTestId('close-btn-image-visualizer');
      expect(closeIconBtn).toBeInTheDocument();
    });
  });
});
