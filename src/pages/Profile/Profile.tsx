import ImageInputReactHookForm from '../../components/ImageInputReactHookForm';
import Modal from '../../components/Modal';
import useProfileController from './useProfileController';

const Profile = () => {
  const {
    register,
    watch,
    errors,
    name,
    advisors,
    profile,
    onSubmit,
    handleSubmit,
    navigateBack,
    isCancelModalOpen,
    setIsCancelModalOpen,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
  } = useProfileController();
  return (
    <div className="h-full w-full flex flex-col overflow-auto overflow-y-auto">
      <div className="flex flex-col px-24 py-4 gap-4">
        <div className="w-full text-xl text-center">แก้ไขข้อมูลส่วนตัว</div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-1/3 gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              ชื่อ-นามสกุล
            </label>
            <input
              id="name"
              type="text"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              disabled
              defaultValue={name}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-1/3 gap-2">
            <label htmlFor="studentId" className="text-sm font-medium">
              รหัสนักศึกษา
            </label>
            <input
              id="studentId"
              type="text"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              disabled
              defaultValue={profile?.id}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-1/3 gap-2">
            <label htmlFor="scholar" className="text-sm font-medium">
              อาจารย์ที่ปรึกษา
            </label>
            <select
              id="scholar"
              className="border rounded-md p-2.5"
              {...register('advisorId', {
                required: 'ต้องเลือกอาจารย์ที่ปรึกษา',
                valueAsNumber: true,
              })}
            >
              {advisors.map((advisor) => (
                <option key={advisor.id} value={advisor.id}>
                  {advisor.name}
                </option>
              ))}
            </select>
            {errors.advisorId && (
              <div className="text-red-500 text-sm">
                {errors.advisorId.message}
              </div>
            )}
          </div>
        </div>
        <ImageInputReactHookForm
          name="studentIdCard"
          label="รูปบัตรนักศึกษา"
          register={register}
          registerOptions={{
            validate: (value) => {
              if (value[0]) {
                return (
                  /^image\/.+$/gm.test(value[0].type) ||
                  'เอกสารต้องเป็นไฟล์รูปภาพเท่านั้น'
                );
              } else {
                return 'ต้องแนบเอกสารรูปภาพบัตรนักศึกษา';
              }
            },
          }}
          watch={watch}
          error={errors.studentIdCard?.message}
        />
        <ImageInputReactHookForm
          name="bookBank"
          label="รูปหน้าบัญชีธนาคาร"
          register={register}
          registerOptions={{
            validate: (value) => {
              if (value[0]) {
                return (
                  /^image\/.+$/gm.test(value[0].type) ||
                  'เอกสารต้องเป็นไฟล์รูปภาพเท่านั้น'
                );
              } else {
                return 'ต้องแนบเอกสารรูปภาพบัญชีธนาคาร';
              }
            },
          }}
          watch={watch}
          error={errors.bookBank?.message}
        />
        <div className="flex flex-row justify-between">
          <button
            className=" text-black border border-solid border-black py-3 px-8 text-lg rounded-2xl"
            onClick={() => setIsCancelModalOpen(true)}
          >
            ยกเลิก
          </button>
          <button
            className=" text-black bg-[#dbe9ea] hover:bg-[#a9b3b3] py-3 px-8 text-lg rounded-2xl"
            onClick={() => setIsSubmitModalOpen(true)}
          >
            บันทึก
          </button>
        </div>
      </div>
      {isCancelModalOpen && (
        <Modal>
          <div className="w-1/3 h-1/3 p-12 bg-white rounded-lg flex flex-col items-center justify-center gap-5">
            <div className="text-2xl">ต้องการยกเลิกการแก้ไขโปรไฟล์หรือไม่</div>
            <div className="flex flex-row gap-4">
              <button
                className="border border-solid border-black py-3 px-8 text-lg rounded-2xl"
                onClick={() => setIsCancelModalOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="bg-red-500 text-white py-3 px-8 text-lg rounded-2xl"
                onClick={navigateBack}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </Modal>
      )}
      {isSubmitModalOpen && (
        <Modal>
          <div className="w-1/3 h-1/3 p-12 bg-white rounded-lg flex flex-col items-center justify-center gap-5">
            <div className="text-2xl">ต้องการบันทึกโปรไฟล์หรือไม่</div>
            <div className="flex flex-row gap-4">
              <button
                className="border border-solid border-black py-3 px-8 text-lg rounded-2xl"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="bg-[#dbe9ea] text-black py-3 px-8 text-lg rounded-2xl"
                onClick={(e) => {
                  setIsSubmitModalOpen(false);
                  handleSubmit(onSubmit)(e);
                }}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
