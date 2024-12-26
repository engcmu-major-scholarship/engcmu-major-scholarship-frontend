import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { Path } from '../../constants/Path';

const useHomeController = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const navigateToSignin = () => {
    navigate(Path.SIGNIN);
  };
  return {
    token,
    navigateToSignin,
  };
};

export default useHomeController;
