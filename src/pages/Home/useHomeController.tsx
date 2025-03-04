import { useAuth } from '../../hooks/useAuth';

const useHomeController = () => {
  const { token, roles } = useAuth();
  return {
    token,
    roles,
  };
};

export default useHomeController;
