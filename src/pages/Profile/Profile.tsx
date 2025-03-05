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
    <div className="flex flex-col px-24 py-4 gap-4">
      <div className="flex flex-row gap-2 w-full my-4 text-xl">
        <span>
          <svg
            width="30"
            height="30"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 22.9168C18.2532 22.9168 22.9167 18.2533 22.9167 12.5002C22.9167 6.74704 18.2532 2.0835 12.5 2.0835C6.74692 2.0835 2.08337 6.74704 2.08337 12.5002C2.08337 18.2533 6.74692 22.9168 12.5 22.9168Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.5 11.9793C13.1907 11.9793 13.8531 11.705 14.3415 11.2166C14.8298 10.7282 15.1042 10.0658 15.1042 9.37516C15.1042 8.68449 14.8298 8.02211 14.3415 7.53374C13.8531 7.04536 13.1907 6.771 12.5 6.771C11.8094 6.771 11.147 7.04536 10.6586 7.53374C10.1702 8.02211 9.89587 8.68449 9.89587 9.37516C9.89587 10.0658 10.1702 10.7282 10.6586 11.2166C11.147 11.705 11.8094 11.9793 12.5 11.9793Z"
              stroke="black"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M5.21985 19.9649C5.39902 17.2508 7.65735 15.1045 10.4167 15.1045H14.5834C17.3391 15.1045 19.5954 17.2451 19.7797 19.954"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span>แก้ไขข้อมูลส่วนตัว</span>
      </div>
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
