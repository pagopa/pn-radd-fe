import { Box } from '@mui/material';
import { SideMenuItem } from './types';
import SideMenuList from './SideMenuList';

type Props = {
  menuItems: Array<SideMenuItem>;
};

const SideMenu = ({ menuItems }: Props) => (
  <Box height={'100%'} display="flex" flexDirection="column" bgcolor={'common.white'}>
    <Box alignItems="left" display="flex" flexDirection="column">
      <SideMenuList menuItems={menuItems} />
    </Box>
  </Box>
);

export default SideMenu;
