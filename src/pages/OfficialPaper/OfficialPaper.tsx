import { useOfficialPaperController } from "./useOfficialPaperController";
import garuda from '/garuda_emblem.png'
export default function DocumentForm() {
  const { formData, handleChange } = useOfficialPaperController();

  return (
    <div className="flex flex-col items-center p-6 max-w-7xl mx-auto space-y-6">

      <div className="w-full bg-white p-6 shadow-lg rounded-lg">
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
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-2 h-24"
            placeholder="เนื้อหาประกาศ"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            name="approver"
            value={formData.approver}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="ชื่อผู้อนุมัติ"
          />
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            className="w-full border rounded p-2 h-20"
            placeholder="หมายเหตุ"
          />
        </div>
      </div>

      <div className="w-full bg-white p-8 shadow-lg rounded-lg">
        <div className="flex justify-center items-center">
            <img src={garuda} className="size-30" />
        </div>
        <h1 className="text-xl font-bold text-center">{formData.title}</h1>
        <h1 className="text-xl font-bold text-center">เรื่อง {formData.detail}</h1>
        <h2 className="text-lg font-bold text-center">{formData.semester}</h2>
        <div className="border-b border-gray-400 w-full my-4"></div>
        <p className="text-justify">{formData.description}</p>

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
              {formData.students.map((student: any, index: number) => ( // ✅ กำหนด Type
                <tr key={student.id}>
                  <td className="border border-gray-400 p-2 text-center">{index + 1}</td>
                  <td className="border border-gray-400 p-2">{student.name}</td>
                  <td className="border border-gray-400 p-2 text-center">{student.studentId}</td>
                  <td className="border border-gray-400 p-2 text-center">{student.amount}</td>
                  <td className="border border-gray-400 p-2 text-center">{student.degree}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="border border-gray-400 p-2 text-right font-bold">
                  รวมทั้งสิ้น
                </td>
                <td className="border border-gray-400 p-2 text-center font-bold">
                  {formData.totalAmount}
                </td>
                <td className="border border-gray-400 p-2"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <pre className="text-justify">{formData.additionalNotes}</pre>

        <div className="text-center mt-12">
          <p>ประกาศ ณ วันที่ {new Date(formData.date).toLocaleDateString("th-TH")}</p>
          <div className="mt-8">
            <p>({formData.approver})</p>
            <p>คณบดีคณะวิศวกรรมศาสตร์</p>
          </div>
        </div>

        <div className="mt-16 text-center text-lg font-bold">สำเนา</div>
        
        <h1 className="text-xl font-bold text-center">{formData.title}</h1>
        <h1 className="text-xl font-bold text-center">เรื่อง {formData.detail}</h1>
        <h2 className="text-lg font-bold text-center">{formData.semester}</h2>
        <div className="border-b border-gray-400 w-full my-4"></div>
        <p className="text-justify">{formData.description}</p>

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
              {formData.students.map((student: any, index: number) => ( // ✅ กำหนด Type
                <tr key={student.id}>
                  <td className="border border-gray-400 p-2 text-center">{index + 1}</td>
                  <td className="border border-gray-400 p-2">{student.name}</td>
                  <td className="border border-gray-400 p-2 text-center">{student.studentId}</td>
                  <td className="border border-gray-400 p-2 text-center">{student.amount}</td>
                  <td className="border border-gray-400 p-2 text-center">{student.degree}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="border border-gray-400 p-2 text-right font-bold">
                  รวมทั้งสิ้น
                </td>
                <td className="border border-gray-400 p-2 text-center font-bold">
                  {formData.totalAmount}
                </td>
                <td className="border border-gray-400 p-2"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <pre className="text-justify">{formData.additionalNotes}</pre>

        <div className="text-center mt-12">
          <p>ประกาศ ณ วันที่ {new Date(formData.date).toLocaleDateString("th-TH")}</p>
          <div className="mt-8">
            <p>({formData.approver})</p>
            <p>คณบดีคณะวิศวกรรมศาสตร์</p>
          </div>
        </div>
      </div>
    </div>
  );
}
