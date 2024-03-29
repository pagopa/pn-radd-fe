import { SideMenuItem } from '../types';
import { render, fireEvent, screen, waitFor, within } from '../../../test-utils';
import SideMenuList from '../SideMenuList';
import { sideMenuItems } from './test-utils';

async function testMenuItem(
  container: HTMLElement,
  expectedLength: number,
  menuItems: Array<SideMenuItem>
) {
  expect(container).toBeInTheDocument();
  const buttons = await within(container).findAllByRole('button');
  expect(buttons).toHaveLength(expectedLength);
  buttons.forEach((button, i) => {
    const item = button.querySelector('span');
    expect(item).toHaveTextContent(menuItems[i].label);
  });
}

const handleLinkClick = jest.fn();

describe('SideMenuList', () => {
  beforeEach(() => {
    render(<SideMenuList menuItems={sideMenuItems} />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Render side menu list', async () => {
    const ul = screen.getByRole('navigation');
    await testMenuItem(ul, sideMenuItems.length, sideMenuItems);
  });

  it('Open and close sub menu', async () => {
    const ul = screen.getByRole('navigation');
    const buttons = await within(ul).findAllByRole('button');
    await waitFor(() => {
      fireEvent.click(buttons[1]);
    });
    let collapsedMenu = await within(ul).findByTestId(`collapse-${sideMenuItems[1].label}`);
    await testMenuItem(
      collapsedMenu,
      sideMenuItems[1].children!.length,
      sideMenuItems[1].children!
    );
    await waitFor(() => {
      fireEvent.click(buttons[2]);
    });
    // expect(collapsedMenu).not.toBeInTheDocument();
    collapsedMenu = await within(ul).findByTestId(`collapse-${sideMenuItems[2].label}`);
    await testMenuItem(
      collapsedMenu,
      sideMenuItems[2].children!.length,
      sideMenuItems[2].children!
    );
  });
});
