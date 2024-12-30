import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { Path } from '../../constants/Path';

const useHomeController = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const navigateToSignin = () => {
    navigate(Path.SIGNIN);
  };

  const navigateToSignOut = () => {
    navigate(Path.SIGNOUT);
  };
  return {
    token,
    navigateToSignin,
    navigateToSignOut,
  };
};

export default useHomeController;
