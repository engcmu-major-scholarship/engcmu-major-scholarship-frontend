import { useNavigate } from 'react-router';
import useStatusController from './useStatusController';
import { Path } from '../../constants/Path';

const Status = () => {
  const navigate = useNavigate();
  const { currentYearSemester, currentYearStatus } = useStatusController();
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="flex flex-col px-24 py-4 gap-4">
        <div className="flex flex-row gap-2 w-full my-4">
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.625 13.75L16.25 9.375L18 7.625L20.625 10.25L25.875 5L27.625 6.75L20.625 13.75ZM13.75 8.75H2.5V11.25H13.75V8.75ZM26.25 16.75L24.5 15L21.25 18.25L18 15L16.25 16.75L19.5 20L16.25 23.25L18 25L21.25 21.75L24.5 25L26.25 23.25L23 20L26.25 16.75ZM13.75 18.75H2.5V21.25H13.75V18.75Z"
                fill="black"
              />
            </svg>
          </span>
          <span>{`การสมัครทุนปีการศึกษา ${currentYearSemester?.year} ภาคเรียนที่ ${currentYearSemester?.semester}`}</span>
        </div>
        {currentYearStatus.length !== 0 ? (
          <table>
            <thead>
              <tr>
                <th className="p-2 bg-[#E4E8DB] text-center rounded-tl-2xl">
                  ชื่อทุน
                </th>
                <th className="p-2 bg-[#E4E8DB] text-center">สถานะ</th>
                <th className="p-2 bg-[#E4E8DB] text-center rounded-tr-2xl">
                  แก้ไขใบสมัคร
                </th>
              </tr>
            </thead>
            <tbody>
              {currentYearStatus.map((status, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? '' : 'bg-[#F0F2ED]'}
                >
                  <td className="p-2 text-center">{status.scholarName}</td>
                  <td className="p-2 text-center">
                    {status.submissionTime
                      ? status.adminApproveTime
                        ? 'ได้รับการอนุมัติ'
                        : 'ยังไม่ได้รับการอนุมัติ'
                      : 'ยังไม่ได้ยืนยันใบสมัคร'}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      type="button"
                      className="bg-[#E4E8DB] hover:bg-[#C4C9BC] text-black py-3 px-8 text-lg rounded-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={status.submissionTime !== null}
                      onClick={() => navigate(`${Path.APPLY}/${status.appId}`)}
                    >
                      แก้ไข
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">ยังไม่มีการสมัครทุนในปีการศึกษานี้</div>
        )}
      </div>
    </div>
  );
};

export default Status;
