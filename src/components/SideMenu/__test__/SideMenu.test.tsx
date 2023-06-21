import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { render } from '../../../test-utils';
import SideMenu from '../SideMenu';
import { sideMenuItems } from './test-utils';

describe('SideMenu', () => {
  it('Renders side menu (no mobile)', async () => {
    render(<SideMenu menuItems={sideMenuItems} />);
    const ul = screen.getByRole('navigation');
    expect(ul).toBeInTheDocument();
    const buttons = await within(ul).findAllByRole('button');
    expect(buttons).toHaveLength(sideMenuItems.length);
  });

  expect.extend(toHaveNoViolations);

  it('sidemenu accesibility', async () => {
    const { container } = render(<SideMenu menuItems={sideMenuItems} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
