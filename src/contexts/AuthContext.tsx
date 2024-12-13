import { createContext, Dispatch, SetStateAction } from 'react';

export type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
  google_account: string | null;
  setGoogleAccount: Dispatch<SetStateAction<string | null>>;
  isAdvisor: boolean;
  setIsAdvisor: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  removeToken: () => {},
  google_account: null,
  setGoogleAccount: () => {},
  isAdvisor: false,
  setIsAdvisor: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
});
