import { createContext } from 'react';

export type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  removeToken: () => {},
});
