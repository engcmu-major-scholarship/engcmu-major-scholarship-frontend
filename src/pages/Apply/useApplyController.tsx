import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from '../../constants/Api';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types/Roles';

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

export interface GetApplication {
  scholarId: number;
  budget: number | null;
  doc: string;
}

const useApplyController = () => {
  const { id } = useParams();
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
  const [selectedScholarship, setSelectedScholarship] =
    useState<ApplyableScholarship | null>(null);
  const [isDocLoading, setIsDocLoading] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useEffect(() => {
    httpClient
      .get<ApplyableScholarship[]>(Api.APPLYABLE_SCHOLARSHIP)
      .then((response) => {
        setScholarships(response);
        resetField('scholarId', { defaultValue: response[0]?.id ?? null });
        resetField('amount', {
          defaultValue: response[0]?.defaultBudget ?? null,
        });
        setSelectedScholarship(response[0] ?? null);
        if (id && roles.includes(Role.STUDENT)) {
          setIsDocLoading(true);
          httpClient
            .get<GetApplication>(`${Api.APPLICATION}/${id}`)
            .then((res) => {
              resetField('scholarId', { defaultValue: res.scholarId });
              resetField('amount', { defaultValue: res.budget });
              fetch(res.doc).then((blobResponse) => {
                blobResponse.blob().then((blob) => {
                  const file = new File([blob], 'doc', { type: blob.type });
                  resetField('documents', { defaultValue: [file] });
                  setIsDocLoading(false);
                });
              });
            });
        }
      });
  }, [httpClient, id, resetField, roles]);

  const onSubmit = (data: ApplyData) => {
    console.log(data);
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return {
    id,
    register,
    errors,
    watch,
    handleSubmit,
    onSubmit,
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
  };
};

export default useApplyController;
