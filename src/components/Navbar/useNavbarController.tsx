import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Path } from '../../constants/Path';
import { RolesBaseAccessContext } from '../../contexts/RolesBaseAccessContext';

const useNavbarController = () => {
  const navigate = useNavigate();
  const {
    isSideBarOpen,
    setIsSideBarOpen,
    isProfileMenuOpen,
    setIsProfileMenuOpen,
  } = useContext(RolesBaseAccessContext);

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
    toggleSideBar,
    toggleProfileMenu,
    navigateToProfile,
    logout,
  };
};

export default useNavbarController;
