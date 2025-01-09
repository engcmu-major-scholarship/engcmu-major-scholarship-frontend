import { useContext } from 'react';
import useHomeController from './useHomeController';
import { RolesBaseAccessContext } from '../../contexts/RolesBaseAccessContext';
import { useNavigate } from 'react-router';
import { Path } from '../../constants/Path';
import { createCMUAccountSignInUrl } from '../../utils/handleCMUAccountSignIn';

const Home = () => {
  useHomeController();
  const { accessibles } = useContext(RolesBaseAccessContext);
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="flex flex-row gap-8">
        {accessibles.map((path, index) => {
          if (
            path.link == Path.HOME ||
            path.link == createCMUAccountSignInUrl()
          ) {
            return null;
          } else {
            return (
              <div className="flex flex-col items-center" key={index}>
                <button
                  className="flex justify-center items-center p-3 size-24 bg-[#B7CDCF] rounded-full border-8 border-[#DBE9EA]"
                  onClick={() => {
                    navigate(path.link);
                  }}
                >
                  {path.icon}
                </button>
                <span>{path.label}</span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Home;
