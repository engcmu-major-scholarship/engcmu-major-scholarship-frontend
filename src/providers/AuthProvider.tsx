import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Role } from '../types/Roles';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem('token'),
  );
  const [google_account, setGoogleAccount] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);

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

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        removeToken,
        google_account,
        setGoogleAccount,
        roles,
        setRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
