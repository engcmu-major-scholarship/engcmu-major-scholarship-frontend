import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

const useSignoutController = () => {
  const { removeToken } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    removeToken();
    navigate('/', { replace: true });
  }, [navigate, removeToken]);

  return {};
};

export default useSignoutController;
