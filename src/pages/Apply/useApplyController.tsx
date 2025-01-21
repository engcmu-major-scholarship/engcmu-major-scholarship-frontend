import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from '../../constants/Api';
import { useAuth } from '../../hooks/useAuth';

export interface ApplyData {
  scholarId: number | null;
  amount: number | null;
  documents: File[];
}

export interface ApplyableScholarship {
  id: number;
  name: string;
  defaultBudget: number | null;
}

const useApplyController = () => {
  const { roles } = useAuth();
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<ApplyData>();
  const [scholarships, setScholarships] = useState<ApplyableScholarship[]>([]);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useEffect(() => {
    httpClient
      .get<ApplyableScholarship[]>(Api.APPLYABLE_SCHOLARSHIP)
      .then((response) => {
        if (response.length === 0) {
          alert('ไม่มีทุนที่สามารถสมัครได้');
          navigate(-1);
        }
        setScholarships(response);
        resetField('scholarId', { defaultValue: response[0].id });
        resetField('amount', {
          defaultValue: response[0].defaultBudget,
        });
      });
  }, [httpClient, navigate, resetField, roles]);

  const handleScholarshipChange = (scholarshipId: number) => {
    const scholarship = scholarships.find(
      (scholarship) => scholarship.id === scholarshipId,
    );
    resetField('amount', { defaultValue: scholarship?.defaultBudget });
  };

  const onSubmit = (data: ApplyData) => {
    httpClient
      .post(
        Api.APPLICATION,
        {
          scholarId: data.scholarId,
          budget: scholarships.find(
            (scholarship) => scholarship.id === data.scholarId,
          )?.defaultBudget
            ? null
            : data.amount,
          doc: data.documents[0],
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(() => {
        navigateBack();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
          }
        }
      });
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return {
    register,
    errors,
    watch,
    handleScholarshipChange,
    handleSubmit,
    onSubmit,
    scholarships,
    isCancelModalOpen,
    setIsCancelModalOpen,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    navigateBack,
  };
};

export default useApplyController;
