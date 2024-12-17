import { createContext } from 'react';
import { HttpClient } from '../utils/Http/HttpClient';
import { ApiClient } from '../utils/Http/ApiClient';

export type HttpClientContextType = HttpClient;

export const HttpClientContext = createContext<HttpClientContextType>(
  new ApiClient(),
);
