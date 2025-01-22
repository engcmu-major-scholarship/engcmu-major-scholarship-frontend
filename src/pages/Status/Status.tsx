import { useNavigate } from 'react-router';
import useStatusController from './useStatusController';
import { Path } from '../../constants/Path';

const Status = () => {
  const navigate = useNavigate();
  const { currentYearSemester, currentYearStatus } = useStatusController();
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="flex flex-col px-24 py-4 gap-4">
        <div className="w-full text-xl text-center">{`การสมัครทุนปีการศึกษา ${currentYearSemester?.year} ภาคเรียนที่ ${currentYearSemester?.semester}`}</div>
        {currentYearStatus.length !== 0 ? (
          <table className="border-separate border-spacing-x-1">
            <thead>
              <tr>
                <th className="p-2 bg-[#b7cdcf] text-center">ชื่อทุน</th>
                <th className="p-2 bg-[#b7cdcf] text-center">สถานะ</th>
                <th className="p-2 bg-[#b7cdcf] text-center">แก้ไขใบสมัคร</th>
              </tr>
            </thead>
            <tbody>
              {currentYearStatus.map((status, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? '' : 'bg-[#dbe9ea]'}
                >
                  <td className="p-2 text-center">{status.scholarName}</td>
                  <td className="p-2 text-center">
                    {status.submissionTime
                      ? status.adminApproveTime
                        ? 'ได้รับการอนุมัติ'
                        : 'ไม่ได้รับการอนุมัติ'
                      : 'ไม่ได้ยืนยันใบสมัคร'}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      className="bg-[#c3d591] text-black py-3 px-8 text-lg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
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
