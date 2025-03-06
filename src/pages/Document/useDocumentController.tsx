import { useForm } from 'react-hook-form';

export interface DocumentData {
  title: string;
  detail: string;
  description: string;
  date: Date;
  approverName: string;
  approverPosition: string;
  additionalNotes: string;
  facultySection: string;
  tel: string;
  documentNumber: number;
  documentDate: Date;
  topic: string;
  toApprover: string;
  memoDetail: string;
  memoApproverName: string;
  memoApproverPosition: string;
}

const useDocumentController = () => {
  const { register, handleSubmit } = useForm<DocumentData>();
  return {
    register,
    handleSubmit,
  };
};

export default useDocumentController;
