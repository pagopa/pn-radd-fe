import { ErrorInfo } from 'react';

export const handleEventTrackingCallbackAppCrash = (e: Error, eInfo: ErrorInfo) => {
  console.error('CRASH: ', e, eInfo);
};
