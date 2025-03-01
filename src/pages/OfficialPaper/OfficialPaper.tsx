import { useOfficialPaperController } from "./useOfficialPaperController";
import garuda from '/garuda_emblem.png'

export default function DocumentForm() {
  const { formData, handleChange } = useOfficialPaperController();

  return (
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
                name="number"
                value={formData.documentNumber}
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
      <div className="w-full bg-white p-8 shadow-lg rounded-lg">
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

          <div className="text-center mt-12">
            <p>ประกาศ ณ วันที่ {formData.date ? new Date(formData.date).toLocaleDateString("th-TH") : "..."}</p>
            <div className="mt-8">
              <p>({formData.approverName || "..."})</p>
              <p>{formData.approverPosition || "..."}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Memo Document Preview */}
      <div className="w-full bg-white p-8 shadow-lg rounded-lg">
        <div className="ml-5 mt-5">
          <img src={garuda} className="w-20 h-20" />
          <h1 className="text-3xl font-bold text-center -mt-7">บันทึกข้อความ</h1>
        </div>
          <div className="flex items-baseline mb-4">
            <span className="font-bold whitespace-nowrap">ส่วนงาน</span>
            <div className="flex-grow mx-2 border-b border-dotted border-black">
              <span className="px-1">{formData.facultySection}</span>
            </div>
            <span className="whitespace-nowrap">โทร</span>
            <div className="w-32 ml-2 border-b border-dotted border-black">
              <span className="px-1">{formData.tel}</span>
            </div>
          </div>
          <div className="flex items-baseline mb-4">
            <span className="font-bold whitespace-nowrap mr-1">ที่</span>
            <div className="w-40 border-b border-dotted border-black">
              <span className="px-1">{formData.documentNumber}</span>
            </div>
            <div className="flex-grow mx-2"></div>
            <span className="whitespace-nowrap">วันที่</span>
            <div className="w-48 ml-2 border-b border-dotted border-black">
              <span className="px-1">{formData.documentDate}</span>
            </div>
          </div>
          <div className="flex items-baseline mb-4">
            <span className="font-bold whitespace-nowrap mr-1">เรื่อง</span>
            <div className="flex-grow border-b border-dotted border-black">
              <span className="px-1">{formData.topic}</span>
            </div>
          </div>
          <hr className="w-full border-t border-dashed border-black my-4" />
          <div className="flex items-baseline mb-6">
            <span className="font-bold whitespace-nowrap mr-1">เรียน</span>
            <div className="flex-grow border-b border-dotted border-black">
              <span className="px-1">{formData.toApprover}</span>
            </div>
          </div>
          <div className="text-justify whitespace-pre-wrap break-words max-w-full overflow-hidden mb-8">
            {formData.memoDetail || formData.description}
          </div>
          <div className="mt-12 text-center">
            <div className="flex justify-end mr-16">
              <div className="text-center">
                <div className="mb-16">({formData.memoApproverName})</div>
                <div>{formData.memoApproverPosition}</div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}