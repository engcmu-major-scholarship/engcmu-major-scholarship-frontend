import useOfficialPaperController from './useOfficialPaperController';
import garuda from '/garuda_emblem.png';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function DocumentForm() {
  const { formData, handleChange, formatCurrency, recipient } = useOfficialPaperController();
  
  const generatePDF = (filename: string) => {
    const pdf = new jsPDF('p', 'mm', 'a4');

    // เพิ่มโลโก้ครุฑ
    const img = new Image();
    img.src = garuda;
    pdf.addImage(img, 'PNG', 90, 10, 30, 30);

    pdf.setFont('THSarabunNew');
    pdf.setFontSize(16);

    pdf.text(formData.title || 'ประกาศ', 105, 50, { align: 'center' });
    pdf.text(`เรื่อง: ${formData.detail || '...'}`, 105, 60, { align: 'center' });
    pdf.text(`ประจำภาคการศึกษาที่ ${formData.semester || '...'} ปีการศึกษา ${formData.year || '...'}`, 105, 70, { align: 'center' });
    pdf.line(20, 75, 190, 75);

    pdf.setFontSize(14);
    pdf.text(formData.description || 'เนื้อหาประกาศ...', 20, 85, { maxWidth: 170 });

    // ใช้ autoTable และเก็บค่าตำแหน่ง Y ล่าสุด
    const table = autoTable(pdf, {
      startY: 100,
      head: [['ที่', 'ชื่อ-สกุล', 'รหัสประจำตัว', 'ทุนละ (บาท)']],
      body: recipient.map((student, index) => [
        index + 1,
        `${student.firstName} ${student.lastName}`,
        student.studentId,
        formatCurrency(student.requestAmount),
      ]),
      theme: 'grid',
      margin: { top: 10 },
    });

    const finalY = (table as any).lastAutoTable?.finalY || 120;

    pdf.text(`รวมทั้งสิ้น: ${formatCurrency(recipient.reduce((sum, s) => sum + s.requestAmount, 0))} บาท`, 20, finalY + 10);
    
    pdf.text(`ลงชื่อ: ${formData.approverName || '...'} (${formData.approverPosition || '...'})`, 130, finalY + 30);
    
    pdf.save(filename);
  };
  
  const toThaiNumber = (num: number | string) => {
    const thaiDigits = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];
    return num.toString().replace(/\d/g, (d) => thaiDigits[parseInt(d)]);
  };
  

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto font-sarabunTH -mt-4">
      <div className="flex flex-col items-center p-6 max-w-7xl mx-auto space-y-6">
        <div className="w-full bg-white p-6 shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Left Section: แก้ไขเอกสาร */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">แก้ไขเอกสาร</h2>
              <div className="space-y-4">
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="หัวข้อเอกสาร"
                />
                <input
                  name="detail"
                  value={formData.detail}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="ข้อมูลเอกสาร"
                />
                <input
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="ภาคการศึกษา"
                />
                <input
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="ปีการศึกษา"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded p-2 h-24"
                  placeholder="เนื้อหาประกาศ"
                />
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  className="w-full border rounded p-2 h-20"
                  placeholder="หมายเหตุ"
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
                <input
                  name="approverName"
                  value={formData.approverName}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="ชื่อผู้อนุมัติ"
                />
                <input
                  name="approverPosition"
                  value={formData.approverPosition}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="ตำแหน่งผู้อนุมัติ"
                />
              </div>
            </div>
            {/* Right Section: แก้ไขบันทึกข้อความ */}
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-bold mb-4">แก้ไขบันทึกข้อความ</h2>
              <div className="space-y-4">
                <input
                  name="facultySection"
                  value={formData.facultySection}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="ส่วนงาน"
                />
                <input
                  name="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="โทร"
                />
                <textarea
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="ที่"
                />
                <input
                  name="documentDate"
                  value={formData.documentDate}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="วันที่"
                />
                <input
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="เรื่อง"
                />
                <input
                  name="toApprover"
                  value={formData.toApprover}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="เรียน"
                />
                <textarea
                  name="memoDetail"
                  value={formData.memoDetail}
                  onChange={handleChange}
                  className="w-full border rounded p-2 h-24"
                  placeholder="รายละเอียดเอกสาร"
                />
                <input
                  name="memoApproverName"
                  value={formData.memoApproverName}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="ชื่อผู้อนุมัติ"
                />
                <input
                  name="memoApproverPosition"
                  value={formData.memoApproverPosition}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="ตำแหน่งผู้อนุมัติ"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Official Document Preview */}
        <div 
          className="w-full bg-white p-8 shadow-lg rounded-lg" 
          style={{
            width: '210mm', 
            height: '297mm', 
            padding: '10mm', 
          }}>
          <div className="flex justify-center items-center">
              <img src={garuda} className="w-24 h-24" alt="ครุฑ" />
          </div>
          <div className="mt-4">
            <h1 className="text-xl font-bold text-center">{toThaiNumber(formData.title) || "ประกาศ"}</h1>
            <h1 className="text-xl font-bold text-center">เรื่อง {toThaiNumber(formData.detail) || "..."}</h1>
            <h2 className="text-lg font-bold text-center mt-2">ประจำภาคการศึกษาที่ {toThaiNumber(formData.semester) || "..."} ปีการศึกษา {toThaiNumber(formData.year) || "..."}</h2>
            <div className="text-xl text-center">--------------------------------------------------------------</div>
            
            <div className="text-justify whitespace-pre-wrap break-words max-w-full overflow-hidden">
              {toThaiNumber(formData.description) || "เนื้อหาประกาศ..."}
            </div>

            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-400 p-2">ที่</th>
                    <th className="border border-gray-400 p-2">ชื่อ-สกุล</th>
                    <th className="border border-gray-400 p-2">รหัสประจำตัว</th>
                    <th className="border border-gray-400 p-2">ทุนละ (บาท)</th>
                    <th className="border border-gray-400 p-2">หลักสูตร</th>
                  </tr>
                </thead>
                <tbody>
                  {recipient.map((student, index) => (
                      <tr key={student.studentId || index}>
                        <td className="border border-gray-400 p-2 text-center">{toThaiNumber(index + 1)}</td>
                        <td className="border border-gray-400 p-2">{student.firstName} {student.lastName}</td>
                        <td className="border border-gray-400 p-2 text-center">{toThaiNumber(student.studentId)}</td>
                        <td className="border border-gray-400 p-2 text-center">{toThaiNumber(formatCurrency(student.requestAmount))}</td>
                        <td className="border border-gray-400 p-2 text-center">
                          {(() => {
                            switch (student.degress) {
                              case 'bachelor':
                                return 'ปริญญาตรี';
                              case 'master':
                                return 'ปริญญาโท';
                              case 'doctor':
                                return 'ปริญญาเอก';
                              default:
                                return student.degress;
                            }
                          })()}
                        </td>
                      </tr>
                    ))
                  } 
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="border border-gray-400 p-2 text-right font-bold">
                      รวมทั้งสิ้น
                    </td>
                    <td className="border border-gray-400 p-2 text-right font-bold">
                      {toThaiNumber(formatCurrency(recipient.reduce((sum, student) => sum + student.requestAmount, 0)))}
                    </td>
                    <td className="border border-gray-400 p-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="text-justify whitespace-pre-wrap break-words max-w-full overflow-hidden">
              {toThaiNumber(formData.additionalNotes) || "หมายเหตุ..."}
            </div>
            <div className="mt-12 text-center">
              <div className="flex justify-end mr-16">
                <div className="text-center">
                  <div>({formData.approverName || "..."})</div>
                  <div>{formData.approverPosition || "..."}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Memo Document Preview */}
        <div 
          className="w-full bg-white p-8 shadow-lg rounded-lg" 
          style={{
            width: '210mm', 
            height: '297mm', 
            padding: '10mm', 
          }}>
          <div className="ml-5 mt-5">
            <img src={garuda} className="w-20 h-20" alt="ครุฑ" />
            <h1 className="text-2xl font-semi-bold text-center -mt-7">บันทึกข้อความ</h1>
          </div>
          <div className="flex justify-between items-baseline w-full">
            <div className="flex items-baseline flex-1">
              <h1 className="text-l font-semi-bold whitespace-nowrap">ส่วนงาน</h1>
              <div className="flex-grow border-b border-dotted border-black mx-1"></div>
              <h1 className="text-l whitespace-nowrap flex">{toThaiNumber(formData.facultySection) || "..."}</h1>
              <div className="flex-grow border-b border-dotted border-black mx-1"></div>
            </div>
            <div className="flex items-baseline ml-4">
              <h1 className="text-l font-extralight whitespace-nowrap">โทร</h1>
                <h1 className="text-l whitespace-nowrap ml-1">{toThaiNumber(formData.tel) || "..."}</h1>
              <div className="border-b border-dotted border-black w-32"></div>
            </div>
          </div>
          <div className="flex items-baseline w-full mb-4">
            <div className="flex items-baseline flex-1">
              <h1 className="text-l font-semi-bold whitespace-nowrap">ที่</h1>
                <h1 className="text-l ml-1">{toThaiNumber(formData.documentNumber) || "..."}</h1>
              <div className="flex-grow border-b border-dotted border-black"></div>
            </div>
            <div className="flex items-baseline">
              <h1 className="text-l font-semi-bold whitespace-nowrap">วันที่</h1>
                <h1 className="text-l ml-1">{toThaiNumber(formData.documentDate) || "..."}</h1>
              <div className="border-b border-dotted border-black w-32"></div>
            </div>
          </div>
            <div className="flex items-baseline mb-4">
              <span className="font-semi-bold whitespace-nowrap mr-1">เรื่อง</span>
                <span className="px-1">{toThaiNumber(formData.topic) || "..."}</span>
            </div>
            <div className="w-full border-t border-dashed border-black my-4" />
            <div className="flex items-baseline mb-6">
              <span className="font-semibold whitespace-nowrap mr-1">เรียน</span>
                <span className="px-1">{toThaiNumber(formData.toApprover) || "..."}</span>
            </div>
            <div className="text-justify whitespace-pre-wrap break-words max-w-full overflow-hidden mb-8">
              {toThaiNumber(formData.memoDetail) || "..."}
            </div>
            <div className="mt-12 text-center">
              <div className="flex justify-end mr-16">
                <div className="text-center">
                  <div>({formData.memoApproverName || "..."})</div>
                  <div>{formData.memoApproverPosition || "..."}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download PDF Buttons */}
        <div className="mt-6 w-full flex justify-end space-x-4">
          <button onClick={() => generatePDF('ประกาศ.pdf')} className="bg-[#dbe9ea] text-black py-3 px-8 text-lg rounded-2xl">
            ดาวน์โหลด PDF
          </button>
        </div>
      </div>
  );
}