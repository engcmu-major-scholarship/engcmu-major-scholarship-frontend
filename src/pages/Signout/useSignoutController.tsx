import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { RolesBaseAccessContext } from '../../contexts/RolesBaseAccessContext';

const useSignoutController = () => {
  const { removeToken, setCMUAccount, setRoles } = useAuth();
  const { setIsProfileMenuOpen } = useContext(RolesBaseAccessContext);
  const navigate = useNavigate();
  useEffect(() => {
    removeToken();
    setCMUAccount(null);
    setRoles([]);
    setIsProfileMenuOpen(false);
    navigate('/', { replace: true });
  }, [navigate, removeToken, setCMUAccount, setIsProfileMenuOpen, setRoles]);

  return;
};

export default useSignoutController;
