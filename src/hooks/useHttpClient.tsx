import { useContext } from 'react';
import { HttpClientContext } from '../contexts/HttpClientContext';

export const useHttpClient = () => {
  return useContext(HttpClientContext);
};
