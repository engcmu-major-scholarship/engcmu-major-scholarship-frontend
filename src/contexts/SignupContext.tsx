import { createContext, Dispatch, SetStateAction } from 'react';

export type SignupContextType = {
  googleToken: string | null;
  setGoogleToken: Dispatch<SetStateAction<string | null>>;
};

export const SignupContext = createContext<SignupContextType>({
  googleToken: null,
  setGoogleToken: () => {},
});
