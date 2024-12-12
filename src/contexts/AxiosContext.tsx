import { createContext } from 'react';
import { AxiosProtectedAPI } from '../utils/Axios/AxiosProtectedAPI';
import { AxiosUnprotectedAPI } from '../utils/Axios/AxiosUnprotectedAPI';

export type AxiosContextType = {
  protectedAPI: AxiosProtectedAPI;
  setProtectedAPI: (token: string) => void;
  unprotectedAPI: AxiosUnprotectedAPI;
};

export const AxiosContext = createContext<AxiosContextType>({
  protectedAPI: new AxiosProtectedAPI(),
  setProtectedAPI: () => {},
  unprotectedAPI: new AxiosUnprotectedAPI(),
});
