import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { RolesBaseAccessContext } from '../../contexts/RolesBaseAccessContext';
import { handleCMUAccountSignIn } from '../../utils/handleCMUAccountSignIn';
import useNavbarController from './useNavbarController';
import { Role } from '../../types/Roles';

const Navbar = () => {
  const {
    isSideBarOpen,
    isProfileMenuOpen,
    isFixed,
    toggleSideBar,
    toggleProfileMenu,
    navigateToProfile,
    logout,
  } = useNavbarController();
  const { CMUAccount, roles } = useAuth();
  const { accessibles } = useContext(RolesBaseAccessContext);

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="sticky top-0 bg-gradient-to-r from-[#dbe9ea] to-[#c3d591] p-4 flex flex-row justify-between">
        <button
          onClick={toggleSideBar}
          className="text-white transition-transform duration-300"
        >
          <svg
            className="w-6 h-6 transform"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isSideBarOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>
        <div>
          {CMUAccount ? (
            <button onClick={toggleProfileMenu}>
              <svg
                className="w-6 h-6 inline-block mr-2"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.375 13.5417C17.141 13.5417 17.8996 13.3908 18.6073 13.0976C19.3151 12.8045 19.9581 12.3748 20.4998 11.8331C21.0415 11.2914 21.4711 10.6484 21.7643 9.94065C22.0574 9.23292 22.2083 8.47438 22.2083 7.70833C22.2083 6.94229 22.0574 6.18375 21.7643 5.47601C21.4711 4.76828 21.0415 4.12522 20.4998 3.58354C19.9581 3.04187 19.3151 2.61219 18.6073 2.31904C17.8996 2.02588 17.141 1.875 16.375 1.875C14.8279 1.875 13.3442 2.48958 12.2502 3.58354C11.1562 4.67751 10.5417 6.16124 10.5417 7.70833C10.5417 9.25543 11.1562 10.7392 12.2502 11.8331C13.3442 12.9271 14.8279 13.5417 16.375 13.5417ZM1.375 30.875V31.875H31.375V30.875C31.375 27.1417 31.375 25.275 30.6483 23.8483C30.0092 22.594 28.9894 21.5741 27.735 20.935C26.3083 20.2083 24.4417 20.2083 20.7083 20.2083H12.0417C8.30833 20.2083 6.44167 20.2083 5.015 20.935C3.76064 21.5741 2.74081 22.594 2.10167 23.8483C1.375 25.275 1.375 27.1417 1.375 30.875Z"
                  fill="black"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{CMUAccount}</span>
            </button>
          ) : (
            <button onClick={handleCMUAccountSignIn}>
              <svg
                className="w-6 h-6 inline-block mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 6C8 3.79086 9.79086 2 12 2H17.5C19.9853 2 22 4.01472 22 6.5V17.5C22 19.9853 19.9853 22 17.5 22H12C9.79086 22 8 20.2091 8 18V17C8 16.4477 8.44772 16 9 16C9.55228 16 10 16.4477 10 17V18C10 19.1046 10.8954 20 12 20H17.5C18.8807 20 20 18.8807 20 17.5V6.5C20 5.11929 18.8807 4 17.5 4H12C10.8954 4 10 4.89543 10 6V7C10 7.55228 9.55228 8 9 8C8.44772 8 8 7.55228 8 7V6ZM12.2929 8.29289C12.6834 7.90237 13.3166 7.90237 13.7071 8.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L13.7071 15.7071C13.3166 16.0976 12.6834 16.0976 12.2929 15.7071C11.9024 15.3166 11.9024 14.6834 12.2929 14.2929L13.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L13.5858 11L12.2929 9.70711C11.9024 9.31658 11.9024 8.68342 12.2929 8.29289Z"
                  fill="#0F1729"
                />
              </svg>
              <span>เข้าสู่ระบบ</span>
            </button>
          )}
        </div>
      </div>

      <div className="h-full flex flex-row">
        <div
          className={`${isFixed ? 'fixed left-0' : ''} h-full bg-white drop-shadow-md transition-all duration-300 ease-in-out ${
            isSideBarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'
          }`}
        >
          <div className="flex flex-col overflow-hidden">
            {accessibles.map((path, index) => (
              <NavLink
                key={index}
                to={path.link}
                className={({ isActive }) =>
                  `m-2 p-3 text-center text-nowrap drop-shadow-md rounded-2xl ${isActive ? 'bg-gradient-to-r from-[#dbe9ea] to-[#c3d591]' : ''}`
                }
              >
                {path.label}
              </NavLink>
            ))}
          </div>
        </div>

        <Outlet />

        <div
          className={`fixed right-0 h-fit bg-white drop-shadow-md transition-all duration-300 ease-in-out ${
            isProfileMenuOpen ? 'w-48 -translate-x-0' : 'w-0 translate-x-full'
          }`}
        >
          <div className="flex flex-col p-4">
            {roles.includes(Role.STUDENT) ? (
              <button
                onClick={navigateToProfile}
                className="block text-center text-nowrap py-2 hover:underline"
              >
                โปรไฟล์
              </button>
            ) : null}
            <button
              onClick={logout}
              className="block text-center text-nowrap py-2 hover:underline"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
