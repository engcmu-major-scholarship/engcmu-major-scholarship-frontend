import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import useDocumentController from './useDocumentController';
import PDF from './PDF';

const Document = () => {
  const {
    register,
    watch,
    filteredRecipients,
    allScholarships,
    selectedScholarship,
    setSelectedScholarship,
  } = useDocumentController();
  return (
    <div className="flex flex-col px-24 py-4 gap-4">
      <div className="flex flex-col gap-4 pb-4 border-b-2">
        <div className="flex flex-row gap-2">
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="department" className="text-sm font-medium">
              ส่วนงาน
            </label>
            <input
              id="department"
              type="text"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              {...register('recordDepartment')}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="tel" className="text-sm font-medium">
              โทร
            </label>
            <input
              id="tel"
              type="text"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              {...register('recordTel')}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="docNumber" className="text-sm font-medium">
              ที่
            </label>
            <input
              id="docNumber"
              type="text"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              {...register('recordDocNumber')}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="date" className="text-sm font-medium">
              วันที่
            </label>
            <input
              id="date"
              type="date"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              {...register('recordDocDate', { valueAsDate: true })}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="recHeading" className="text-sm font-medium">
              เรื่อง
            </label>
            <textarea
              id="recHeading"
              className="border-2 text-sm rounded-lg w-full h-24 p-2.5"
              {...register('recordHeadings')}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="recApprover" className="text-sm font-medium">
              ถึง
            </label>
            <input
              id="recApprover"
              type="text"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              {...register('recordApprover')}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="recContent" className="text-sm font-medium">
              ข้อความ
            </label>
            <textarea
              id="recContent"
              className="border-2 text-sm rounded-lg w-full h-40 p-2.5"
              {...register('recordContent')}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="recApproverName" className="text-sm font-medium">
              ชื่อผู้ลงนาม
            </label>
            <input
              id="recApproverName"
              type="text"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              {...register('recordApproverName')}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="recApproverPos" className="text-sm font-medium">
              ตำแหน่งผู้ลงนาม
            </label>
            <input
              id="recApproverPos"
              type="text"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              {...register('recordApproverPosition')}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="heading" className="text-sm font-medium">
              หัวข้อ
            </label>
            <textarea
              id="heading"
              className="border-2 text-sm rounded-lg w-full h-40 p-2.5"
              {...register('heading')}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="docDate" className="text-sm font-medium">
              วันที่
            </label>
            <input
              id="docDate"
              type="date"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              {...register('docDate', { valueAsDate: true })}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="recApproverName" className="text-sm font-medium">
              ชื่อผู้ลงนาม
            </label>
            <input
              id="recApproverName"
              type="text"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              {...register('approverName')}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="recApproverPos" className="text-sm font-medium">
              ตำแหน่งผู้ลงนาม
            </label>
            <input
              id="recApproverPos"
              type="text"
              className="border-2 text-sm rounded-lg w-full p-2.5"
              {...register('approverPosition')}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/4 gap-2">
        <label htmlFor="scholar" className="text-sm font-medium">
          ทุนการศึกษา
        </label>
        <select
          id="scholar"
          className="border rounded-md p-2.5"
          value={selectedScholarship ?? '-'}
          onChange={(e) => setSelectedScholarship(e.target.value)}
        >
          {allScholarships.map((scholarship) => (
            <option key={scholarship} value={scholarship}>
              {scholarship}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-row justify-end">
        <PDFDownloadLink
          document={<PDF data={watch()} recipientDatas={filteredRecipients} />}
          fileName={
            selectedScholarship
              ? selectedScholarship + '.pdf'
              : `document-${new Date().toISOString()}.pdf`
          }
          className="bg-[#E4E8DB] hover:bg-[#C4C9BC] rounded-lg p-4 cursor-pointer"
        >
          {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
      </div>
      <PDFViewer className="h-screen">
        <PDF data={watch()} recipientDatas={filteredRecipients} />
      </PDFViewer>
    </div>
  );
};

export default Document;
