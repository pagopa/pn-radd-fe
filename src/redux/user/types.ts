export interface User {
  sessionToken: string;
  name: string;
  family_name: string;
  fiscal_number: string;
  email?: string;
  uid: string;
  mobile_phone?: string;
  from_aa: boolean;
  aud: string;
  level: string;
  iat: number;
  exp: number;
  iss: string;
  jti: string;
}
