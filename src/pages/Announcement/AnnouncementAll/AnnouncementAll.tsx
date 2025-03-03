import { useNavigate } from 'react-router';
import useAnnouncementAllController from './useAnnouncementAllController';
import { Path } from '../../../constants/Path';
import { useAuth } from '../../../hooks/useAuth';
import { Role } from '../../../types/Roles';

const AnnouncementAll = () => {
  const { roles } = useAuth();
  const {
    searchResults,
    navigateToCreateScholarship,
    searchText,
    setSearchText,
  } = useAnnouncementAllController();
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="flex flex-col px-24 py-4 gap-4">
        <div className="flex flex-row gap-2 w-full text-xl">
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 60 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M28.8487 0.997501C29.2108 0.835062 29.6031 0.751083 30 0.751083C30.3968 0.751083 30.7892 0.835062 31.1512 0.997501L58.3387 13.185C58.8329 13.4073 59.2524 13.7676 59.5467 14.2227C59.841 14.6777 59.9976 15.2081 59.9976 15.75C59.9976 16.2919 59.841 16.8223 59.5467 17.2773C59.2524 17.7324 58.8329 18.0927 58.3387 18.315L48.75 22.6163V33.0938C48.75 36.9338 45.7125 39.6525 42.525 41.2425C39.1762 42.9188 34.7437 43.875 30 43.875C28.9575 43.875 27.9375 43.83 26.94 43.74C26.2031 43.6662 25.5251 43.3047 25.0531 42.7341C24.5811 42.1635 24.3532 41.4297 24.4189 40.6921C24.4846 39.9545 24.8385 39.2725 25.4039 38.7943C25.9692 38.316 26.7004 38.08 27.4387 38.1375C28.2687 38.2125 29.1225 38.25 30 38.25C34.0575 38.25 37.5937 37.4212 40.0125 36.2137C42.6 34.92 43.125 33.6562 43.125 33.0938V25.1363L31.1512 30.5025C30.7892 30.6649 30.3968 30.7489 30 30.7489C29.6031 30.7489 29.2108 30.6649 28.8487 30.5025L15 24.3V30.5362C16.11 30.93 17.1562 31.5675 18.045 32.4562C19.6875 34.0988 20.625 36.4275 20.625 39.1912V50.4412C20.625 51.1872 20.3287 51.9025 19.8012 52.43C19.2738 52.9574 18.5584 53.2537 17.8125 53.2537H6.56247C5.81655 53.2537 5.10118 52.9574 4.57373 52.43C4.04629 51.9025 3.74997 51.1872 3.74997 50.4412V39.1912C3.74997 36.4275 4.68747 34.0988 6.32997 32.4562C7.21872 31.5675 8.26497 30.93 9.37497 30.5362V21.7725L1.66122 18.315C1.167 18.0927 0.747513 17.7324 0.453226 17.2773C0.158939 16.8223 0.00238037 16.2919 0.00238037 15.75C0.00238037 15.2081 0.158939 14.6777 0.453226 14.2227C0.747513 13.7676 1.167 13.4073 1.66122 13.185L28.8487 0.997501ZM9.68622 15.75L30 24.855L50.31 15.75L30 6.645L9.68622 15.75ZM9.37497 39.1875V47.625H15V39.1875C15 37.7325 14.5312 36.8963 14.0625 36.4313C13.8159 36.1866 13.5231 35.9934 13.2013 35.8627C12.8794 35.732 12.5348 35.6665 12.1875 35.67C11.8401 35.6665 11.4955 35.732 11.1737 35.8627C10.8518 35.9934 10.5591 36.1866 10.3125 36.4313C9.84372 36.8963 9.37497 37.7325 9.37497 39.1875Z" />
            </svg>
          </span>
          <span>ทุนทั้งหมด</span>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex flex-col w-1/4 gap-2">
            <label htmlFor="scholarSearch" className="text-sm font-medium">
              ค้นหาทุน
            </label>
            <input
              id="scholarSearch"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border-2 text-sm rounded-lg w-full p-2.5"
            />
          </div>
          {roles.includes(Role.ADMIN) && (
            <div className="flex justify-center items-end">
              <button
                type="button"
                className=" text-black font-bold bg-[#E4E8DB] py-3 px-6 rounded-xl drop-shadow-lg cursor-pointer hover:bg-[#C4C9BC] transition-colors duration-300 ease-in-out"
                onClick={navigateToCreateScholarship}
              >
                เพิ่มทุน
              </button>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-6 items-center">
          {searchResults.map((scholarship, index) => (
            <div
              key={index}
              className="flex flex-col w-full pb-6 gap-3 border-b border-solid border-black"
            >
              <div className="flex flex-row gap-2 text-xl font-bold">
                <span
                  className="hover:underline cursor-pointer"
                  onClick={() =>
                    navigate(`${Path.ANNOUNCEMENT}/${scholarship.id}`)
                  }
                >
                  {scholarship.name}
                </span>
                <div className="flex justify-center items-center">
                  <button
                    title="open scholarship info in new tab"
                    type="button"
                    className="cursor-pointer"
                    onClick={() =>
                      window.open(
                        `${window.location.origin}${Path.ANNOUNCEMENT}/${scholarship.id}`,
                        '_blank',
                      )
                    }
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.66659 4.99992C6.22456 4.99992 5.80063 5.17551 5.48807 5.48807C5.17551 5.80063 4.99992 6.22456 4.99992 6.66659V13.3333C4.99992 13.7753 5.17551 14.1992 5.48807 14.5118C5.80063 14.8243 6.22456 14.9999 6.66659 14.9999H13.3333C13.7753 14.9999 14.1992 14.8243 14.5118 14.5118C14.8243 14.1992 14.9999 13.7753 14.9999 13.3333V11.6666C14.9999 11.4456 15.0877 11.2336 15.244 11.0773C15.4003 10.921 15.6122 10.8333 15.8333 10.8333C16.0543 10.8333 16.2662 10.921 16.4225 11.0773C16.5788 11.2336 16.6666 11.4456 16.6666 11.6666V13.3333C16.6666 14.2173 16.3154 15.0652 15.6903 15.6903C15.0652 16.3154 14.2173 16.6666 13.3333 16.6666H6.66659C5.78253 16.6666 4.93468 16.3154 4.30956 15.6903C3.68444 15.0652 3.33325 14.2173 3.33325 13.3333V6.66659C3.33325 5.78253 3.68444 4.93468 4.30956 4.30956C4.93468 3.68444 5.78253 3.33325 6.66659 3.33325H8.33325C8.55427 3.33325 8.76623 3.42105 8.92251 3.57733C9.07879 3.73361 9.16658 3.94557 9.16658 4.16659C9.16658 4.3876 9.07879 4.59956 8.92251 4.75584C8.76623 4.91212 8.55427 4.99992 8.33325 4.99992H6.66659ZM11.6666 4.99992C11.4456 4.99992 11.2336 4.91212 11.0773 4.75584C10.921 4.59956 10.8333 4.3876 10.8333 4.16659C10.8333 3.94557 10.921 3.73361 11.0773 3.57733C11.2336 3.42105 11.4456 3.33325 11.6666 3.33325H15.8333C16.0543 3.33325 16.2662 3.42105 16.4225 3.57733C16.5788 3.73361 16.6666 3.94557 16.6666 4.16659V8.33325C16.6666 8.55427 16.5788 8.76623 16.4225 8.92251C16.2662 9.07879 16.0543 9.16658 15.8333 9.16658C15.6122 9.16658 15.4003 9.07879 15.244 8.92251C15.0877 8.76623 14.9999 8.55427 14.9999 8.33325V6.17825L12.2566 8.92325C12.1791 9.00073 12.0871 9.06219 11.9859 9.10412C11.8847 9.14606 11.7762 9.16764 11.6666 9.16764C11.557 9.16764 11.4485 9.14606 11.3473 9.10412C11.246 9.06219 11.1541 9.00073 11.0766 8.92325C10.9991 8.84577 10.9376 8.75379 10.8957 8.65256C10.8538 8.55133 10.8322 8.44282 10.8322 8.33325C10.8322 8.22368 10.8538 8.11518 10.8957 8.01395C10.9376 7.91271 10.9991 7.82073 11.0766 7.74325L13.8216 4.99992H11.6666Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
                {roles.includes(Role.ADMIN) && (
                  <div className="flex justify-center items-center">
                    <button
                      title="edit scholarship"
                      type="button"
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(`${Path.CONFIG_SCHOLARSHIP}/${scholarship.id}`)
                      }
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.7759 2.63333C16.307 2.16466 15.6713 1.90137 15.0084 1.90137C14.3454 1.90137 13.7097 2.16466 13.2409 2.63333L12.6517 3.22333L16.7767 7.34833L17.365 6.75917C17.5972 6.52702 17.7814 6.2514 17.9071 5.94806C18.0327 5.64472 18.0974 5.31959 18.0974 4.99125C18.0974 4.66291 18.0327 4.33779 17.9071 4.03444C17.7814 3.7311 17.5972 3.45549 17.365 3.22333L16.7759 2.63333ZM15.5975 8.52667L11.4725 4.40167L3.89752 11.9775C3.73176 12.1433 3.61596 12.3524 3.56335 12.5808L2.70585 16.2933C2.6739 16.4312 2.67757 16.5748 2.7165 16.7109C2.75544 16.8469 2.82836 16.9707 2.9284 17.0708C3.02844 17.1708 3.15231 17.2437 3.28832 17.2827C3.42434 17.3216 3.56803 17.3253 3.70585 17.2933L7.41919 16.4367C7.64736 16.3839 7.85612 16.2681 8.02169 16.1025L15.5975 8.52667Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <div className="text-gray-500">{scholarship.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementAll;
