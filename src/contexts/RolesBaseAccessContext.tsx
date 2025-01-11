import { createContext, Dispatch, SetStateAction } from 'react';

export interface PathInfo {
  label: string;
  link: string;
  icon: JSX.Element;
}

export interface RolesBaseAccessContextType {
  accessibles: PathInfo[];
  setAccessibles: Dispatch<SetStateAction<PathInfo[]>>;
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
  isProfileMenuOpen: boolean;
  setIsProfileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const RolesBaseAccessContext = createContext<RolesBaseAccessContextType>(
  {
    accessibles: [],
    setAccessibles: () => {},
    isSideBarOpen: false,
    setIsSideBarOpen: () => {},
    isProfileMenuOpen: false,
    setIsProfileMenuOpen: () => {},
  },
);
