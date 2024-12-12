import { useContext } from 'react';
import { AxiosContext } from '../contexts/AxiosContext';

export const useAxios = () => {
  return useContext(AxiosContext);
};
