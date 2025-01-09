import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Path } from '../../constants/Path';

const useNavbarController = () => {
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isFixed] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const navigateToProfile = () => {
    navigate(Path.PROFILE);
  };

  const logout = () => {
    navigate(Path.SIGNOUT);
  };
  return {
    isFixed,
    isSideBarOpen,
    isProfileMenuOpen,
    toggleSideBar,
    toggleProfileMenu,
    navigateToProfile,
    logout,
  };
};

export default useNavbarController;
