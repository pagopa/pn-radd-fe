import * as yup from 'yup';
import { User } from '../redux/user/types';
import { LEAVING_APP_MESSAGE, LEAVING_APP_TITLE, dataRegex } from './string.utils';

const userSchemaValidator = yup.object({
  family_name: yup.string().matches(dataRegex.name),
  fiscal_number: yup.string().matches(dataRegex.fiscalCode),
  name: yup.string().matches(dataRegex.name),
  uid: yup.string().uuid(),
  sessionToken: yup.string().matches(dataRegex.token),
  email: yup.string().email(),
});

const NOT_LOGGED_USER: User = {
  sessionToken: '',
  name: '',
  family_name: '',
  fiscal_number: '',
  email: '',
  uid: '',
  mobile_phone: '',
  from_aa: false,
  aud: '',
  level: '',
  iat: 0,
  exp: 0,
  iss: '',
  jti: '',
};

export const currentUser = (): User => {
  const dataFromSessionStorage = sessionStorage.getItem('user');

  if (!dataFromSessionStorage) {
    return NOT_LOGGED_USER;
  }

  if (dataFromSessionStorage) {
    try {
      const userDataFromSessionStorage = JSON.parse(dataFromSessionStorage);
      userSchemaValidator.validateSync(userDataFromSessionStorage);
      return userDataFromSessionStorage as User;
    } catch (error) {
      sessionStorage.clear();
    }
  }

  return NOT_LOGGED_USER;
};

export function adaptedTokenExchangeError(originalError: any) {
  // status 403 - l'utente non ha i grants che servono per entrare nell'app
  // ------------------------
  return originalError.response?.status === 403
    ? {
        ...originalError,
        isUnauthorizedUser: true,
        response: {
          ...originalError.response,
          customMessage: {
            title: LEAVING_APP_TITLE,
            message: LEAVING_APP_MESSAGE,
          },
        },
      }
    : // se il token non è valido, sia pa che pf forniscono una response
      // con status 400 e data.error 'Token is not valid'
      // ho pensato ad approfittarne per rendere un messaggio specifico
      // ma nella review è stato chiesto di gestire in modo particolare
      // solo lo status 403.
      // ---------------------------------------------
      // Carlos Lombardi, 2022.08.31
      // ------------------------
      {
        ...originalError,
        isUnauthorizedUser: true,
        response: {
          ...originalError.response,
          customMessage: {
            title: "Non è stato possibile completare l'accesso ...",
            message: LEAVING_APP_MESSAGE,
          },
        },
      };
}
