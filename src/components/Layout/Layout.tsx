import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { getDefaultMenuItems } from '../../utils/menu.utils';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { handleEventTrackingCallbackAppCrash } from '../../utils/log.utils';
import { Spinner } from '../Spinner/Spinner';
import AppMessage from '../AppMessage/AppMessage';
import SideMenu from '../SideMenu/SideMenu';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useAppSelector } from '../../redux/hooks';
import { userSelector } from '../../redux/user/slice';

type Props = {
  showSideMenu?: boolean;
};

const Layout = ({ showSideMenu = false }: Props) => {
  const user = useAppSelector(userSelector);
  const JWTUser = {
    id: user.fiscal_number,
    name: user.name,
    surname: user.family_name,
    mail: user.email,
  };

  const menuItems = getDefaultMenuItems();

  return (
    <ErrorBoundary eventTrackingCallback={handleEventTrackingCallbackAppCrash}>
      <Stack
        direction="column"
        sx={{ minHeight: '100vh' }} // 100vh per sticky footer
      >
        <Header
          loggedUser={JWTUser}
          onExitAction={() => {
            console.log('User logout');
          }}
          onAssistanceClick={() => {
            console.log('Clicked/Tapped on Assistance');
          }}
        />

        <Stack direction={{ lg: 'row' }} sx={{ flexGrow: 1 }}>
          {showSideMenu && (
            <Box sx={{ width: { lg: 300 }, flexShrink: '0' }} component="nav">
              <SideMenu menuItems={menuItems} />
            </Box>
          )}
          <ErrorBoundary eventTrackingCallback={handleEventTrackingCallbackAppCrash}>
            <Box sx={{ flexGrow: 1 }} p={2} component="main">
              <Outlet />
              <Spinner />
              <AppMessage />
            </Box>
          </ErrorBoundary>
        </Stack>

        <Footer />
      </Stack>
    </ErrorBoundary>
  );
};

export default Layout;
