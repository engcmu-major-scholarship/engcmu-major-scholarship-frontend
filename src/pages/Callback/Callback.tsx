import { useEffect, useState } from 'react';
import hashParamsParser from '../../utils/hashParamsParser';
import { AxiosGoogle } from '../../utils/Axios/AxiosGoogle';

export interface CallbackProps {
  access_token: string;
  token_type: string;
  expires_in: string;
  scope: string;
  error: string;
  [key: string]: string;
}

export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  [key: string]: string | boolean;
}

const Callback = () => {
  const [hashParams] = useState<CallbackProps>(
    hashParamsParser<CallbackProps>(window.location.hash),
  );
  const [hashParamsKeys] = useState<string[]>(Object.keys(hashParams));
  const [userInfo, setUserInfo] = useState<GoogleUserInfo | null>(null);
  const [userInfoKeys, setUserInfoKeys] = useState<string[]>([]);

  useEffect(() => {
    if (hashParams.error) return;
    const axios = new AxiosGoogle(
      hashParams.token_type,
      hashParams.access_token,
    );

    const getEmailInfo = async () => {
      const response = await axios.get<GoogleUserInfo>('/oauth2/v1/userinfo');
      console.log(response);
      return response;
    };
    getEmailInfo().then((response) => {
      setUserInfo(response);
      setUserInfoKeys(Object.keys(response));
    });
  }, [hashParams.access_token, hashParams.error, hashParams.token_type]);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-4xl text-center">Callback</div>
      <div className="text-2xl text-center">Hash Params</div>
      <div className="text-xl text-center">
        {hashParams.error ? (
          <div className="text-red-500">{hashParams.error}</div>
        ) : (
          <div>
            {hashParamsKeys.map((key) => (
              <div key={key}>
                <span className="font-semibold">{key}</span>: {hashParams[key]}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-2xl text-center">Google User Info</div>
      <div className="text-xl text-center">
        {userInfo ? (
          <div>
            {userInfoKeys.map((key) => (
              <div key={key}>
                <span className="font-semibold">{key}</span>: {userInfo[key]}
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Callback;
