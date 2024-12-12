import { ReactNode, useEffect, useState } from 'react';
import { AxiosProtectedAPI } from '../utils/Axios/AxiosProtectedAPI';
import { AxiosUnprotectedAPI } from '../utils/Axios/AxiosUnprotectedAPI';
import { AxiosContext } from '../contexts/AxiosContext';
import { useAuth } from '../hooks/useAuth';

const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const [protectedAPI, setProtectedAPIState] = useState<AxiosProtectedAPI>(
    new AxiosProtectedAPI(),
  );
  const [unprotectedAPI] = useState<AxiosUnprotectedAPI>(
    new AxiosUnprotectedAPI(),
  );

  const setProtectedAPI = (token: string) => {
    setProtectedAPIState(new AxiosProtectedAPI(token));
  };

  useEffect(() => {
    if (token) {
      setProtectedAPI(token);
    }
  }, [token]);

  return (
    <AxiosContext.Provider
      value={{ protectedAPI, setProtectedAPI, unprotectedAPI }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosProvider;
