import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { RolesBaseAccessContext } from '../../contexts/RolesBaseAccessContext';

const useSignoutController = () => {
  const { removeToken } = useAuth();
  const { setIsProfileMenuOpen } = useContext(RolesBaseAccessContext);
  const navigate = useNavigate();
  useEffect(() => {
    removeToken();
    setIsProfileMenuOpen(false);
    navigate('/', { replace: true });
  }, [navigate, removeToken, setIsProfileMenuOpen]);

  return;
};

export default useSignoutController;
