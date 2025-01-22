import { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { Api } from '../../constants/Api';
import { Path } from '../../constants/Path';
import { handleCMUAccountSignIn } from '../../utils/handleCMUAccountSignIn';
// import { handleCMUAccountSignIn } from '../../utils/handleCMUAccountSignIn';

const useCallbackController = () => {
  const [searchParams] = useSearchParams();
  const { setToken } = useAuth();
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      console.error(error);
      handleCMUAccountSignIn();
    }
    const authorizationCode = searchParams.get('code');
    if (authorizationCode && isFirstRender) {
      setIsFirstRender(false);
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
  }, [httpClient, isFirstRender, navigate, searchParams, setToken]);

  return;
};

export default useCallbackController;
