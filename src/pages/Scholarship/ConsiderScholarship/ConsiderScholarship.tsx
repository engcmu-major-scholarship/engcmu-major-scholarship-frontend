import { useContext } from 'react';
import useConsiderScholarshipController from './useConsiderScholarshipController';
import { RolesBaseAccessContext } from '../../../contexts/RolesBaseAccessContext';
import { useNavigate } from 'react-router';
import { Path } from '../../../constants/Path';
import { createCMUAccountSignInUrl } from '../../../utils/handleCMUAccountSignIn';
import './toggle.css';
import { filterApplicationsByScholarshipName } from './useConsiderScholarshipController';
import React, { useState } from 'react';

const ConsiderScholarship = () => {
  const { filterResults, scholarships, filterText, setFilterText } =
    useConsiderScholarshipController();

  const { accessibles } = useContext(RolesBaseAccessContext);
  const navigate = useNavigate();

  const [selectedScholarship, setSelectedScholarship] = useState('');

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

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
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{
              width: '225px',
            }}
          >
            <option value="">-- Select Scholarship --</option>
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
                    checked={application.adminApproveTime ? true : false}
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
                {application.approvalComment ? (
                  <>
                    <button
                      style={{
                        padding: '5px 10px',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={togglePopup}
                    >
                      📝
                    </button>

                    {/* ป๊อปอัพสำหรับแสดง approvalComment */}
                    {showPopup && (
                      <div
                        style={{
                          position: 'fixed',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: '#fff',
                          padding: '20px',
                          borderRadius: '8px',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                          zIndex: 1000,
                        }}
                      >
                        <h3
                          style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#007BFF',
                            textAlign: 'center',
                            textDecoration: 'underline',
                          }}
                        >
                          Approval Comment
                        </h3>
                        <p>{application.approvalComment}</p>
                        <button
                          style={{
                            marginTop: '10px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            border: 'none',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            borderRadius: '5px',
                          }}
                          onClick={togglePopup}
                        >
                          Close
                        </button>
                      </div>
                    )}
                    {/* Background overlay */}
                    {showPopup && (
                      <div
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          zIndex: 999,
                        }}
                        onClick={togglePopup}
                      ></div>
                    )}
                  </>
                ) : (
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
                )}
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
