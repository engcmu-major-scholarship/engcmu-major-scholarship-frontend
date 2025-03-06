import { useNavigate } from 'react-router';
import useAnnouncementAllController from './useRecipientHistoryController';
import { Path } from '../../constants/Path';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types/Roles';
import Modal from '../../components/Modal';

const RecipientHistory = () => {
  const { roles } = useAuth();
  const {
    searchResults,
    navigateToCreateAnnouncement,
    searchText,
    setSearchText,
    closeModal,
    handleDocCheckClick,
    modalApp,
    modalStudentData,
  } = useAnnouncementAllController();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-24 py-4 gap-4">
      <div className="flex flex-row gap-2 w-full my-4 text-xl">
        <span>
          <svg
            width="30"
            height="30"
            viewBox="0 0 25 25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.46875 7.8125C5.26155 7.8125 5.06284 7.89481 4.91632 8.04132C4.76981 8.18784 4.6875 8.38655 4.6875 8.59375C4.6875 8.80095 4.76981 8.99966 4.91632 9.14618C5.06284 9.29269 5.26155 9.375 5.46875 9.375H16.4062C16.6135 9.375 16.8122 9.29269 16.9587 9.14618C17.1052 8.99966 17.1875 8.80095 17.1875 8.59375C17.1875 8.38655 17.1052 8.18784 16.9587 8.04132C16.8122 7.89481 16.6135 7.8125 16.4062 7.8125H5.46875ZM5.46875 10.9375C5.26155 10.9375 5.06284 11.0198 4.91632 11.1663C4.76981 11.3128 4.6875 11.5115 4.6875 11.7188V14.8438C4.6875 15.051 4.76981 15.2497 4.91632 15.3962C5.06284 15.5427 5.26155 15.625 5.46875 15.625H8.59375C8.80095 15.625 8.99966 15.5427 9.14618 15.3962C9.29269 15.2497 9.375 15.051 9.375 14.8438V11.7188C9.375 11.5115 9.29269 11.3128 9.14618 11.1663C8.99966 11.0198 8.80095 10.9375 8.59375 10.9375H5.46875ZM6.25 14.0625V12.5H7.8125V14.0625H6.25ZM11.7188 10.9375C11.5115 10.9375 11.3128 11.0198 11.1663 11.1663C11.0198 11.3128 10.9375 11.5115 10.9375 11.7188C10.9375 11.926 11.0198 12.1247 11.1663 12.2712C11.3128 12.4177 11.5115 12.5 11.7188 12.5H16.4062C16.6135 12.5 16.8122 12.4177 16.9587 12.2712C17.1052 12.1247 17.1875 11.926 17.1875 11.7188C17.1875 11.5115 17.1052 11.3128 16.9587 11.1663C16.8122 11.0198 16.6135 10.9375 16.4062 10.9375H11.7188ZM11.7188 14.0625C11.5115 14.0625 11.3128 14.1448 11.1663 14.2913C11.0198 14.4378 10.9375 14.6365 10.9375 14.8438C10.9375 15.051 11.0198 15.2497 11.1663 15.3962C11.3128 15.5427 11.5115 15.625 11.7188 15.625H16.4062C16.6135 15.625 16.8122 15.5427 16.9587 15.3962C17.1052 15.2497 17.1875 15.051 17.1875 14.8438C17.1875 14.6365 17.1052 14.4378 16.9587 14.2913C16.8122 14.1448 16.6135 14.0625 16.4062 14.0625H11.7188ZM1.5625 6.25C1.5625 5.4212 1.89174 4.62634 2.47779 4.04029C3.06384 3.45424 3.8587 3.125 4.6875 3.125H17.1875C18.0163 3.125 18.8112 3.45424 19.3972 4.04029C19.9833 4.62634 20.3125 5.4212 20.3125 6.25C21.1413 6.25 21.9362 6.57924 22.5222 7.16529C23.1083 7.75134 23.4375 8.5462 23.4375 9.375V16.4062C23.4375 17.4423 23.0259 18.4358 22.2934 19.1684C21.5608 19.9009 20.5673 20.3125 19.5312 20.3125H5.46875C4.43275 20.3125 3.43918 19.9009 2.70661 19.1684C1.97405 18.4358 1.5625 17.4423 1.5625 16.4062V6.25ZM19.5312 16.4062C19.324 16.4062 19.1253 16.3239 18.9788 16.1774C18.8323 16.0309 18.75 15.8322 18.75 15.625V6.25C18.75 5.8356 18.5854 5.43817 18.2924 5.14515C17.9993 4.85212 17.6019 4.6875 17.1875 4.6875H4.6875C4.2731 4.6875 3.87567 4.85212 3.58265 5.14515C3.28962 5.43817 3.125 5.8356 3.125 6.25V16.4062C3.125 17.0279 3.37193 17.624 3.81147 18.0635C4.25101 18.5031 4.84715 18.75 5.46875 18.75H19.5312C20.1529 18.75 20.749 18.5031 21.1885 18.0635C21.6281 17.624 21.875 17.0279 21.875 16.4062V9.375C21.875 8.9606 21.7104 8.56317 21.4174 8.27015C21.1243 7.97712 20.7269 7.8125 20.3125 7.8125V15.625C20.3125 15.8322 20.2302 16.0309 20.0837 16.1774C19.9372 16.3239 19.7385 16.4062 19.5312 16.4062Z" />
          </svg>
        </span>
        <span>ประวัติผู้ที่ได้รับทุน</span>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex flex-col w-1/4 gap-2">
          <label htmlFor="announcementSearch" className="text-sm font-medium">
            ค้นหานักศึกษา
          </label>
          <input
            id="announcementSearch"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border-2 text-sm rounded-lg w-full p-2.5"
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-6 items-center">
        {searchResults.map((recipient, index) => (
          <div
            key={index}
            className="flex flex-col w-full pb-6 gap-3 border-b border-solid border-black"
          >
            <div className="flex flex-row gap-2 text-xl font-bold">
              <span
                className="hover:underline cursor-pointer"
                onClick={() => handleDocCheckClick(recipient.StudentId)}
              >
                {recipient.firstname} {recipient.lastname}
              </span>
              <div className="flex justify-center items-center">
                <button
                  title="open announcement info in new tab"
                  type="button"
                  className="cursor-pointer"
                  onClick={() => handleDocCheckClick(recipient.StudentId)}
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
            </div>
          </div>
        ))}
      </div>
      {modalApp && modalStudentData && (
        <Modal>
          <div className="w-3/4 h-fit bg-white rounded-3xl">
            <div className="flex flex-col w-full h-full p-6 gap-4">
              <div className="w-full text-center">ข้อมูลผู้สมัคร</div>
              <div>
                <table className="border-separate border-spacing-4">
                  <tbody>
                    <tr>
                      <td>ชื่อ-นามสกุล</td>
                      <td className="text-gray-600">
                        {modalStudentData.firstName +
                          ' ' +
                          modalStudentData.lastName}
                      </td>
                    </tr>
                    <tr>
                      <td>รหัสนักศึกษา</td>
                      <td className="text-gray-600">{modalStudentData.id}</td>
                    </tr>
                    <tr>
                      <td>อาจารย์ที่ปรึกษา</td>
                      <td className="text-gray-600">
                        {modalStudentData.advisorName ?? '-'}
                      </td>
                    </tr>
                    <tr>
                      <td>ทุนที่เคยสมัคร</td>
                      <tbody>
                        {modalApp.map((app, index) => (
                          <tr key={index}>
                            <td>ชื่อทุน {app.scholarName}</td>
                            <td>จำนวนที่ขอ {app.requestAmount}</td>
                            <td>defalutAmount {app.defaultAmount}</td>
                            <td>เทอม {app.semester}</td>
                            <td>ปี {app.year}</td>
                          </tr>
                        ))}
                      </tbody>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-row justify-between">
                <button
                  type="button"
                  title="close modal"
                  className="bg-red-300 py-3 px-5 rounded-2xl cursor-pointer hover:bg-red-400"
                  onClick={closeModal}
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RecipientHistory;
