import { ReactNode, useCallback, useEffect, useState } from 'react';
import { ApiClient } from '../utils/Http/ApiClient';
import { HttpClientContext } from '../contexts/HttpClientContext';
import { useAuth } from '../hooks/useAuth';
import { HttpClient } from '../utils/Http/HttpClient';
import { Role } from '../types/Roles';

export type TokenPayload = {
  userId: string;
  googleAccount: string;
  roles: Role[];
};

const HttpClientProvider = ({ children }: { children: ReactNode }) => {
  const { token, setGoogleAccount, setRoles } = useAuth();
  const [httpClient, setHttpClient] = useState<HttpClient>(new ApiClient());

  const setHttpClientToken = useCallback(
    (token: string) => {
      setHttpClient(new ApiClient({ token }));
      const httpClient = new ApiClient({ token });
      httpClient
        .get<TokenPayload>('/auth/resolve-token')
        .then((res) => {
          setGoogleAccount(res.googleAccount);
          setRoles(res.roles);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setGoogleAccount, setRoles],
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
