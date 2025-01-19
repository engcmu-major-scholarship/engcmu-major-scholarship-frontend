import useHistoryController from './useHistoryController';

const History = () => {
  const { history } = useHistoryController();

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="flex flex-col px-24 py-4 gap-4">
        <div className="w-full text-xl text-center">ประวัติการสมัครทุน</div>
        {history.length !== 0 ? (
          <table className="border-separate border-spacing-x-1">
            <thead>
              <tr>
                <th className="p-2 bg-[#b7cdcf] text-center">ชื่อทุน</th>
                <th className="p-2 bg-[#b7cdcf] text-center">ปีการศึกษา</th>
                <th className="p-2 bg-[#b7cdcf] text-center">ภาคเรียน</th>
                <th className="p-2 bg-[#b7cdcf] text-center">งบประมาณ</th>
                <th className="p-2 bg-[#b7cdcf] text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {history.map((application, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? '' : 'bg-[#dbe9ea]'}
                >
                  <td className="p-2 text-center">{application.scholarName}</td>
                  <td className="p-2 text-center">{application.year}</td>
                  <td className="p-2 text-center">{application.semester}</td>
                  <td className="p-2 text-center">
                    {application.budget ? application.budget : '-'}
                  </td>
                  <td className="p-2 text-center">
                    {application.submissionTime
                      ? application.adminApprovalTime
                        ? 'ได้รับการอนุมัติ'
                        : 'ไม่ได้รับการอนุมัติ'
                      : 'ไม่ได้ยืนยันใบสมัคร'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">ไม่มีประวัติการสมัครทุน</div>
        )}
      </div>
    </div>
  );
};

export default History;
