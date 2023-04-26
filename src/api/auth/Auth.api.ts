import { User } from '../../redux/user/types';
import { authClient } from '../axios';

export const AuthApi = {
  exchangeToken: (spidToken: string): Promise<User> =>
    authClient
      .post<User>(`/token-exchange`, { authorizationToken: spidToken })
      .then((response) => ({
        sessionToken: response.data.sessionToken,
        email: response.data.email,
        name: response.data.name,
        family_name: response.data.family_name,
        uid: response.data.uid,
        fiscal_number: response.data.fiscal_number,
        mobile_phone: response.data.mobile_phone,
        from_aa: response.data.from_aa,
        aud: response.data.aud,
        level: response.data.level,
        iat: response.data.iat,
        exp: response.data.exp,
        iss: response.data.iss,
        jti: response.data.jti,
      })),
};
