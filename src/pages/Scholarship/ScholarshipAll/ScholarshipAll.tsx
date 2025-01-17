import { useNavigate } from 'react-router';
import useScholarshipAllController from './useScholarshipAllController';
import { Path } from '../../../constants/Path';
import { useAuth } from '../../../hooks/useAuth';
import { Role } from '../../../types/Roles';

const ScholarshipAll = () => {
  const { roles } = useAuth();
  const {
    searchResults,
    navigateToCreateScholarship,
    searchText,
    setSearchText,
  } = useScholarshipAllController();
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="flex flex-col px-24 py-4 gap-4">
        <div className="w-full text-xl text-center">ทุนทั้งหมด</div>
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col w-1/4 gap-2">
            <label htmlFor="scholarName" className="text-sm font-medium">
              ค้นหาทุน
            </label>
            <input
              id="scholarName"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border-2 text-sm rounded-lg w-full p-2.5"
            />
          </div>
          {roles.includes(Role.ADMIN) ? (
            <button
              className=" text-black font-bold border border-solid border-black py-2 px-6 rounded-2xl"
              onClick={navigateToCreateScholarship}
            >
              เพิ่มทุน
            </button>
          ) : null}
        </div>
        <div className="w-full flex flex-col gap-3 items-center">
          {searchResults.map((scholarship, index) => (
            <div
              key={index}
              className="flex flex-col w-full p-12 gap-2 bg-[#e4f0f1] rounded-lg"
            >
              {roles.includes(Role.ADMIN) ? (
                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      navigate(`${Path.EDIT_SCHOLARSHIP}/${scholarship.id}`)
                    }
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.75 21.8249V25.6249C3.75 25.9749 4.025 26.2499 4.375 26.2499H8.175C8.3375 26.2499 8.5 26.1874 8.6125 26.0624L22.2625 12.4249L17.575 7.73738L3.9375 21.3749C3.8125 21.4999 3.75 21.6499 3.75 21.8249ZM25.8875 8.79988C26.0034 8.68424 26.0953 8.54688 26.158 8.39566C26.2208 8.24444 26.2531 8.08234 26.2531 7.91863C26.2531 7.75492 26.2208 7.59282 26.158 7.4416C26.0953 7.29038 26.0034 7.15302 25.8875 7.03738L22.9625 4.11238C22.8469 3.9965 22.7095 3.90457 22.5583 3.84184C22.4071 3.77911 22.245 3.74683 22.0813 3.74683C21.9175 3.74683 21.7554 3.77911 21.6042 3.84184C21.453 3.90457 21.3156 3.9965 21.2 4.11238L18.9125 6.39988L23.6 11.0874L25.8875 8.79988Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
              ) : null}
              <div className="text-xl font-bold">{scholarship.name}</div>
              <div className="text">{scholarship.description}</div>
              <div className="flex justify-end">
                <button
                  className="underline"
                  onClick={() =>
                    navigate(`${Path.SCHOLARSHIP}/${scholarship.id}`)
                  }
                >
                  ดูรายละเอียดทุน
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipAll;
