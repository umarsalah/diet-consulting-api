import { ROLES } from './enums';

export type User = {
  id: number;
  email: string;
  userName: string;
  role: ROLES;
  token: string;
};
