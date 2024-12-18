import { useContext, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useHttpClient } from '../../hooks/useHttpClient';
import { SignupContext } from '../../contexts/SignupContext';
import { useNavigate } from 'react-router';
import { Api } from '../../constants/Api';
import { Path } from '../../constants/Path';

export type SignupData = {
  citizenId: string;
};

const useSignupController = () => {
  const httpClient = useHttpClient();
  const { setToken } = useAuth();
  const { googleToken } = useContext(SignupContext);
  const navigate = useNavigate();

  const onSubmit = (data: SignupData) => {
    httpClient
      .post<string>(Api.SIGNUP, {
        citizenId: data.citizenId,
        accessToken: googleToken,
      })
      .then((res) => {
        setToken(res);
        navigate(Path.TEST);
      });
  };

  useEffect(() => {
    if (!googleToken) {
      navigate(Path.SIGNIN);
    }
  }, [googleToken, navigate]);

  return {
    onSubmit,
  };
};

export default useSignupController;
