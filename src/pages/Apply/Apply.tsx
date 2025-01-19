import Modal from '../../components/Modal';
import useApplyController from './useApplyController';

const Apply = () => {
  const {
    id,
    onSubmit,
    register,
    errors,
    watch,
    handleSubmit,
    selectedScholarship,
    isDocLoading,
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
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="flex flex-col px-24 py-4 gap-4">
        <div className="w-full text-xl text-center">
          {id ? 'แก้ไขใบสมัคร' : 'สมัครทุน'}
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
              {selectedScholarship?.defaultBudget !== null
                ? 'จำนวนเงินที่ทุนนี้ให้'
                : 'จำนวนเงินที่ขอรับ'}
            </label>
            <input
              id="requestAmount"
              type="number"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              disabled={selectedScholarship?.defaultBudget !== null}
              {...register('amount')}
            />
            {errors.amount && (
              <div className="text-red-500 text-sm">
                {errors.amount.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="doc" className="text-sm font-medium">
            เอกสารใบสมัคร
          </label>
          <input
            id="doc"
            type="file"
            accept="application/pdf"
            className="border-2 text-sm rounded-lg w-60 p-2.5"
            {...register('documents', {
              required: { value: !id, message: 'ต้องแนบเอกสารใบสมัคร' },
              validate: (value) =>
                value[0].type === 'application/pdf' || 'เอกสารต้องเป็นไฟล์ PDF',
            })}
          />
          {errors.documents && (
            <div className="text-red-500 text-sm">
              {errors.documents.message}
            </div>
          )}
          {watch('documents') && watch('documents')?.length !== 0 ? (
            <object
              data={URL.createObjectURL(watch('documents')[0])}
              type="application/pdf"
              className="w-full h-[600px]"
            >
              <div className="text-red-500 text-sm">
                {
                  'This browser does not support PDFs. Please download the PDF to view it: '
                }
                <a
                  className="text-blue-700"
                  href={URL.createObjectURL(watch('documents')[0])}
                >
                  Download PDF
                </a>
              </div>
            </object>
          ) : (
            <div className="flex flex-col w-full h-[600px] border-2 items-center justify-center bg-gray-100">
              <div className="text-5xl text-center text-gray-500">
                {isDocLoading ? 'Loading...' : 'Preview PDF'}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between">
          <button
            className="text-black border border-solid border-black py-3 px-8 text-lg rounded-2xl"
            onClick={() => setIsCancelModalOpen(true)}
          >
            ยกเลิก
          </button>
          <div className="flex gap-4">
            <button className="text-black bg-[#dbe9ea] hover:bg-[#a9b3b3] py-3 px-8 text-lg rounded-2xl">
              บันทึก
            </button>
            <button
              className="text-black bg-[#dbe9ea] hover:bg-[#a9b3b3] py-3 px-8 text-lg rounded-2xl"
              onClick={() => setIsSubmitModalOpen(true)}
            >
              ส่งใบสมัคร
            </button>
          </div>
        </div>
      </div>
      {isCancelModalOpen && (
        <Modal>
          <div className="w-1/3 h-1/3 p-12 bg-white rounded-lg flex flex-col items-center justify-center gap-5">
            <div className="text-2xl">
              ต้องการยกเลิกการ{id ? 'แก้ไขใบสมัคร' : 'สมัคร'}หรือไม่
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
      {isSaveModalOpen && (
        <Modal>
          <div className="w-1/3 h-1/3 p-12 bg-white rounded-lg flex flex-col items-center justify-center gap-5">
            <div className="text-2xl">ต้องการบันทึกหรือไม่</div>
            <div className="text-lg">หากคุณยังไม่ส่งใบสมัคร</div>
            <div className="text-lg">คุณสามารถกลับมาแก้ไขใบสมัครได้</div>
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
                  handleSubmit(onSubmit)(e);
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
