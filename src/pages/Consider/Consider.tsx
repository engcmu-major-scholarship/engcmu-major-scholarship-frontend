import Modal from '../../components/Modal';
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
    modalConsider,
    modalApp,
    modalScholarshipData,
    modalStudentData,
    comments,
    setComments,
    handleDocCheckClick,
    onApproveClick,
    closeModal,
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
            {YAS.find((yas) => yas.year === selectedYear)?.semesters.map(
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
              <th className="p-2 bg-[#E4E8DB] text-center">
                จำนวนเงินทุนที่จะได้รับ
              </th>
              <th className="p-2 bg-[#E4E8DB] text-center rounded-tr-2xl">
                ดูใบสมัคร
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
                <td className="p-2">
                  <div className="flex justify-center">
                    <button
                      title="ดูใบสมัคร"
                      type="button"
                      className="flex justify-center cursor-pointer"
                      onClick={() =>
                        handleDocCheckClick(rec.appId, rec.studentId)
                      }
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.25 2.5C14.25 2.4337 14.2237 2.37011 14.1768 2.32322C14.1299 2.27634 14.0663 2.25 14 2.25H7C6.27065 2.25 5.57118 2.53973 5.05546 3.05546C4.53973 3.57118 4.25 4.27065 4.25 5V19C4.25 19.7293 4.53973 20.4288 5.05546 20.9445C5.57118 21.4603 6.27065 21.75 7 21.75H17C17.7293 21.75 18.4288 21.4603 18.9445 20.9445C19.4603 20.4288 19.75 19.7293 19.75 19V9.147C19.75 9.0807 19.7237 9.01711 19.6768 8.97022C19.6299 8.92334 19.5663 8.897 19.5 8.897H15C14.8011 8.897 14.6103 8.81798 14.4697 8.67733C14.329 8.53668 14.25 8.34591 14.25 8.147V2.5ZM15 12.25C15.1989 12.25 15.3897 12.329 15.5303 12.4697C15.671 12.6103 15.75 12.8011 15.75 13C15.75 13.1989 15.671 13.3897 15.5303 13.5303C15.3897 13.671 15.1989 13.75 15 13.75H9C8.80109 13.75 8.61032 13.671 8.46967 13.5303C8.32902 13.3897 8.25 13.1989 8.25 13C8.25 12.8011 8.32902 12.6103 8.46967 12.4697C8.61032 12.329 8.80109 12.25 9 12.25H15ZM15 16.25C15.1989 16.25 15.3897 16.329 15.5303 16.4697C15.671 16.6103 15.75 16.8011 15.75 17C15.75 17.1989 15.671 17.3897 15.5303 17.5303C15.3897 17.671 15.1989 17.75 15 17.75H9C8.80109 17.75 8.61032 17.671 8.46967 17.5303C8.32902 17.3897 8.25 17.1989 8.25 17C8.25 16.8011 8.32902 16.6103 8.46967 16.4697C8.61032 16.329 8.80109 16.25 9 16.25H15Z"
                          fill="black"
                        />
                        <path
                          d="M15.75 2.82396C15.75 2.63996 15.943 2.52296 16.086 2.63796C16.2073 2.73596 16.315 2.84996 16.409 2.97996L19.422 7.17696C19.49 7.27296 19.416 7.39696 19.298 7.39696H16C15.9337 7.39696 15.8701 7.37062 15.8232 7.32373C15.7763 7.27685 15.75 7.21326 15.75 7.14696V2.82396Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">ยังไม่มีผู้ได้รับทุนในปีการศึกษานี้</div>
      )}
      {modalConsider &&
        modalApp &&
        modalScholarshipData &&
        modalStudentData && (
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
                          {modalConsider.firstName +
                            ' ' +
                            modalConsider.lastName}
                        </td>
                      </tr>
                      <tr>
                        <td>รหัสนักศึกษา</td>
                        <td className="text-gray-600">
                          {modalConsider.studentId}
                        </td>
                      </tr>
                      <tr>
                        <td>อาจารย์ที่ปรึกษา</td>
                        <td className="text-gray-600">
                          {modalStudentData.advisorName ?? '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>ทุนที่สมัคร</td>
                        <td>{modalScholarshipData.name}</td>
                      </tr>
                      <tr>
                        <td className="flex flex-row gap-2 text-[#345814] items-center">
                          <span
                            className="hover:underline cursor-pointer"
                            onClick={() => window.open(modalApp.doc, '_blank')}
                          >
                            ดูใบสมัคร
                          </span>
                          <span>
                            <div className="flex items-center">
                              <button
                                title="open doc in new tab"
                                type="button"
                                className="cursor-pointer"
                                onClick={() =>
                                  window.open(modalApp.doc, '_blank')
                                }
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.6665 2.66675H3.99984C3.64622 2.66675 3.30708 2.80722 3.05703 3.05727C2.80698 3.30732 2.6665 3.64646 2.6665 4.00008V12.0001C2.6665 12.3537 2.80698 12.6928 3.05703 12.9429C3.30708 13.1929 3.64622 13.3334 3.99984 13.3334H11.9998C12.3535 13.3334 12.6926 13.1929 12.9426 12.9429C13.1927 12.6928 13.3332 12.3537 13.3332 12.0001V9.33341M7.99984 8.00008L13.3332 2.66675M13.3332 2.66675V6.00008M13.3332 2.66675H9.99984"
                                    stroke="#345814"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </span>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <div className="flex flex-col w-full gap-2">
                      <label htmlFor="comments" className="text-sm font-medium">
                        ความคิดเห็น
                      </label>
                      <textarea
                        id="comments"
                        className="border-2 text-sm rounded-lg w-full h-40 p-2.5"
                        value={comments ?? ''}
                        onChange={(e) =>
                          setComments(
                            e.target.value === '' ? null : e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
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
                  <button
                    type="button"
                    className="bg-[#E4E8DB] py-3 px-5 rounded-2xl cursor-pointer hover:bg-[#D1D5C8]"
                    onClick={onApproveClick}
                  >
                    อนุมัติ
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
    </div>
  );
};

export default Consider;
