import { useEffect } from 'react';

import { useSessionCheck } from '../useSessionCheck';
import { render } from '../../test-utils';

const mockFn = jest.fn();

const Component = ({ delay }: { delay: number }) => {
  const sessionCheck = useSessionCheck(1, mockFn);

  useEffect(() => {
    const nowEpoch = new Date();
    nowEpoch.setSeconds(nowEpoch.getSeconds() + delay);
    sessionCheck(nowEpoch.setMilliseconds(0) / 1000);
  }, []);

  return <div>Session check test</div>;
};

describe('test useSessionCheck hook', () => {
  it('hook should call callback', async () => {
    const result = render(<Component delay={-10} />);
    await new Promise((r) => setTimeout(r, 10));
    expect(mockFn).toBeCalledTimes(1);
  });

  it('hook should call callback - now', async () => {
    const result = render(<Component delay={0} />);
    await new Promise((r) => setTimeout(r, 10));
    expect(mockFn).toBeCalledTimes(1);
  });

  it("hook shouldn't call callback", async () => {
    const result = render(<Component delay={10} />);
    await new Promise((r) => setTimeout(r, 10));
    expect(mockFn).toBeCalledTimes(0);
  });
});
