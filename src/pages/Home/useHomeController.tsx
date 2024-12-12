import { useNavigate } from 'react-router';

const useHomeController = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };
  return {
    navigateToLogin,
  };
};

export default useHomeController;
