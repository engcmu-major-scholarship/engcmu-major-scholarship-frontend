import { createContext, Dispatch, SetStateAction } from 'react';

export interface PathInfo {
  label: string;
  link: string;
  icon: JSX.Element;
}

export interface RolesBaseAccessContextType {
  accessibles: PathInfo[];
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
  isProfileMenuOpen: boolean;
  setIsProfileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const RolesBaseAccessContext = createContext<RolesBaseAccessContextType>(
  {
    accessibles: [],
    isSideBarOpen: false,
    setIsSideBarOpen: () => {},
    isProfileMenuOpen: false,
    setIsProfileMenuOpen: () => {},
  },
);
