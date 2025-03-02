import { useOfficialPaperController } from "./useOfficialPaperController";
import garuda from '/garuda_emblem.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from "react";

export default function DocumentForm() {
  const { formData, handleChange } = useOfficialPaperController();
  const pdfRef = useRef<HTMLDivElement | null>(null);

  const downloadPDF = () => {
    const input = pdfRef.current;
    if (!input) {
      console.log("pdfRef is not available");
      return;
    }
    
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // 'mm' for millimeters, 'a4' for the page size
  
      // Get the dimensions of the A4 page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      // Calculate the scaling factor
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
  
      // Calculate the X and Y position for centering the image on the page
      const imgX = (pdfWidth - canvasWidth * ratio) / 2;
      const imgY = (pdfHeight - canvasHeight * ratio) / 2;
  
      // Add the image to the PDF with the correct dimensions
      pdf.addImage(imgData, 'PNG', imgX, imgY, canvasWidth * ratio, canvasHeight * ratio);
  
      // Save the PDF
      pdf.save('เบิกเงินโครงการ');
    });
  };

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto font-sarabunTH">
      <div className="flex flex-col items-center p-6 max-w-7xl mx-auto space-y-6">
        <div className="w-full bg-white p-6 shadow-lg rounded-lg">
          <div className="flex space-x-8">
            {/* Left Section: แก้ไขเอกสาร */}
            <div className="w-1/2">
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
            <div className="w-1/2">
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
                  className="w-full border rounded p-2"
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
          ref={pdfRef}
          style={{
            width: '210mm', 
            height: '297mm', 
            padding: '10mm', 
          }}>
          <div className="flex justify-center items-center">
              <img src={garuda} className="w-24 h-24" />
          </div>
          <div className="mt-4">
            <h1 className="text-xl font-bold text-center">{formData.title || "ประกาศ"}</h1>
            <h1 className="text-xl font-bold text-center">เรื่อง {formData.detail || "..."}</h1>
            <h2 className="text-lg font-bold text-center mt-2">ประจำภาคการศึกษาที่ {formData.semester || "..."} ปีการศึกษา {formData.year || "..."}</h2>
            <div className="text-xl text-center">--------------------------------------------------------------</div>
            
            <div className="text-justify whitespace-pre-wrap break-words max-w-full overflow-hidden">
              {formData.description || "เนื้อหาประกาศ..."}
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
                  {formData.students && formData.students.map((student, index) => (
                    <tr key={student.id || index}>
                      <td className="border border-gray-400 p-2 text-center">{index + 1}</td>
                      <td className="border border-gray-400 p-2">{student.name}</td>
                      <td className="border border-gray-400 p-2 text-center">{student.studentId}</td>
                      <td className="border border-gray-400 p-2 text-center">{student.amount}</td>
                      <td className="border border-gray-400 p-2 text-center">{student.degree}</td>
                    </tr>
                  ))}
                  {(!formData.students || formData.students.length === 0) && (
                    <tr>
                      <td colSpan={5} className="border border-gray-400 p-2 text-center">ไม่มีข้อมูล</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="border border-gray-400 p-2 text-right font-bold">
                      รวมทั้งสิ้น
                    </td>
                    <td className="border border-gray-400 p-2 text-center font-bold">
                      {formData.totalAmount || 0}
                    </td>
                    <td className="border border-gray-400 p-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="text-justify whitespace-pre-wrap break-words max-w-full overflow-hidden">
              {formData.additionalNotes || "หมายเหตุ..."}
            </div>
            <div className="mt-12 text-center">
              <div className="flex justify-end mr-16">
                <div className="text-center">
                  <div>({formData.approverName})</div>
                  <div>{formData.approverPosition}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Memo Document Preview */}
        <div 
          className="w-full bg-white p-8 shadow-lg rounded-lg" 
          ref={pdfRef}
          style={{
            width: '210mm', 
            height: '297mm', 
            padding: '10mm', 
          }}>
          <div className="ml-5 mt-5">
            <img src={garuda} className="w-20 h-20" />
            <h1 className="text-2xl font-semi-bold text-center -mt-7">บันทึกข้อความ</h1>
          </div>
          <div className="flex justify-between items-baseline w-full">
            <div className="flex items-baseline flex-1">
              <h1 className="text-l font-semi-bold whitespace-nowrap">ส่วนงาน</h1>
              <div className="flex-grow border-b border-dotted border-black "></div>
              <h1 className="text-l whitespace-nowrap flex">{formData.facultySection}</h1>
              <div className="flex-grow border-b border-dotted border-black "></div>
            </div>
            <div className="flex items-baseline ml-4">
              <h1 className="text-l font-extralight whitespace-nowrap">โทร</h1>
                <h1 className="text-l whitespace-nowrap ml-1">{formData.tel}</h1>
              <div className="border-b border-dotted border-black w-32"></div>
            </div>
          </div>
          <div className="flex items-baseline w-full mb-4">
            <div className="flex items-baseline flex-1">
              <h1 className="text-l font-semi-bold whitespace-nowrap">ที่</h1>
                <h1 className="text-l ml-1">{formData.documentNumber}</h1>
              <div className="flex-grow border-b border-dotted border-black"></div>
            </div>
            <div className="flex items-baseline">
              <h1 className="text-l font-semi-bold whitespace-nowrap">วันที่</h1>
                <h1 className="text-l ml-1">{formData.documentDate}</h1>
              <div className="border-b border-dotted border-black w-32"></div>
            </div>
          </div>
            <div className="flex items-baseline mb-4">
              <span className="font-semi-bold whitespace-nowrap mr-1">เรื่อง</span>
                <span className="px-1">{formData.topic}</span>
            </div>
            <div className="w-full border-t border-dashed border-black my-4" />
            <div className="flex items-baseline mb-6">
              <span className="font-semibold whitespace-nowrap mr-1">เรียน</span>
                <span className="px-1">{formData.toApprover}</span>
            </div>
            <div className="text-justify whitespace-pre-wrap break-words max-w-full overflow-hidden mb-8">
              {formData.memoDetail }
            </div>
            <div className="mt-12 text-center">
              <div className="flex justify-end mr-16">
                <div className="text-center">
                  <div>({formData.memoApproverName})</div>
                  <div>{formData.memoApproverPosition}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download PDF Button */}
        <div className="mt-6">
          <button 
            onClick={downloadPDF}
            className="bg-[#dbe9ea] text-black py-3 px-8 text-lg rounded-2xl">
            ดาวน์โหลด PDF
          </button>
        </div>
      </div>
  );
}
