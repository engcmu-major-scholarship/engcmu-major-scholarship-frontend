import useConsiderScholarshipController from './useConsiderScholarshipController';
import './toggle.css';
import React, { useState } from 'react';
import { ApplicationInfo } from './useConsiderScholarshipController';

const ConsiderScholarship = () => {
  const {
    scholarships,
    filterResults,
    filterText,
    setFilterText,
    yearSemesters,
    currentYearSemester,
    selectedYearSemester,
    setSelectedYearSemester,
    approveApplication,
  } = useConsiderScholarshipController();

  const [popupApplication, setPopupApplication] =
    useState<ApplicationInfo | null>(null);
  const [comment, setComment] = useState('');

  const togglePopup = (appId: number | null) => {
    if (appId === null) {
      setPopupApplication(null);
      console.log('null!');
      return;
    }

    const selectedApp =
      filterResults.find((app) => app.appId === appId) || null;
    setPopupApplication(selectedApp);
    setComment(''); // รีเซ็ตคอมเม้นท์เมื่อเปิด popup ใหม่
  };

  const [selectedYear, setSelectedYear] = useState<number>(
    currentYearSemester?.year ?? 2567,
  );
  const [selectedSemester, setSelectedSemester] = useState<number>(
    currentYearSemester?.semester ?? 2,
  );

  const handleApproveWithConfirmation = () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to approve this application?',
    );
    if (isConfirmed) {
      handleApprove(); // ถ้ายืนยันแล้วให้เรียก handleApprove
    }
  };

  const handleApprove = async () => {
    if (popupApplication && popupApplication.appId) {
      try {
        togglePopup(null); // ปิด popup เมื่ออนุมัติสำเร็จ
        await approveApplication(popupApplication.appId, comment);
        window.alert('✅ Application approved successfully!'); // แสดง alert
      } catch (error) {
        window.alert('❌ Failed to approve application'); // ถ้า error
      }
    } else {
      window.alert('no application'); // ถ้าคอมเมนต์ว่าง
    }
  };

  return (
    <div>
      <h1
        style={{
          display: 'flex',
          marginLeft: '150px',
          fontSize: '36px',
          marginBottom: '0px',
          marginTop: '100px',
        }}
      >
        👥อนุมัติทุน
      </h1>

      <div
        style={{
          display: 'flex',
          marginLeft: '150px',
        }}
      >
        <div
          style={{
            // display: 'flex',
            padding: '10px',
            width: '249px',
            border: '2px solid black', // กำหนดกรอบ
            borderRadius: '50px', // ทำให้ขอบเป็นวงร

            marginBottom: '30px',
            marginTop: '10px',
          }}
        >
          <select
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{
              width: '225px',
            }}
          >
            <option value="">-- Select Scholarship --</option>
            {/* {scholarships.map((scholarship, index) => (
              <option key={index} value={scholarship.name}>
                {scholarship.name}
              </option> */}
            {scholarships.map((scholarship) => (
              <option key={scholarship.id} value={scholarship.name}>
                {scholarship.name}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            // display: 'flex',
            padding: '10px',
            width: '249px',
            border: '2px solid black', // กำหนดกรอบ
            borderRadius: '50px', // ทำให้ขอบเป็นวงร
            marginLeft: '50px',
            marginBottom: '30px',
            marginTop: '10px',
          }}
        >
          <select
            value={`${selectedYear}/${selectedSemester}`}
            onChange={(e) => {
              const [year, semester] = e.target.value.split('/').map(Number);
              setSelectedYear(year);
              setSelectedSemester(semester);
              setSelectedYearSemester({ year, semester });
            }}
            style={{ width: '225px' }}
          >
            {yearSemesters.map((ys) =>
              ys.semesters.map((semester) => (
                <option
                  key={`${ys.year}/${semester}`}
                  value={`${ys.year}/${semester}`}
                >
                  {ys.year}/{semester}
                </option>
              )),
            )}
          </select>
        </div>
      </div>
      <table
        style={{
          marginLeft: '150px',
          width: '100%',
          height: '100px',
          borderCollapse: 'collapse',
          fontFamily: 'Arial, sans-serif',
          border: '2px solid #FFFFFF',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#B7CDCF', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
              รหัสนักศึกษา
            </th>
            <th style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
              ชื่อ-นามสกุล
            </th>
            <th style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
              ทุน
            </th>
            <th style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
              ปีการศึกษา
            </th>
            <th style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
              จำนวนทุนที่ขอ
            </th>
            <th style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
              เคยสมัครทุนแล้ว
            </th>
            <th style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
              ดูข้อมูล
            </th>
          </tr>
        </thead>
        <tbody>
          {filterResults.map((application, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#DBE9EA', // สีพื้นหลังสำหรับเลขคู่และเลขคี่
              }}
            >
              <td style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
                {application.studentId}
              </td>
              <td style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
                {application.firstName + ' ' + application.lastName}
              </td>
              <td style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
                {application.scholarName}
              </td>
              <td style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
                {selectedYear}/{selectedSemester}
              </td>
              <td style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
                {application.requestAmount}
              </td>
              <td style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
                {application.isFirstTime === true ? 'No' : 'Yes'}
              </td>
              <td
                style={{
                  padding: '10px',
                  border: '1px solid #FFFFFF',
                  textAlign: 'center',
                }}
              >
                <button onClick={() => togglePopup(application.appId)}>
                  👁
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup */}
      {popupApplication && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
            borderRadius: '10px',
            width: '1100px',
          }}
        >
          <h1
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'center',
              textAlign: 'center',
              // marginLeft: '10px',
              fontSize: '36px',
              marginBottom: '10px',
              marginTop: '10px',
            }}
          >
            ข้อมูลใบสมัคร
          </h1>
          <p>
            <strong>รหัสนักศึกษา:</strong> {popupApplication.studentId}
          </p>
          <p>
            <strong>ชื่อ-นามสกุล:</strong> {popupApplication.firstName}{' '}
            {popupApplication.lastName}
          </p>
          <p>
            <strong>ทุน:</strong> {popupApplication.scholarName}
          </p>
          {/* <p>
            <strong>อาจารย์ที่ปรึกษา</strong> {popupApplication.scholarName}
          </p> */}
          <p>
            <strong>ปีการศึกษา:</strong>{' '}
            {selectedYearSemester
              ? `${selectedYearSemester.year}/${selectedYearSemester.semester}`
              : 'N/A'}
          </p>
          <p>
            <strong>จำนวนทุนที่ขอ:</strong> {popupApplication.requestAmount}
          </p>
          <p>
            <strong>เคยสมัครทุนแล้ว:</strong>{' '}
            {popupApplication.isFirstTime ? 'No' : 'Yes'}
          </p>

          <button
            onClick={() => {
              if (popupApplication?.docLink) {
                window.open(popupApplication.docLink, '_blank');
              } else {
                alert('Document link is not available.');
              }
            }}
          >
            <p>
              <strong style={{ color: '#345814' }}>ใบสมัครทุน🔗</strong>
            </p>
          </button>

          <textarea
            placeholder="เพิ่มคอมเมนต์..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              width: '100%',
              height: '150px',
              marginTop: '10px',
              border: '1px solid #000000', // กำหนดกรอบเป็นสีเทา
              borderRadius: '5px', // ทำให้มุมกลม
              padding: '10px', // เพิ่ม padding ข้างใน
              fontSize: '16px', // ปรับขนาดตัวอักษรให้ชัดเจน
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}
          >
            <button
              onClick={() => togglePopup(null)}
              style={{
                backgroundColor: '#F8D2C7',
                padding: '10px',
                borderRadius: '10px',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleApproveWithConfirmation}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px',
                borderRadius: '10px',
              }}
            >
              Approve
            </button>
          </div>
        </div>
      )}
    </div>

    // </div>
  );
};

export default ConsiderScholarship;
