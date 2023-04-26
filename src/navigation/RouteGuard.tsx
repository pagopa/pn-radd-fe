import { useNavigate, Outlet } from 'react-router-dom';
import AccessDenied from '../pages/AccessDenied.page';
import { useAppSelector } from '../redux/hooks';
import { userSelector } from '../redux/user/slice';
import { HOMEPAGE } from './routes.const';

const RouteGuard = () => {
  const navigate = useNavigate();
  const { sessionToken } = useAppSelector(userSelector);

  if (!sessionToken) {
    return (
      <AccessDenied
        isLogged={false}
        goToHomePage={() => navigate(HOMEPAGE, { replace: true })}
        goToLogin={() => goToLoginPortal(window.location.href)}
      />
    );
  }

  return <Outlet />;
};

export default RouteGuard;

function goToLoginPortal(href: string) {
  throw new Error('Function not implemented. ' + href);
}
