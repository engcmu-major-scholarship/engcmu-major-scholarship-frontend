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

const ConsiderScholarship = () => {
  const { applications } = useConsiderScholarshipController();
  const { scholarships } = useConsiderScholarshipController();

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
            {scholarships.map((scholarship, index) => (
              <option key={index} value={scholarship.name}>
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
              เคยสมัครทุนไปรึยัง
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
          {/* {searchResults.map((scholarship, index) => (
                      <div
                        key={index}
                        className="flex flex-col w-full p-12 gap-2 bg-[#e4f0f1] rounded-lg"
                      >
    
                        <div className="text-xl font-bold">{scholarship.name}</div>
                        <div className="text">{scholarship.description}</div>
                        <div className="flex justify-end">
                          <button
                            className="underline"
                            onClick={() =>
                              navigate(`${Path.SCHOLARSHIP}/${scholarship.id}`)
                            }
                          >
                            ดูรายละเอียดทุน
                          </button>
                        </div>
                      </div>
                    ))} */}
          {applications.map((application, index) => (
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
                {/* {application.semester.year.year} */}
                2566
              </td>
              <td style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
                {application.requestAmount}
              </td>
              <td style={{ padding: '10px', border: '1px solid #FFFFFF' }}>
                ข้อมูลจากไหน
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
                    checked={application.adminApprovalTime ? true : false}
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
