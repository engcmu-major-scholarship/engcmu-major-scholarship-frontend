import { useContext, useEffect } from 'react';
import hashParamsParser from './hashParamsParser';
import { SignupContext } from '../../contexts/SignupContext';
import { useHttpClient } from '../../hooks/useHttpClient';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { Api } from '../../constants/Api';
import { Path } from '../../constants/Path';

export interface GoogleCallbackProps {
  access_token: string;
  token_type: string;
  expires_in: string;
  scope: string;
  error: string;
  [key: string]: string;
}

const useCallbackController = () => {
  const { setToken } = useAuth();
  const httpClient = useHttpClient();
  const { setGoogleToken } = useContext(SignupContext);
  const navigate = useNavigate();
  useEffect(() => {
    const hashParams = hashParamsParser<GoogleCallbackProps>(
      window.location.hash,
    );
    if (hashParams.error) {
      console.error(hashParams.error);
    }
    if (hashParams.access_token) {
      httpClient
        .post<string>(Api.SIGNIN, {
          accessToken: hashParams.access_token,
        })
        .then((response) => {
          setToken(response);
          navigate(Path.TEST);
        })
        .catch((error) => {
          if (
            error.response.status === 404 &&
            error.response.data.message === 'User not found'
          ) {
            setGoogleToken(hashParams.access_token);
            navigate(Path.SIGNUP);
          } else {
            console.error(error.response.data.message);
            navigate(Path.SIGNIN);
          }
        });
    }
  }, [navigate, setGoogleToken, setToken, httpClient]);

  return {};
};

export default useCallbackController;
