import useEditScholarshipController from './useEditScholarshipController';
import { useState } from 'react';
import Modal from '../../../components/Modal/Modal';

const EditScholarship = () => {
  const {
    onSubmit,
    navigateBack,
    register,
    watch,
    handleSubmit,
    errors,
    isScholarDocLoading,
    isAppDocLoading,
    isDirty,
  } = useEditScholarshipController();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  return (
    <div className="h-full w-full flex flex-col overflow-auto overflow-y-auto">
      <div
        className="flex flex-col px-24 py-4 gap-4"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full text-xl text-center">เพิ่มทุน</div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-3/4 gap-2">
            <label htmlFor="scholarName" className="text-sm font-medium">
              ชื่อทุน
            </label>
            <input
              id="scholarName"
              type="text"
              className="border text-sm rounded-lg w-full p-2.5"
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
              className="border text-sm rounded-lg w-full p-2.5"
              {...register('defaultBudget', {
                min: { value: 1, message: 'จำนวนเงินต้องมากกว่า 1' },
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
          <div className="flex flex-col w-1/4 gap-2">
            <label htmlFor="openDate" className="text-sm font-medium">
              วันเปิดรับสมัคร
            </label>
            <input
              id="openDate"
              type="date"
              className="border text-sm rounded-lg w-full p-2.5"
              {...register('openDate', { required: 'ต้องระบุวันเปิดรับสมัคร' })}
            />
            {errors.openDate && (
              <div className="text-red-500 text-sm">
                {errors.openDate.message}
              </div>
            )}
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label htmlFor="closeDate" className="text-sm font-medium">
              วันปิดรับสมัคร
            </label>
            <input
              id="closeDate"
              type="date"
              className="border text-sm rounded-lg w-full p-2.5"
              {...register('closeDate', {
                required: 'ต้องระบุวันปิดรับสมัคร',
                validate: (value) =>
                  value > watch('openDate') ||
                  'วันปิดรับสมัครต้องมากกว่าวันเปิดรับสมัคร',
              })}
            />
            {errors.closeDate && (
              <div className="text-red-500 text-sm">
                {errors.closeDate.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="description" className="text-sm font-medium">
            รายละเอียดทุน
          </label>
          <textarea
            id="description"
            className="border text-sm rounded-lg w-full h-40 p-2.5"
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
            className="border text-sm rounded-lg w-full h-40 p-2.5"
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
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="scholarDoc" className="text-sm font-medium">
            เอกสารรายละเอียดทุน
          </label>
          <input
            id="scholarDoc"
            type="file"
            className="border text-sm rounded-lg w-60 p-2.5"
            {...register('scholarDoc', {
              validate: (value) =>
                value[0].type === 'application/pdf' || 'เอกสารต้องเป็นไฟล์ PDF',
            })}
          />
          {errors.scholarDoc && (
            <div className="text-red-500 text-sm">
              {errors.scholarDoc.message}
            </div>
          )}
          {watch('scholarDoc') && watch('scholarDoc')?.length !== 0 ? (
            <object
              data={URL.createObjectURL(watch('scholarDoc')[0])}
              type="application/pdf"
              className="w-full h-[600px]"
            ></object>
          ) : (
            <div className="flex flex-col w-full h-[600px] border-2 items-center justify-center">
              <div className="text-5xl text-center text-gray-500">
                {isScholarDocLoading ? 'Loading...' : 'Preview PDF'}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="appDoc" className="text-sm font-medium">
            เอกสารการสมัคร
          </label>
          <input
            id="appDoc"
            type="file"
            className="border text-sm rounded-lg w-60 p-2.5"
            {...register('appDoc', {
              validate: (value) =>
                value[0].type === 'application/pdf' || 'เอกสารต้องเป็นไฟล์ PDF',
            })}
          />
          {errors.appDoc && (
            <div className="text-red-500 text-sm">{errors.appDoc.message}</div>
          )}
          {watch('appDoc') && watch('appDoc')?.length !== 0 ? (
            <object
              data={URL.createObjectURL(watch('appDoc')[0])}
              type="application/pdf"
              className="w-full h-[600px]"
            ></object>
          ) : (
            <div className="flex flex-col w-full h-[600px] border-2 items-center justify-center">
              <div className="text-5xl text-center text-gray-500">
                {isAppDocLoading ? 'Loading...' : 'Preview PDF'}
              </div>
            </div>
          )}
        </div>
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
                className="absolute top-0 left-0 w-10 h-10 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-14 peer-checked:border-slate-800 cursor-pointer"
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
            // type="submit"
            disabled={isScholarDocLoading || isAppDocLoading}
          >
            บันทึก
          </button>
        </div>
      </div>
      {isCancelModalOpen && (
        <Modal>
          <div className="w-1/3 h-1/3 p-12 bg-white rounded-lg flex flex-col items-center justify-center gap-5">
            <div className="text-2xl">ต้องการยกเลิกการเพิ่มทุนหรือไม่</div>
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
            <div className="text-2xl">ต้องการบันทึกทุนหรือไม่</div>
            <div className="flex flex-row gap-4">
              <button
                className="border border-solid border-black py-3 px-8 text-lg rounded-2xl"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="bg-[#dbe9ea] text-black py-3 px-8 text-lg rounded-2xl"
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  if (isDirty) {
                    handleSubmit(onSubmit)();
                  } else {
                    navigateBack();
                  }
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

export default EditScholarship;
