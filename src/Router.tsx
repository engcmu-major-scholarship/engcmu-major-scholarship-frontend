import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import Callback from './pages/Callback/Callback';
import Login from './pages/Login/Login';
import AuthProvider from './providers/AuthProvider';
import { useAuth } from './hooks/useAuth';
import AxiosProvider from './providers/AxiosProvider';

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
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

const UnprotectedRoute = () => {
  return <Outlet />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={providersGiver([AuthProvider, AxiosProvider])}>
          <Route element={<UnprotectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/login" element={<Login />} />
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
