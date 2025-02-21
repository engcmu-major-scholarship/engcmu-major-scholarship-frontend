import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { RolesBaseAccessContext } from '../../contexts/RolesBaseAccessContext';
import { handleCMUAccountSignIn } from '../../utils/handleCMUAccountSignIn';
import useNavbarController from './useNavbarController';

const Navbar = () => {
  const { toggleSideBar } = useNavbarController();
  const { CMUAccount } = useAuth();
  const { accessibles, isSideBarOpen } = useContext(RolesBaseAccessContext);

  return (
    <div className="max-h-screen max-w-screen h-screen w-screen flex flex-row">
      <div
        className={`flex flex-col justify-between h-full py-2 bg-[#E4E8DB] drop-shadow-2xl transition-all duration-300 ease-in-out overflow-y-auto rounded-r-3xl ${
          isSideBarOpen ? 'w-80 translate-x-0' : 'w-22 translate-x-0'
        }`}
      >
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex flex-col overflow-hidden">
            {CMUAccount ? (
              <div className="flex flex-row gap-2 items-center mx-4 p-3 text-nowrap drop-shadow-md rounded-2xl">
                <span>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 22.9168C18.2532 22.9168 22.9167 18.2533 22.9167 12.5002C22.9167 6.74704 18.2532 2.0835 12.5 2.0835C6.74692 2.0835 2.08337 6.74704 2.08337 12.5002C2.08337 18.2533 6.74692 22.9168 12.5 22.9168Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5 11.9793C13.1907 11.9793 13.8531 11.705 14.3415 11.2166C14.8298 10.7282 15.1042 10.0658 15.1042 9.37516C15.1042 8.68449 14.8298 8.02211 14.3415 7.53374C13.8531 7.04536 13.1907 6.771 12.5 6.771C11.8094 6.771 11.147 7.04536 10.6586 7.53374C10.1702 8.02211 9.89587 8.68449 9.89587 9.37516C9.89587 10.0658 10.1702 10.7282 10.6586 11.2166C11.147 11.705 11.8094 11.9793 12.5 11.9793Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.21985 19.9649C5.39902 17.2508 7.65735 15.1045 10.4167 15.1045H14.5834C17.3391 15.1045 19.5954 17.2451 19.7797 19.954"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span
                  className={`text-start text-nowrap transition-all duration-300 ease-in-out ${
                    isSideBarOpen
                      ? 'w-full opacity-100'
                      : 'w-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {CMUAccount}
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleCMUAccountSignIn}
                className="flex flex-row gap-2 items-center mx-4 p-3 text-nowrap drop-shadow-md rounded-2xl cursor-pointer"
              >
                <span>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 inline-block"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 6C8 3.79086 9.79086 2 12 2H17.5C19.9853 2 22 4.01472 22 6.5V17.5C22 19.9853 19.9853 22 17.5 22H12C9.79086 22 8 20.2091 8 18V17C8 16.4477 8.44772 16 9 16C9.55228 16 10 16.4477 10 17V18C10 19.1046 10.8954 20 12 20H17.5C18.8807 20 20 18.8807 20 17.5V6.5C20 5.11929 18.8807 4 17.5 4H12C10.8954 4 10 4.89543 10 6V7C10 7.55228 9.55228 8 9 8C8.44772 8 8 7.55228 8 7V6ZM12.2929 8.29289C12.6834 7.90237 13.3166 7.90237 13.7071 8.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L13.7071 15.7071C13.3166 16.0976 12.6834 16.0976 12.2929 15.7071C11.9024 15.3166 11.9024 14.6834 12.2929 14.2929L13.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L13.5858 11L12.2929 9.70711C11.9024 9.31658 11.9024 8.68342 12.2929 8.29289Z"
                      fill="#0F1729"
                    />
                  </svg>
                </span>
                <span
                  className={`text-start text-nowrap transition-all duration-300 ease-in-out ${
                    isSideBarOpen
                      ? 'w-full opacity-100'
                      : 'w-0 opacity-0 overflow-hidden'
                  }`}
                >
                  เข้าสู่ระบบ
                </span>
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1 overflow-x-hidden overflow-y-auto">
            {accessibles.map((path, index) => (
              <NavLink
                key={index}
                to={path.link}
                className={({ isActive }) =>
                  `flex flex-row gap-2 items-center mx-4 p-3 text-nowrap drop-shadow-md rounded-2xl ${isActive ? 'text-[#7D8C6E] fill-[#7D8C6E]' : 'text-black fill-black'}`
                }
              >
                <span className="fill-inherit">{path.icon}</span>
                <span
                  className={`text-nowrap transition-all duration-300 ease-in-out ${
                    isSideBarOpen
                      ? 'w-full opacity-100'
                      : 'w-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {path.label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <button
            title="expand side bar"
            type="button"
            className="flex flex-row gap-2 justify-end items-center mx-4 p-3 text-nowrap drop-shadow-md rounded-2xl"
            onClick={toggleSideBar}
          >
            <svg
              className={`transition-transform duration-300 ${
                isSideBarOpen ? '-rotate-180' : ''
              }`}
              width="25"
              height="25"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99996 6.19046L13.8095 9.99998M13.8095 9.99998L9.99996 13.8095M13.8095 9.99998H3.33329M16.6666 3.33331V16.6666"
                stroke="black"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
