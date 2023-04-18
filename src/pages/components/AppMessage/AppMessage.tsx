import React from 'react';
import { closeMessage, messagesSelector } from '../../../redux/app/slice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Snackbar from '../Snackbar/Snackbar';

const AppMessage = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(messagesSelector);

  const handleClose = (id: string) => {
    dispatch(closeMessage(id));
  };
  return (
    <>
      {messages.map((message) => (
        <Snackbar key={message.id} {...message} onClose={handleClose} />
      ))}
    </>
  );
};

export default AppMessage;
