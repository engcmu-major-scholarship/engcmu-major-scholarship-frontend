import useSRController from './useSRController';

const Something = () => {
  const {
    recipientData,
    YAS,
    selectedSemester,
    selectedYear,
    onYearChange,
    onSemChange,
  } = useSRController();

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="flex flex-col px-24 py-4 gap-4">
        <div className="flex flex-row gap-2 w-full my-4">
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M25 5C36.0275 5 45 13.9725 45 25C45 36.0275 36.0275 45 25 45C13.9725 45 5 36.0275 5 25C5 13.9725 13.9725 5 25 5ZM25 0C11.1925 0 0 11.1925 0 25C0 38.8075 11.1925 50 25 50C38.8075 50 50 38.8075 50 25C50 11.1925 38.8075 0 25 0ZM13.875 27.5C13.8275 27.915 13.75 28.3225 13.75 28.75C13.75 31.7337 14.9353 34.5952 17.045 36.7049C19.1548 38.8147 22.0163 40 25 40C27.9837 40 30.8452 38.8147 32.9549 36.7049C35.0647 34.5952 36.25 31.7337 36.25 28.75C36.25 28.3225 36.17 27.915 36.125 27.5H13.875ZM20 20V15C20 14.337 19.7366 13.7011 19.2678 13.2322C18.7989 12.7634 18.163 12.5 17.5 12.5C16.837 12.5 16.2011 12.7634 15.7322 13.2322C15.2634 13.7011 15 14.337 15 15V20C15 20.663 15.2634 21.2989 15.7322 21.7678C16.2011 22.2366 16.837 22.5 17.5 22.5C18.163 22.5 18.7989 22.2366 19.2678 21.7678C19.7366 21.2989 20 20.663 20 20ZM35 20V15C35 14.337 34.7366 13.7011 34.2678 13.2322C33.7989 12.7634 33.163 12.5 32.5 12.5C31.837 12.5 31.2011 12.7634 30.7322 13.2322C30.2634 13.7011 30 14.337 30 15V20C30 20.663 30.2634 21.2989 30.7322 21.7678C31.2011 22.2366 31.837 22.5 32.5 22.5C33.163 22.5 33.7989 22.2366 34.2678 21.7678C34.7366 21.2989 35 20.663 35 20Z" />
            </svg>
          </span>
          <span>รายชื่อผู้รับทุน</span>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-1/4 gap-2">
            <label htmlFor="year" className="text-sm font-medium">
              ปีการศึกษา
            </label>
            <select
              id="year"
              className="border rounded-md p-2.5"
              value={selectedYear}
              onChange={onYearChange}
            >
              {YAS.map((yasmap) => (
                <option key={yasmap.year} value={yasmap.year}>
                  {yasmap.year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label htmlFor="semester" className="text-sm font-medium">
              เทอมการศึกษา
            </label>
            <select
              id="semester"
              className="border rounded-md p-2.5"
              value={selectedSemester}
              onChange={onSemChange}
            >
              {YAS.find((yas) => yas.year == selectedYear)?.semesters.map(
                (sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>
        {recipientData.length !== 0 ? (
          <table>
            <thead>
              <tr>
                <th className="p-2 bg-[#E4E8DB] text-center rounded-tl-2xl">
                  รหัสนักศึกษา
                </th>
                <th className="p-2 bg-[#E4E8DB] text-center">ชื่อ-นามสกุล</th>
                <th className="p-2 bg-[#E4E8DB] text-center rounded-tr-2xl">
                  ชื่อทุนการศึกษา
                </th>
              </tr>
            </thead>
            <tbody>
              {recipientData.map((rec, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? '' : 'bg-[#F0F2ED]'}
                >
                  <td className="p-2 text-center">{rec.studentId}</td>
                  <td className="p-2 text-center">
                    {rec.firstName + ' ' + rec.lastName}
                  </td>
                  <td className="p-2 text-center">{rec.scholarName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">ยังไม่มีผู้ได้รับทุนในปีการศึกษานี้</div>
        )}
      </div>
    </div>
  );
};
export default Something;
