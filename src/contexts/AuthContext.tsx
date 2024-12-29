import { createContext, Dispatch, SetStateAction } from 'react';
import { Role } from '../types/Roles';

export type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
  CMUAccount: string | null;
  setCMUAccount: Dispatch<SetStateAction<string | null>>;
  roles: Role[];
  setRoles: Dispatch<SetStateAction<Role[]>>;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  removeToken: () => {},
  CMUAccount: null,
  setCMUAccount: () => {},
  roles: [],
  setRoles: () => {},
});
