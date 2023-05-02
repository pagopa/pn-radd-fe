import { closeMessage, messagesSelector } from '../../redux/app/slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import SessionModal from '../SessionModal/SessionModal';
import Snackbar from '../Snackbar/Snackbar';
import { LEAVING_APP_TITLE, LEAVING_APP_MESSAGE } from '../../utils/string.utils';

const AppMessage = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(messagesSelector);

  const handleClose = (id: string) => {
    dispatch(closeMessage(id));
  };
  return (
    <>
      {messages.map((message) => {
        if (message.status === 401) {
          return (
            <SessionModal
              open={true}
              key={message.id}
              handleClose={() => goToLoginPortal(window.location.href)}
              initTimeout
              title={LEAVING_APP_TITLE}
              message={LEAVING_APP_MESSAGE}
            />
          );
        }

        return <Snackbar key={message.id} {...message} onClose={handleClose} />;
      })}
    </>
  );
};

function goToLoginPortal(href: string) {
  throw new Error('Function not implemented.' + href);
}

export default AppMessage;
