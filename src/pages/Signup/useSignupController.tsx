import { useContext, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAxios } from '../../hooks/useAxios';
import { SignupContext } from '../../contexts/SignupContext';
import { useNavigate } from 'react-router';

export type SignupData = {
  citizenId: string;
};

const useSignupController = () => {
  const { unprotectedAPI } = useAxios();
  const { setToken } = useAuth();
  const { googleToken } = useContext(SignupContext);
  const navigate = useNavigate();

  const onSubmit = (data: SignupData) => {
    unprotectedAPI
      .get<string>('/auth/signup', {
        params: {
          citizen_id: data.citizenId,
          access_token: googleToken,
        },
      })
      .then((res) => {
        setToken(res);
        navigate('/test');
      });
  };

  useEffect(() => {
    if (!googleToken) {
      navigate('/login');
    }
  }, [googleToken, navigate]);

  return {
    onSubmit,
  };
};

export default useSignupController;
