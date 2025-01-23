import { useContext } from 'react';
import useConsiderScholarshipController from './useConsiderScholarshipController';
import { RolesBaseAccessContext } from '../../../contexts/RolesBaseAccessContext';
import { useNavigate } from 'react-router';
import { Path } from '../../../constants/Path';
import { createCMUAccountSignInUrl } from '../../../utils/handleCMUAccountSignIn';
import './toggle.css';

const studentData = [
  {
    id: '650610xxx',
    name: 'ทดสอบ ก่อนวันจริง',
    scholarship: 'Research Assistant (RA)',
    year: '2/2567',
    amount: '2,000',
    approve: false,
  },
  {
    id: '650610yyy',
    name: 'สมชาย ใจดี',
    scholarship: 'Teaching Assistant (TA)',
    year: '2/2567',
    amount: '3,000',
    approve: true,
  },
  // เพิ่มข้อมูลตามต้องการ
];
interface Student {
  approve: boolean;
}

const ConsiderScholarship = () => {
  useConsiderScholarshipController();
  const { accessibles } = useContext(RolesBaseAccessContext);
  const navigate = useNavigate();

  // ฟังก์ชันสำหรับเปลี่ยนค่า approve เมื่อสวิตช์ถูกคลิก
  // const handleSwitchChange = () => {
  //   // อัปเดตค่า approve ผ่านฟังก์ชันที่มาจาก props
  //   updateStudentApprove(!student.approve);
  // };
  return (
    <div>
      <div
        style={{
          display: 'flex',
          marginLeft: '205px',
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
            marginTop: '100px',
          }}
        >
          <select
            // value={selectedCar}
            // onChange={handleCarChange}
            style={{
              width: '225px',
            }}
          >
            <option value="ทุน">ทุน</option>
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
            marginTop: '100px',
          }}
        >
          <select
            // value={selectedCar}
            // onChange={handleCarChange}
            style={{
              width: '225px',
            }}
          >
            <option value="ปีการศึกษา">ปีการศึกษา</option>
          </select>
        </div>
      </div>
      <table
        style={{
          marginLeft: '205px',
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
              ดูข้อมูล
            </th>
            <th style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
              สถานะ
            </th>
            <th style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
              Comment
            </th>
          </tr>
        </thead>
        <tbody>
          {/* เพิ่มข้อมูลในส่วนนี้ */}
          {studentData.map((student, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#DBE9EA', // สีพื้นหลังสำหรับเลขคู่และเลขคี่
              }}
            >
              <td style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
                {student.id}
              </td>
              <td style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
                {student.name}
              </td>
              <td style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
                {student.scholarship}
              </td>
              <td style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
                {student.year}
              </td>
              <td style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
                {student.amount}
              </td>
              <td
                style={{
                  padding: '10px',
                  border: '1px solid #FFFFFF',
                  textAlign: 'center',
                }}
              >
                <button
                  style={{
                    padding: '5px 10px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                  }}
                >
                  👁
                </button>
              </td>
              <td
                style={{
                  padding: '10px',
                  border: '1px solid #FFFFFF',
                  textAlign: 'center',
                }}
              >
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={student.approve} // ใช้ค่าจาก props เพื่อควบคุมสถานะของสวิตช์
                    // onChange={handleSwitchChange} // ฟังก์ชันที่จะเปลี่ยนแปลงค่า approve
                  />
                  <span className="slider round"></span>
                </label>
              </td>

              <td
                style={{
                  padding: '10px',
                  border: '1px solid #FFFFFF',
                  textAlign: 'center',
                }}
              >
                <button
                  style={{
                    padding: '5px 10px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                  }}
                >
                  ➕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    // </div>
  );
};

export default ConsiderScholarship;
