import { render, RenderResult, fireEvent } from '../../../test-utils';
import ImageVisualizer from '../ImageVisualizer';

describe('ImageVisualizer', () => {
  let result: RenderResult;
  let mockOnClose = jest.fn();

  beforeEach(() => {
    result = render(<ImageVisualizer src="test" alt="alt-test" onClose={mockOnClose} />);
  });

  it('should render an image in a modal', () => {
    const img = result.getByRole('img');
    const closeIconBtn = result.getByTestId('close-btn-image-visualizer');
    expect(img).toBeInTheDocument();
    expect(closeIconBtn).toBeInTheDocument();
  });

  it('should allow to click on close icon', () => {
    const closeIconBtn = result.getByTestId('close-btn-image-visualizer');
    fireEvent.click(closeIconBtn);
    expect(mockOnClose).toBeCalled();
  });
});
