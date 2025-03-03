import Modal from '../../../components/Modal';
import PDFInputReactHookForm from '../../../components/PDFInputReactHookForm';
import useConfigAnnouncementController from './useConfigAnnouncementController';

const ConfigAnnouncement = () => {
  const {
    id,
    register,
    watch,
    errors,
    isDocLoading,
    isCancelModalOpen,
    setIsCancelModalOpen,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    onSubmit,
    navigateBack,
    handleSubmit,
  } = useConfigAnnouncementController();

  return (
    <div className="h-full w-full flex flex-col overflow-auto overflow-y-auto">
      <div className="flex flex-col px-24 py-4 gap-4">
        <div className="w-full text-xl text-center">
          {id ? 'แก้ไข' : 'สร้าง'}ข่าวประชาสัมพันธ์
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-2/4 gap-2">
            <label htmlFor="announcementName" className="text-sm font-medium">
              ชื่อข่าวประชาสัมพันธ์
            </label>
            <input
              id="announcementName"
              type="text"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              {...register('name', {
                required: 'ต้องระบุชื่อข่าวประชาสัมพันธ์',
              })}
            />
            {errors.name && (
              <div className="text-red-500 text-sm">{errors.name.message}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="description" className="text-sm font-medium">
            รายละเอียดข่าวประชาสัมพันธ์
          </label>
          <textarea
            id="description"
            className="border-2 text-sm rounded-lg w-full h-40 p-2.5"
            {...register('description', {
              required: 'ต้องระบุรายละเอียดข่าวประชาสัมพันธ์',
            })}
          />
          {errors.description && (
            <div className="text-red-500 text-sm">
              {errors.description.message}
            </div>
          )}
        </div>
        <PDFInputReactHookForm
          register={register}
          registerOptions={{
            validate: (value) => {
              if (value[0]) {
                return (
                  value[0].type === 'application/pdf' ||
                  'เอกสารต้องเป็นไฟล์ PDF'
                );
              }
            },
          }}
          watch={watch}
          name="doc"
          label="เอกสารรายละเอียดข่าวประชาสัมพันธ์"
          error={errors.doc?.message}
          isLoading={isDocLoading}
        />
        <div className="flex flex-row gap-4">
          <div className="flex flex-row gap-2">
            <div className="relative inline-block w-24 h-10">
              <input
                id="switch-component-desc"
                type="checkbox"
                className="peer appearance-none w-24 h-10 bg-slate-100 rounded-full checked:bg-[#dbe9ea] cursor-pointer transition-colors duration-300"
                {...register('published')}
              />
              <label
                htmlFor="switch-component-desc"
                className="absolute top-0 left-0 w-10 h-10 bg-white rounded-full border border-slate-300 shadow-xs transition-transform duration-300 peer-checked:translate-x-14 peer-checked:border-slate-800 cursor-pointer"
              ></label>
            </div>
            <label
              htmlFor="switch-component-desc"
              className="flex text-slate-600 text-sm cursor-pointer"
            >
              <div className="justify-center items-center flex">
                <div className="text-2xl">เผยแพร่ทุน</div>
              </div>
            </label>
          </div>
        </div>
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
            <div className="text-2xl">
              ต้องการยกเลิกการ{id ? 'แก้ไข' : 'เพิ่ม'}ข่าวประชาสัมพันธ์หรือไม่
            </div>
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
            <div className="text-2xl">
              ต้องการ{id ? 'แก้ไข' : 'เพิ่ม'}ข่าวประชาสัมพันธ์หรือไม่
            </div>
            <div className="flex flex-row gap-4">
              <button
                className="border border-solid border-black py-3 px-8 text-lg rounded-2xl"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="bg-[#dbe9ea] hover:bg-[#a9b3b3] text-black py-3 px-8 text-lg rounded-2xl"
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

export default ConfigAnnouncement;
