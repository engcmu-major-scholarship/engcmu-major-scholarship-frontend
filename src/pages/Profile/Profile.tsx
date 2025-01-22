const Profile = () => {
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto ">
      <div className="flex flex-col px-24 py-10 gap-6">
        <div className="inline-block">
          <label className="text-gray-800 mr-4 ">ชื่อ-นามสกุล</label>
          <input
            type="text"
            id="fname"
            name="fname inline-block"
            className="border border-gray-800 rounded px-3 py-1 hover:bg-gray-200"
          ></input>
        </div>
        <div className="inline-block">
          <label className="text-gray-800 mr-4">รหัสนักศึกษา</label>
          <input
            type="text"
            id="fname"
            name="fname inline-block"
            className="border border-gray-800 rounded px-3 py-1 hover:bg-gray-200"
          ></input>
        </div>
        <div className="inline-block">
          <label className="text-gray-800 mr-4">อาจารย์ที่ปรึกษา</label>
          <select className="border border-gray-800 rounded px-3 py-1 hover:bg-gray-200">
            <option value="A">อาจารย์ A</option>
            <option value="B">อาจารย์ B</option>
            <option value="C">อาจารย์ C</option>
          </select>
        </div>

        <div>
          <label className="text-gray-800">รูปบัตรนักศึกษา</label>
          <div className="px-3 py-1 mt-4">
            <label
              htmlFor="file-upload"
              className="rounded px-5 py-2 mr-6 bg-[#DBE9EA] cursor-pointer hover:bg-[#B0D4D5]"
            >
              เลือกรูปที่ต้องการอัพโหลด
            </label>
            <input id="file-upload" type="file" className="hidden" />
            <button className="border border-gray-800 px-5 py-2 rounded hover:bg-gray-200 active:bg-gray-300">
              อัพโหลดรูป
            </button>
            <h1 className="text-red-400">* Preview Image down here</h1>
          </div>
        </div>
        <div>
          <label className="text-gray-800">รูปหน้าบัญชีธนาคาร</label>
          <div className="px-3 py-1 mt-4">
            <label
              htmlFor="file-upload"
              className="rounded px-5 py-2 mr-6 bg-[#DBE9EA] cursor-pointer hover:bg-[#B0D4D5]"
            >
              เลือกรูปที่ต้องการอัพโหลด
            </label>
            <input id="file-upload" type="file" className="hidden" />
            <button className="border border-gray-800 px-5 py-2 rounded hover:bg-gray-200 active:bg-gray-300">
              อัพโหลดรูป
            </button>
            <h1 className="text-red-400">* Preview Image down here</h1>
          </div>
        </div>
        <div className="px-3 py-1 mt-4">
          <button className="rounded px-5 py-2 mr-6 bg-[#DBE9EA] hover:bg-[#B0D4D5] active:bg-[#8FBEC0]">
            บันทึก
          </button>
          <button className="border border-gray-800 px-5 py-2 rounded hover:bg-gray-200 active:bg-gray-300">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
