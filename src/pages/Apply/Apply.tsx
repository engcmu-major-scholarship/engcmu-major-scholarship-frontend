import Modal from '../../components/Modal';
import PDFInputReactHookForm from '../../components/PDFInputReactHookForm';
import useApplyController from './useApplyController';

const Apply = () => {
  const {
    onSubmit,
    register,
    errors,
    watch,
    handleScholarshipChange,
    handleSubmit,
    scholarships,
    isCancelModalOpen,
    setIsCancelModalOpen,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    navigateBack,
  } = useApplyController();

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="flex flex-col px-24 py-4 gap-4">
        <div className="w-full text-xl text-center">สมัครทุน</div>
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
              {...register('amount')}
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
            required: 'ต้องแนบเอกสารการสมัคร',
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
          <button
            className="text-black bg-[#dbe9ea] hover:bg-[#a9b3b3] py-3 px-8 text-lg rounded-2xl"
            onClick={() => setIsSubmitModalOpen(true)}
          >
            ส่งใบสมัคร
          </button>
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
      {isSubmitModalOpen && (
        <Modal>
          <div className="w-1/3 h-1/3 p-12 bg-white rounded-lg flex flex-col items-center justify-center gap-5">
            <div className="text-2xl">ต้องการส่งใบสมัครหรือไม่</div>
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

export default Apply;
