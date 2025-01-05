import { useLocation } from 'react-router';
import { handleCMUAccountSignIn } from '../../utils/handleCMUAccountSignIn';

const useSigninController = () => {
  handleCMUAccountSignIn();
  const { state } = useLocation();
  const error = state?.error;
  return {
    error,
  };
};

export default useSigninController;
