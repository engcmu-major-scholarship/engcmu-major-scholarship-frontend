import useConsiderController from './useConsiderController';

const Consider = () => {
  const {
    filteredConsiders,
    YAS,
    selectedSemester,
    selectedYear,
    allScholarships,
    selectedScholarship,
    setSelectedScholarship,
    onYearChange,
    onSemChange,
  } = useConsiderController();

  return (
    <div className="flex flex-col px-24 py-4 gap-4">
      <div className="flex flex-row gap-2 w-full my-4 text-xl">
        <span>
          <svg
            width="30"
            height="30"
            viewBox="0 0 26 26"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.5833 18.4166V20.5833H7.58325V18.4166C7.58325 18.4166 7.58325 14.0833 14.0833 14.0833C20.5833 14.0833 20.5833 18.4166 20.5833 18.4166ZM17.3333 8.66663C17.3333 8.02384 17.1426 7.39548 16.7855 6.86102C16.4284 6.32656 15.9208 5.91 15.327 5.66402C14.7331 5.41803 14.0796 5.35367 13.4492 5.47908C12.8188 5.60448 12.2397 5.91401 11.7852 6.36853C11.3306 6.82305 11.0211 7.40215 10.8957 8.03258C10.7703 8.66302 10.8347 9.31649 11.0806 9.91035C11.3266 10.5042 11.7432 11.0118 12.2776 11.3689C12.8121 11.726 13.4405 11.9166 14.0833 11.9166C14.9452 11.9166 15.7719 11.5742 16.3813 10.9647C16.9908 10.3552 17.3333 9.52858 17.3333 8.66663ZM20.7999 14.1483C21.3921 14.6946 21.8695 15.3534 22.2043 16.0863C22.5391 16.8191 22.7246 17.6113 22.7499 18.4166V20.5833H25.9999V18.4166C25.9999 18.4166 25.9999 14.6791 20.7999 14.1483ZM19.4999 5.41663C19.1726 5.41665 18.8473 5.46782 18.5358 5.56829C19.1696 6.47718 19.5094 7.55858 19.5094 8.66663C19.5094 9.77468 19.1696 10.8561 18.5358 11.765C18.8473 11.8654 19.1726 11.9166 19.4999 11.9166C20.3619 11.9166 21.1885 11.5742 21.798 10.9647C22.4075 10.3552 22.7499 9.52858 22.7499 8.66663C22.7499 7.80467 22.4075 6.97802 21.798 6.36853C21.1885 5.75904 20.3619 5.41663 19.4999 5.41663ZM7.95158 9.66329L9.20825 11.1908L4.06242 16.3366L1.08325 13.0866L2.33992 11.83L4.06242 13.5416L7.95158 9.66329Z" />
          </svg>
        </span>
        <span>รายชื่อผู้สมัครทุน</span>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col w-1/4 gap-2">
          <label htmlFor="scholar" className="text-sm font-medium">
            ทุนการศึกษา
          </label>
          <select
            id="scholar"
            className="border rounded-md p-2.5"
            value={selectedScholarship ?? '-'}
            onChange={(e) =>
              setSelectedScholarship(
                e.target.value === '-' ? null : e.target.value,
              )
            }
          >
            <option value="-">-</option>
            {allScholarships.map((scholarship) => (
              <option key={scholarship} value={scholarship}>
                {scholarship}
              </option>
            ))}
          </select>
        </div>
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
      {filteredConsiders.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th className="p-2 bg-[#E4E8DB] text-center rounded-tl-2xl">
                รหัสนักศึกษา
              </th>
              <th className="p-2 bg-[#E4E8DB] text-center">ชื่อ-นามสกุล</th>
              <th className="p-2 bg-[#E4E8DB] text-center">ชื่อทุนการศึกษา</th>
              <th className="p-2 bg-[#E4E8DB] text-center rounded-tr-2xl">
                จำนวนเงินทุนที่จะได้รับ
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredConsiders.map((rec, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : 'bg-[#F0F2ED]'}>
                <td className="p-2 text-center">{rec.studentId}</td>
                <td className="p-2 text-center">
                  {rec.firstName + ' ' + rec.lastName}
                </td>
                <td className="p-2 text-center">{rec.scholarName}</td>
                <td className="p-2 text-center">
                  {(rec.defaultAmount
                    ? rec.defaultAmount
                    : rec.requestAmount
                  )?.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">ยังไม่มีผู้ได้รับทุนในปีการศึกษานี้</div>
      )}
    </div>
  );
};

export default Consider;
