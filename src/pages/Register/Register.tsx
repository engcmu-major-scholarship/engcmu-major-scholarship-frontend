import React, { useState } from 'react';

interface ScholarshipRegistrationProps {
  onSubmit: (data: ScholarshipRegistrationData) => void;
}

interface ScholarshipRegistrationData {
  scholarshipType: string;
  amount: string;
  documents: File[];
}

const ScholarshipRegistration: React.FC<ScholarshipRegistrationProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ScholarshipRegistrationData>({
    scholarshipType: '',
    amount: '',
    documents: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        documents: [...Array.from(e.target.files || [])],
      }));
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex items-center p-4 bg-gray-100">
        <span className="text-gray-600">เมนูหลัก</span>
        <span className="mx-2">&gt;</span>
        <span className="font-medium">สมัครทุน</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-gray-700">ทุนที่ต้องการสมัคร</label>
          <select
            className="border rounded-md p-2 w-48"
            value={formData.scholarshipType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, scholarshipType: e.target.value }))
            }
          >
            <option value="">เลือกทุน</option>
            <option value="RA">RA</option>
            {/* Add other scholarship options here */}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700">จำนวนเงินที่ขอ</label>
          <input
            type="text"
            className="border rounded-md p-2 w-48"
            value={formData.amount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, amount: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-gray-700">อัพโหลดเอกสาร</span>

          <div className="flex gap-4">
            <button
              type="button"
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md"
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 8L12 4M12 4L8 8M12 4L12 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              เลือกเอกสารที่ต้องการอัพโหลด
            </button>
          </div>

          <input
            id="fileInput"
            type="file"
            multiple
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Updated PDF preview container with larger dimensions */}
          <div className="w-full min-h-screen border rounded-md flex items-center justify-center">
            {formData.documents.length > 0 ? (
              <object
                data={URL.createObjectURL(formData.documents[0])}
                type="application/pdf"
                className="w-full h-full"
              >
                <p>ไม่สามารถแสดงตัวอย่าง PDF ได้</p>
              </object>
            ) : (
              <span className="text-gray-400">Preview PDF</span>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-6 py-2 rounded-xl border border-black text-black font-medium"
          >
            บันทึก
          </button>

          <div className="flex gap-4">
            <button
              type="button"
              className="px-6 py-2 rounded-xl border border-black text-black font-medium"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-green-100 text-black font-medium"
            >
              ส่งใบสมัคร
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ScholarshipRegistration;