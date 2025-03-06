import { Role } from '../../types/Roles';
import useHomeController from './useHomeController';

const Home = () => {
  const {
    token,
    roles,
    announcements,
    considers,
    scholarships,
    currentYearStatus,
  } = useHomeController();

  const showDateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return (
    <div className="flex flex-col px-24 py-4 gap-4">
      <div className="flex flex-row gap-2 w-full my-4 text-xl">
        <span>
          <svg
            width="30"
            height="30"
            viewBox="0 0 20 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.49776 17.1329V11.9245H11.6644V17.1329C11.6644 17.7058 12.1332 18.1745 12.7061 18.1745H15.8311C16.404 18.1745 16.8728 17.7058 16.8728 17.1329V9.84119H18.6436C19.1228 9.84119 19.3519 9.24744 18.9873 8.93494L10.279 1.09119C9.88318 0.73702 9.27901 0.73702 8.88318 1.09119L0.174846 8.93494C-0.179321 9.24744 0.0394291 9.84119 0.518596 9.84119H2.28943V17.1329C2.28943 17.7058 2.75818 18.1745 3.3311 18.1745H6.4561C7.02901 18.1745 7.49776 17.7058 7.49776 17.1329Z" />
          </svg>
        </span>
        <span>หน้าหลัก</span>
      </div>
      {token
        ? 'ยินดีต้อนรับ'
        : 'ยินดีต้อนรับ! กรุณาเข้าสู่ระบบก่อนดำเนินการสมัครทุน'}
      <div className="h-60 w-full flex flex-col gap-2 p-5 shadow-full-2xl rounded-2xl">
        <div className="text-lg font-semibold text-[#7D8C6E]">
          ข่าวประชาสัมพันธ์
        </div>
        <div className="flex flex-col h-full w-full gap-4 overflow-y-auto">
          {announcements.map((announcement, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="text-lg font-bold">{announcement.name}</div>
              <div>{announcement.description}</div>
            </div>
          ))}
        </div>
      </div>
      {roles.includes(Role.STUDENT) && (
        <div className="flex gap-4">
          <div className="h-60 w-full flex flex-col gap-2 bg-white p-6 rounded-2xl shadow-full-2xl rounded-2xl">
            <h2 className="text-lg font-semibold text-[#7D8C6E] ">
              ทุนที่สมัครได้
            </h2>
            <div className="flex flex-col">
              {scholarships.length !== 0 ? (
                scholarships.map((scholarship, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-2 justify-between items-center "
                  >
                    <span>{scholarship.name}</span>
                    <span>
                      {' '}
                      {scholarship.openDate.toLocaleString(
                        undefined,
                        showDateOptions,
                      )}
                    </span>
                    <span>
                      {' '}
                      {scholarship.closeDate.toLocaleString(
                        undefined,
                        showDateOptions,
                      )}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-700">
                  ขณะนี้ยังไม่มีทุนที่เปิดรับสมัครในช่วงเวลานี้
                </div>
              )}
            </div>
          </div>

          <div className="h-60 w-full flex flex-col gap-2 bg-white p-6 rounded-2xl shadow-full-2xl rounded-2xl">
            <h2 className="text-lg font-semibold text-[#7D8C6E]">
              สถานะการขอทุน
            </h2>
            <div>
              {currentYearStatus.length !== 0 ? (
                currentYearStatus.map((status) => (
                  <div
                    className="flex flex-row gap-2 justify-between items-center"
                    key={status.appId}
                  >
                    <span>{status.scholarName}</span>
                    <span
                      className={`p-6 py-1.5 rounded-2xl mb-1 ${
                        status.submissionTime
                          ? status.adminApproveTime
                            ? 'bg-green-200 text-green-600 border border-3 border-green-500/40'
                            : 'bg-yellow-200 text-yellow-600 border border-3 border-yellow-500/40'
                          : 'bg-red-200 text-red-600 border border-3 border-red-500/40'
                      }`}
                    >
                      {status.submissionTime
                        ? status.adminApproveTime
                          ? 'อนุมัติ'
                          : 'รออนุมัติ'
                        : 'ไม่ยืนยันใบสมัคร'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-700">
                  ยังไม่มีการสมัครทุนในปีการศึกษานี้
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {roles.includes(Role.ADMIN) && (
        <div className="h-60 w-full flex flex-col bg-white p-6 rounded-2xl shadow-full-2xl rounded-2xl gap-2">
          <h2 className="text-lg font-semibold text-[#7D8C6E]">
            ผู้สมัครทุนที่รอการอนุมัติ
          </h2>
          <div className="">
            {considers.length != 0 ? (
              considers.map((consider) => (
                <div className="flex flex-row gap-2" key={consider.appId}>
                  <span>{consider.firstName + ' ' + consider.lastName}</span>
                  <span>{consider.scholarName}</span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-700">
                ยังไม่มีผู้รอการอนุมัติ
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
