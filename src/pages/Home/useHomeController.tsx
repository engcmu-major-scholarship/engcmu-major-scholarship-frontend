import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

const useHomeController = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };
  return {
    token,
    navigateToLogin,
  };
};

export default useHomeController;
