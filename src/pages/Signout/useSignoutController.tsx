import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

const useSignoutController = () => {
  const { removeToken, setCMUAccount } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    removeToken();
    setCMUAccount(null);
    navigate('/', { replace: true });
  }, [navigate, removeToken, setCMUAccount]);

  return;
};

export default useSignoutController;
