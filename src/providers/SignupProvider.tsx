import { ReactNode, useState } from 'react';
import { SignupContext } from '../contexts/SignupContext';

const SignupProvider = ({ children }: { children: ReactNode }) => {
  const [googleToken, setGoogleToken] = useState<string | null>(null);

  return (
    <SignupContext.Provider value={{ googleToken, setGoogleToken }}>
      {children}
    </SignupContext.Provider>
  );
};

export default SignupProvider;
