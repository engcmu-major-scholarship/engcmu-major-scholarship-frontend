import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import Callback from './pages/Callback/Callback';
import Signin from './pages/Signin/Signin';
import AuthProvider from './providers/AuthProvider';
import { useAuth } from './hooks/useAuth';
import HttpClientProvider from './providers/HttpClientProvider';
import { Path } from './constants/Path';
import Error404 from './pages/Error404';

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
    return <Navigate to={Path.SIGNIN} replace={true} />;
  }
  return <Outlet />;
};

const UnprotectedRoute = () => {
  const { token } = useAuth();
  if (token) {
    return <Navigate to={Path.HOME} replace={true} />;
  }
  return <Outlet />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={providersGiver([AuthProvider, HttpClientProvider])}>
          <Route path={Path.HOME} element={<Home />} />
          <Route element={<UnprotectedRoute />}>
            <Route path={Path.SIGNIN} element={<Signin />} />
            <Route path={Path.CALLBACK} element={<Callback />} />
            <Route path={Path.SIGNOUT} element={<Home />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path={Path.TEST} element={<Home />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
