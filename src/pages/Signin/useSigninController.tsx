import { useLocation } from 'react-router';
import { Path } from '../../constants/Path';

const useSigninController = () => {
  const { state } = useLocation();
  const error = state?.error;
  const handleCMUAccountSignIn = () => {
    const paramsBuilder = new URLSearchParams();
    paramsBuilder.append('client_id', import.meta.env.VITE_CMU_ENTRA_CLIENT_ID);
    paramsBuilder.append('scope', 'api://cmu/.default');
    paramsBuilder.append('response_type', 'code');
    paramsBuilder.append(
      'redirect_uri',
      window.location.origin + Path.CALLBACK,
    );
    paramsBuilder.append('response_mode', 'query');

    window.location.href =
      `https://login.microsoftonline.com/${import.meta.env.VITE_CMU_MS_TENANT_ID}/oauth2/v2.0/authorize?` +
      paramsBuilder.toString();
  };

  return {
    handleCMUAccountSignIn,
    error,
  };
};

export default useSigninController;
