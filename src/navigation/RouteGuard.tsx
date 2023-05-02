import { Outlet } from 'react-router-dom';
import AccessDenied from '../pages/AccessDenied.page';
import { useAppSelector } from '../redux/hooks';
import { userSelector } from '../redux/user/slice';

const RouteGuard = () => {
  const { sessionToken } = useAppSelector(userSelector);

  if (!sessionToken) {
    return <AccessDenied isLogged={false} />;
  }

  return <Outlet />;
};

export default RouteGuard;
