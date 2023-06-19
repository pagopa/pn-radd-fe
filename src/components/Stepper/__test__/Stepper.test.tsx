import { render } from '../../../test-utils';
import Stepper from '../Stepper';

describe('Stepper Component', () => {
  it('should render', () => {
    const testSteps = ['First step', 'Second step', 'Third step'];
    const result = render(<Stepper steps={testSteps} activeStep={0} />);
    expect(result.queryAllByTestId('step-container')).toHaveLength(testSteps.length);
  });
});
