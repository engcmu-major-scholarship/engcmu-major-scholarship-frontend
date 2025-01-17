import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import Callback from './pages/Callback/Callback';
import Signin from './pages/Signin/Signin';
import AuthProvider from './providers/AuthProvider';
import { useAuth } from './hooks/useAuth';
import HttpClientProvider from './providers/HttpClientProvider';
import { Path } from './constants/Path';
import Error404 from './pages/Error404';
import Signout from './pages/Signout/Signout';
import Navbar from './components/Navbar/Navbar';
import RolesBaseAccessProvider from './providers/RolesBaseAccessProvider';
import { handleCMUAccountSignIn } from './utils/handleCMUAccountSignIn';
import ScholarshipAll from './pages/Scholarship/ScholarshipAll/ScholarshipAll';
import ScholarshipById from './pages/Scholarship/ScholarshipById/ScholarshipById';
import CreateScholarship from './pages/Scholarship/CreateScholarship/CreateScholarship';
import EditScholarship from './pages/Scholarship/EditScholarship/EditScholarship';
import History from './pages/History/History';

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
    handleCMUAccountSignIn();
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
        <Route
          element={providersGiver([
            AuthProvider,
            HttpClientProvider,
            RolesBaseAccessProvider,
          ])}
        >
          <Route element={<Navbar />}>
            <Route path={Path.HOME} element={<Home />} />
            <Route path={Path.SCHOLARSHIP} element={<ScholarshipAll />} />
            <Route
              path={`${Path.SCHOLARSHIP}/:id`}
              element={<ScholarshipById />}
            />
          </Route>
          <Route path={Path.SIGNOUT} element={<Signout />} />
          <Route element={<UnprotectedRoute />}>
            <Route path={Path.SIGNIN} element={<Signin />} />
            <Route path={Path.CALLBACK} element={<Callback />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<Navbar />}>
              <Route path={Path.PROFILE} element={<Home />} />
              <Route path={Path.HISTORY} element={<History />} />
              <Route
                path={Path.CREATE_SCHOLARSHIP}
                element={<CreateScholarship />}
              />
              <Route
                path={`${Path.EDIT_SCHOLARSHIP}/:id`}
                element={<EditScholarship />}
              />
            </Route>
          </Route>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
