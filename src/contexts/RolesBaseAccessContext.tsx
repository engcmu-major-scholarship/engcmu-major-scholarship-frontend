import { createContext, Dispatch, SetStateAction } from 'react';

export interface PathInfo {
  label: string;
  link: string;
  icon: JSX.Element;
}

export interface RolesBaseAccessContextType {
  accessibles: PathInfo[];
  setAccessibles: Dispatch<SetStateAction<PathInfo[]>>;
}

export const RolesBaseAccessContext = createContext<RolesBaseAccessContextType>(
  {
    accessibles: [],
    setAccessibles: () => {},
  },
);
