import { ReactNode, useCallback, useEffect, useState } from 'react';
import { ApiClient } from '../utils/Http/ApiClient';
import { HttpClientContext } from '../contexts/HttpClientContext';
import { useAuth } from '../hooks/useAuth';
import { HttpClient } from '../utils/Http/HttpClient';
import { Role } from '../types/Roles';
import { Api } from '../constants/Api';

export interface TokenPayload {
  userId: string;
  CMUAccount: string;
  roles: Role[];
  iat?: number;
  exp?: number;
  iss?: string;
}

const HttpClientProvider = ({ children }: { children: ReactNode }) => {
  const { token, setCMUAccount, setRoles } = useAuth();
  const [httpClient, setHttpClient] = useState<HttpClient>(new ApiClient());

  const setHttpClientToken = useCallback(
    (token: string) => {
      const httpClient = new ApiClient({ token });
      setHttpClient(httpClient);
      httpClient
        .get<TokenPayload>(Api.RESOLVE_TOKEN)
        .then((res) => {
          setCMUAccount(res.CMUAccount);
          setRoles(res.roles);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setCMUAccount, setRoles],
  );

  useEffect(() => {
    if (token !== null && token !== '') {
      setHttpClientToken(token);
    }
  }, [setHttpClientToken, token]);

  return (
    <HttpClientContext.Provider value={httpClient}>
      {children}
    </HttpClientContext.Provider>
  );
};

export default HttpClientProvider;
