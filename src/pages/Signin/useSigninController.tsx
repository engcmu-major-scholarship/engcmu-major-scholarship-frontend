import { Path } from '../../constants/Path';

const useSigninController = () => {
  const handleGoogleSignIn = () => {
    const paramsBuilder = new URLSearchParams();
    paramsBuilder.append('client_id', import.meta.env.VITE_GOOGLE_CLIENT_ID);
    paramsBuilder.append(
      'redirect_uri',
      window.location.origin + Path.CALLBACK,
    );
    paramsBuilder.append('response_type', 'token');
    paramsBuilder.append('scope', 'openid email profile');
    window.location.href =
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      paramsBuilder.toString();
  };

  return {
    handleGoogleSignIn,
  };
};

export default useSigninController;
