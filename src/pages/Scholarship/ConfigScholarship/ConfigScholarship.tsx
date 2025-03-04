import DateTimePickerReactHookForm from '../../../components/DateTimePickerReactHookForm';
import Modal from '../../../components/Modal';
import PDFInputReactHookForm from '../../../components/PDFInputReactHookForm';
import useConfigScholarshipController from './useConfigScholarshipController';

const ConfigScholarship = () => {
  const {
    id,
    register,
    watch,
    errors,
    isScholarDocLoading,
    isAppDocLoading,
    isCancelModalOpen,
    setIsCancelModalOpen,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    onSubmit,
    navigateBack,
    handleSubmit,
  } = useConfigScholarshipController();

  return (
    <>
      <div className="flex flex-col px-24 py-4 gap-4">
        <div className="w-full text-xl text-center">
          {id ? 'แก้ไขทุน' : 'สร้างทุน'}
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-3/4 gap-2">
            <label htmlFor="scholarName" className="text-sm font-medium">
              ชื่อทุน
            </label>
            <input
              id="scholarName"
              type="text"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              {...register('name', { required: 'ต้องระบุชื่อทุน' })}
            />
            {errors.name && (
              <div className="text-red-500 text-sm">{errors.name.message}</div>
            )}
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label htmlFor="budget" className="text-sm font-medium">
              จำนวนเงินทุน
            </label>
            <input
              id="budget"
              type="number"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              {...register('defaultBudget', {
                min: { value: 1, message: 'จำนวนเงินต้องมากกว่า 1' },
                valueAsNumber: true,
              })}
            />
            {errors.defaultBudget && (
              <div className="text-red-500 text-sm">
                {errors.defaultBudget.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="w-1/4">
            <DateTimePickerReactHookForm
              register={register}
              registerOptions={{
                required: 'ต้องระบุวันเปิดรับสมัคร',
                valueAsDate: true,
              }}
              watch={watch}
              error={errors.openDate?.message}
              name="openDate"
              label="วันเปิดรับสมัคร"
            />
          </div>
          <div className="w-1/4">
            <DateTimePickerReactHookForm
              register={register}
              registerOptions={{
                required: 'ต้องระบุวันปิดรับสมัคร',
                validate: (value) =>
                  value > watch('openDate') ||
                  'วันปิดรับสมัครต้องมากกว่าวันเปิดรับสมัคร',
                valueAsDate: true,
              }}
              watch={watch}
              error={errors.closeDate?.message}
              name="closeDate"
              label="วันปิดรับสมัคร"
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="description" className="text-sm font-medium">
            รายละเอียดทุน
          </label>
          <textarea
            id="description"
            className="border-2 text-sm rounded-lg w-full h-40 p-2.5"
            {...register('description', { required: 'ต้องระบุรายละเอียดทุน' })}
          />
          {errors.description && (
            <div className="text-red-500 text-sm">
              {errors.description.message}
            </div>
          )}
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="requirement" className="text-sm font-medium">
            เงื่อนไขการสมัคร
          </label>
          <textarea
            id="requirement"
            className="border-2 text-sm rounded-lg w-full h-40 p-2.5"
            {...register('requirement', {
              required: 'ต้องระบุเงื่อนไขการสมัคร',
            })}
          />
          {errors.requirement && (
            <div className="text-red-500 text-sm">
              {errors.requirement.message}
            </div>
          )}
        </div>
        <PDFInputReactHookForm
          register={register}
          registerOptions={{
            required: { value: !id, message: 'ต้องแนบเอกสารรายละเอียดทุน' },
            validate: (value) => {
              if (value[0]) {
                return (
                  value[0].type === 'application/pdf' ||
                  'เอกสารต้องเป็นไฟล์ PDF'
                );
              } else {
                return 'ต้องแนบเอกสารรายละเอียดทุน';
              }
            },
          }}
          watch={watch}
          name="scholarDoc"
          label="เอกสารรายละเอียดทุน"
          error={errors.scholarDoc?.message}
          isLoading={isScholarDocLoading}
        />
        <PDFInputReactHookForm
          register={register}
          registerOptions={{
            required: { value: !id, message: 'ต้องแนบเอกสารการสมัคร' },
            validate: (value) => {
              if (value[0]) {
                return (
                  value[0].type === 'application/pdf' ||
                  'เอกสารต้องเป็นไฟล์ PDF'
                );
              } else {
                return 'ต้องแนบเอกสารการสมัคร';
              }
            },
          }}
          watch={watch}
          name="appDoc"
          label="เอกสารการสมัคร"
          error={errors.appDoc?.message}
          isLoading={isAppDocLoading}
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
              ต้องการยกเลิกการ{id ? 'แก้ไข' : 'เพิ่ม'}ทุนหรือไม่
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
              ต้องการ{id ? 'แก้ไข' : 'เพิ่ม'}ทุนหรือไม่
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
    </>
  );
};

export default ConfigScholarship;
