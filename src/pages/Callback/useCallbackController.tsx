import { useEffect } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { Api } from '../../constants/Api';
import { Path } from '../../constants/Path';
import { handleCMUAccountSignIn } from '../../utils/handleCMUAccountSignIn';

const useCallbackController = () => {
  const [searchParams] = useSearchParams();
  const { setToken } = useAuth();
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  useEffect(() => {
    const error = searchParams.get('error');
    const authorizationCode = searchParams.get('code');
    if (error) {
      handleCMUAccountSignIn();
    }
    if (authorizationCode) {
      httpClient
        .post<string>(Api.SIGNIN, {
          authorizationCode,
          redirectUri: window.location.origin + Path.CALLBACK,
        })
        .then((response) => {
          setToken(response);
          navigate(Path.HOME, { replace: true });
        })
        .catch((error) => {
          console.error(error.response.data.message);
          handleCMUAccountSignIn();
        });
    }
  }, [navigate, setToken, httpClient, searchParams]);

  return;
};

export default useCallbackController;
