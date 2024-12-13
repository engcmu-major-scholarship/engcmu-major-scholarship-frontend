import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useAxios } from '../hooks/useAxios';

export type TokenPayload = {
  userId: string;
  googleAccount: string;
  isAdvisor: boolean;
  isAdmin: boolean;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem('token'),
  );
  const [google_account, setGoogleAccount] = useState<string | null>(null);
  const [isAdvisor, setIsAdvisor] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { protectedAPI } = useAxios();

  const setToken = (token: string) => {
    localStorage.setItem('token', token);
    setTokenState(token);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setTokenState(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setTokenState(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      protectedAPI
        .get<TokenPayload>('/auth/resolve-token', {
          params: {
            token,
          },
        })
        .then((res) => {
          setGoogleAccount(res.googleAccount);
          setIsAdvisor(res.isAdvisor);
          setIsAdmin(res.isAdmin);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [protectedAPI, token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        removeToken,
        google_account,
        setGoogleAccount,
        isAdvisor,
        setIsAdvisor,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
