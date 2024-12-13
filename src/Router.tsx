import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import Callback from './pages/Callback/Callback';
import Login from './pages/Login/Login';
import AuthProvider from './providers/AuthProvider';
import { useAuth } from './hooks/useAuth';
import AxiosProvider from './providers/AxiosProvider';
import SignupProvider from './providers/SignupProvider';
import Signup from './pages/Signup/Signup';

const providersGiver = ([...providers]: (({
  children,
}: {
  children: React.ReactNode;
}) => JSX.Element)[]) => {
  return providers.reduceRight(
    (children, Provider) => <Provider>{children}</Provider>,
    <Outlet />,
  );
};

const ProtectedRoute = () => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return <Outlet />;
};

const UnprotectedRoute = () => {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={providersGiver([AuthProvider, AxiosProvider])}>
          <Route path="/" element={<Home />} />
          <Route element={<UnprotectedRoute />}>
            <Route path="/login" element={<Login />} />
            <Route element={providersGiver([SignupProvider])}>
              <Route path="/callback" element={<Callback />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/logout" element={<Home />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/test" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
