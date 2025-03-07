import useAnnouncementAllController from './useRecipientHistoryController';
import Modal from '../../components/Modal';

const RecipientHistory = () => {
  const {
    searchResults,
    searchText,
    setSearchText,
    closeModal,
    handleDocCheckClick,
    modalApp,
    modalStudentData,
  } = useAnnouncementAllController();
  return (
    <div className="flex flex-col px-24 py-4 gap-4">
      <div className="flex flex-row gap-2 w-full my-4 text-xl">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="30"
            height="30"
          >
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
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
