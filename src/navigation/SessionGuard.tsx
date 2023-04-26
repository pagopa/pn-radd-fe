import { Fragment, useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { exchangeToken, logout } from '../redux/user/action';
import { useSessionCheck } from '../hooks/useSessionCheck';
import { isAppInitializedSelector, finishAppInitialization } from '../redux/app/slice';
import { useProcess } from '../hooks/useProcess';
import SessionModal from '..//components/SessionModal/SessionModal';
import { userStateSelector } from '../redux/user/slice';
import { LEAVING_APP_TITLE, LEAVING_APP_MESSAGE } from '../utils/string.utils';

enum INITIALIZATION_STEPS {
  USER_DETERMINATION = 'UserDetermination',
  SESSION_CHECK = 'SessionCheck',
}

const INITIALIZATION_SEQUENCE = [
  INITIALIZATION_STEPS.USER_DETERMINATION,
  INITIALIZATION_STEPS.SESSION_CHECK,
];

export const SessionGuard = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { sessionToken, exp: expDate } = useAppSelector((state) => state.user.user);
  const isAppInitialized = useAppSelector(isAppInitializedSelector);
  const sessionCheck = useSessionCheck(200, () => dispatch(logout()));

  const { isFinished, performStep } = useProcess(INITIALIZATION_SEQUENCE);

  const getTokenParam = useCallback(() => {
    const params = new URLSearchParams(location.hash);
    return params.get('#token');
  }, [location]);

  useEffect(() => {
    const doUserDetermination = async () => {
      const token = getTokenParam();
      if (token) {
        await dispatch(exchangeToken(token));
      }
    };

    void performStep(INITIALIZATION_STEPS.USER_DETERMINATION, doUserDetermination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [performStep]);

  useEffect(() => {
    const doSessionCheck = () => {
      if (sessionToken && expDate) {
        sessionCheck(expDate);
      }
    };

    void performStep(INITIALIZATION_STEPS.SESSION_CHECK, doSessionCheck);
  }, [performStep]);

  useEffect(() => {
    if (!isAppInitialized && isFinished()) {
      dispatch(finishAppInitialization());
    }
  }, [isAppInitialized, isFinished]);

  return <SessionGuardRender />;
};

const SessionGuardRender = () => {
  const isInitialized = useAppSelector(isAppInitializedSelector);
  const { isUnauthorizedUser, messageUnauthorizedUser, isClosedSession } =
    useAppSelector(userStateSelector);

  const goodbyeMessage = {
    title: isUnauthorizedUser ? messageUnauthorizedUser.title : LEAVING_APP_TITLE,
    message: isUnauthorizedUser ? messageUnauthorizedUser.message : LEAVING_APP_MESSAGE,
  };

  const renderIfInitialized = () =>
    isUnauthorizedUser || isClosedSession ? (
      <SessionModal
        open
        title={goodbyeMessage.title}
        message={goodbyeMessage.message}
        handleClose={() => goToLoginPortal(window.location.href)}
        initTimeout
      />
    ) : (
      <Outlet />
    );

  return isInitialized ? renderIfInitialized() : <Fragment />;
};

function goToLoginPortal(href: string): void {
  console.error('Function not implemented.', href);
}
