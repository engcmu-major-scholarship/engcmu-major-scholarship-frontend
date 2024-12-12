import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem('token'),
  );

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
    <AuthContext.Provider value={{ token, setToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
