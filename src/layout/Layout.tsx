import { ReactNode } from 'react';
import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { getDefaultMenuItems } from '../utils/menu.utils';

import ErrorBoundary from '../error/ErrorBoundary';
import { handleEventTrackingCallbackAppCrash } from '../utils/log.utils';
import { Spinner } from '../pages/components/Spinner/Spinner';
import AppMessage from '../pages/components/AppMessage/AppMessage';
import SideMenu from './SideMenu/SideMenu';
import Header from './Header';
import Footer from './Footer';

type Props = {
  children?: ReactNode;
  showSideMenu?: boolean;
};

const Layout = ({ children, showSideMenu = false }: Props) => {
  const menuItems = getDefaultMenuItems();
  return (
    <ErrorBoundary eventTrackingCallback={handleEventTrackingCallbackAppCrash}>
      <Stack
        direction="column"
        sx={{ minHeight: '100vh' }} // 100vh per sticky footer
      >
        <Header />

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
