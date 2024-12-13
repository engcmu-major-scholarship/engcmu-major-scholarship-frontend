import { useContext, useEffect } from 'react';
import hashParamsParser from '../../utils/hashParamsParser';
import { SignupContext } from '../../contexts/SignupContext';
import { useAxios } from '../../hooks/useAxios';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

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
  const { unprotectedAPI } = useAxios();
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
      unprotectedAPI
        .get<boolean>('/auth/is-signup', {
          params: {
            access_token: hashParams.access_token,
          },
        })
        .then((res) => {
          if (res) {
            setGoogleToken(hashParams.access_token);
            navigate('/signup', { replace: true });
          } else {
            unprotectedAPI
              .get<string>('/auth/login', {
                params: {
                  access_token: hashParams.access_token,
                },
              })
              .then((res) => {
                setToken(res);
                navigate('/test', { replace: true });
              })
              .catch((err) => {
                console.error(err);
                navigate('/login', { replace: true });
              });
          }
        });
    }
  }, [navigate, setGoogleToken, setToken, unprotectedAPI]);

  return {};
};

export default useCallbackController;
