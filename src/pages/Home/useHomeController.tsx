import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

const useHomeController = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const navigateToSignin = () => {
    navigate('/signin');
  };
  return {
    token,
    navigateToLogin: navigateToSignin,
  };
};

export default useHomeController;
