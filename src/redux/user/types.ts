export interface User {
  id: string;
  name: string;
  email: string;
  uid: string;
  role?: string;
  sessionToken?: string;
}
