import { createContext, Dispatch, SetStateAction } from 'react';

export type PathInfo = {
  label: string;
  link: string;
  icon: JSX.Element;
};

export type RolesBaseAccessContextType = {
  accessibles: PathInfo[];
  setAccessibles: Dispatch<SetStateAction<PathInfo[]>>;
};

export const RolesBaseAccessContext = createContext<RolesBaseAccessContextType>(
  {
    accessibles: [],
    setAccessibles: () => {},
  },
);
