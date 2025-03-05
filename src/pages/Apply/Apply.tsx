import Modal from '../../components/Modal';
import PDFInputReactHookForm from '../../components/PDFInputReactHookForm';
import useApplyController from './useApplyController';

const Apply = () => {
  const {
    id,
    onSave,
    onSubmit,
    register,
    errors,
    watch,
    handleScholarshipChange,
    handleSubmit,
    scholarships,
    isCancelModalOpen,
    setIsCancelModalOpen,
    isSaveModalOpen,
    setIsSaveModalOpen,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    navigateBack,
  } = useApplyController();

  return (
    <>
      <div className="flex flex-col px-24 py-4 gap-4">
        <div className="flex flex-row gap-2 w-full my-4 text-xl">
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 25 25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.4062 13.5417C16.4062 13.3345 16.3239 13.1358 16.1774 12.9893C16.0309 12.8428 15.8322 12.7605 15.625 12.7605H9.375C9.1678 12.7605 8.96909 12.8428 8.82257 12.9893C8.67606 13.1358 8.59375 13.3345 8.59375 13.5417C8.59375 13.7489 8.67606 13.9477 8.82257 14.0942C8.96909 14.2407 9.1678 14.323 9.375 14.323H15.625C15.8322 14.323 16.0309 14.2407 16.1774 14.0942C16.3239 13.9477 16.4062 13.7489 16.4062 13.5417ZM16.4062 17.7084C16.4062 17.5012 16.3239 17.3025 16.1774 17.156C16.0309 17.0095 15.8322 16.9272 15.625 16.9272H9.375C9.1678 16.9272 8.96909 17.0095 8.82257 17.156C8.67606 17.3025 8.59375 17.5012 8.59375 17.7084C8.59375 17.9156 8.67606 18.1143 8.82257 18.2608C8.96909 18.4074 9.1678 18.4897 9.375 18.4897H15.625C15.8322 18.4897 16.0309 18.4074 16.1774 18.2608C16.3239 18.1143 16.4062 17.9156 16.4062 17.7084Z" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.29159 2.34375C6.53185 2.34375 5.80323 2.64555 5.26602 3.18277C4.72881 3.71998 4.427 4.4486 4.427 5.20833V19.7917C4.427 20.5514 4.72881 21.28 5.26602 21.8172C5.80323 22.3544 6.53185 22.6562 7.29159 22.6562H17.7083C18.468 22.6562 19.1966 22.3544 19.7338 21.8172C20.271 21.28 20.5728 20.5514 20.5728 19.7917V8.3C20.5728 7.90312 20.4437 7.51771 20.2041 7.20104L17.0812 3.06771C16.9113 2.84283 16.6915 2.66042 16.4392 2.5348C16.1869 2.40918 15.9089 2.34379 15.627 2.34375H7.29159ZM5.9895 5.20833C5.9895 4.48958 6.57284 3.90625 7.29159 3.90625H14.8437V8.48646C14.8437 8.91771 15.1937 9.26771 15.6249 9.26771H19.0103V19.7917C19.0103 20.5104 18.427 21.0938 17.7083 21.0938H7.29159C6.57284 21.0938 5.9895 20.5104 5.9895 19.7917V5.20833Z"
              />
            </svg>
          </span>
          <span>{id ? 'แก้ไขใบสมัคร' : 'สมัครทุน'}</span>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-1/3 gap-2">
            <label htmlFor="scholar" className="text-sm font-medium">
              ทุนที่ต้องการสมัคร
            </label>
            <select
              id="scholar"
              className="border rounded-md p-2.5"
              {...register('scholarId', {
                required: 'ต้องเลือกทุนที่ต้องการสมัคร',
                valueAsNumber: true,
                onChange: (e) => {
                  handleScholarshipChange(Number(e.target.value));
                },
              })}
            >
              {scholarships.map((scholarship) => (
                <option key={scholarship.id} value={scholarship.id}>
                  {scholarship.name}
                </option>
              ))}
            </select>
            {errors.scholarId && (
              <div className="text-red-500 text-sm">
                {errors.scholarId.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-1/3 gap-2">
            <label htmlFor="requestAmount" className="text-sm font-medium">
              {scholarships.find(
                (scholarship) => scholarship.id === watch('scholarId'),
              )?.defaultBudget !== null
                ? 'จำนวนทุน'
                : 'จำนวนทุนที่ต้องการ'}
            </label>
            <input
              id="requestAmount"
              type="number"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              disabled={
                scholarships.find(
                  (scholarship) => scholarship.id === watch('scholarId'),
                )?.defaultBudget !== null
              }
              {...register('amount', { valueAsNumber: true })}
            />
            {errors.amount && (
              <div className="text-red-500 text-sm">
                {errors.amount.message}
              </div>
            )}
          </div>
        </div>
        <PDFInputReactHookForm
          register={register}
          registerOptions={{
            required: { value: !id, message: 'ต้องแนบเอกสารการสมัคร' },
            validate: (value) =>
              value[0].type === 'application/pdf' || 'เอกสารต้องเป็นไฟล์ PDF',
          }}
          watch={watch}
          name="documents"
          label="เอกสารการสมัคร"
          error={errors.documents?.message}
        />
        <div className="flex flex-row justify-between">
          <button
            className="text-black border border-solid border-black py-3 px-8 text-lg rounded-2xl"
            onClick={() => setIsCancelModalOpen(true)}
          >
            ยกเลิก
          </button>
          <div className="flex flex-row gap-4">
            <button
              className="text-black bg-[#dbe9ea] hover:bg-[#a9b3b3] py-3 px-8 text-lg rounded-2xl"
              onClick={() => setIsSaveModalOpen(true)}
            >
              บันทึก
            </button>
            <button
              className="text-black bg-[#dbe9ea] hover:bg-[#a9b3b3] py-3 px-8 text-lg rounded-2xl"
              onClick={() => setIsSubmitModalOpen(true)}
            >
              บันทึกและส่ง
            </button>
          </div>
        </div>
      </div>
      {isCancelModalOpen && (
        <Modal>
          <div className="w-1/3 h-1/3 p-12 bg-white rounded-lg flex flex-col items-center justify-center gap-5">
            <div className="text-2xl">ต้องการยกเลิกการสมัครหรือไม่</div>
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
      {isSaveModalOpen && (
        <Modal>
          <div className="w-1/3 h-1/3 p-12 bg-white rounded-lg flex flex-col items-center justify-center gap-5">
            <div className="text-2xl">ต้องการบันทึกหรือไม่</div>
            <div className="flex flex-row gap-4">
              <button
                className="border border-solid border-black py-3 px-8 text-lg rounded-2xl"
                onClick={() => setIsSaveModalOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="bg-[#dbe9ea] text-black py-3 px-8 text-lg rounded-2xl"
                onClick={(e) => {
                  setIsSaveModalOpen(false);
                  handleSubmit(onSave)(e);
                }}
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
            <div className="text-2xl">ต้องการบันทึกและส่งใบสมัครหรือไม่</div>
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
    </>
  );
};

export default Apply;
