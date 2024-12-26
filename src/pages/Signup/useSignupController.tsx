import { useContext, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useHttpClient } from '../../hooks/useHttpClient';
import { SignupContext } from '../../contexts/SignupContext';
import { useNavigate } from 'react-router';
import { Api } from '../../constants/Api';
import { Path } from '../../constants/Path';

export type SignupData = {
  citizenId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

const useSignupController = () => {
  const httpClient = useHttpClient();
  const { setToken } = useAuth();
  const { googleToken } = useContext(SignupContext);
  const navigate = useNavigate();

  const onSubmit = (data: SignupData) => {
    httpClient
      .post<string>(Api.SIGNUP, {
        accessToken: googleToken,
        citizenId: data.citizenId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
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
