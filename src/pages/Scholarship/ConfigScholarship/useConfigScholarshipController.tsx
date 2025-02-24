import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { useAuth } from '../../../hooks/useAuth';
import { Api } from '../../../constants/Api';
import { Role } from '../../../types/Roles';
import { getOnlyDirtyFields } from '../../../utils/getOnlyDirtyFields';
import { objectToFromData } from '../../../utils/objectToFormData';

export interface GetScholarship {
  name: string;
  defaultBudget: number | null;
  description: string;
  requirement: string;
  openDate: Date;
  closeDate: Date;
  appDocLink: string;
  docLink: string;
  published: boolean;
}

export interface CreateOrEditScholarshipForm {
  name: string;
  description: string;
  requirement: string;
  defaultBudget: number | null;
  openDate: Date;
  closeDate: Date;
  published: boolean;
  scholarDoc: File[];
  appDoc: File[];
}

const useConfigScholarshipController = () => {
  const { id } = useParams();
  const { roles } = useAuth();
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isDirty, dirtyFields, touchedFields },
  } = useForm<CreateOrEditScholarshipForm>({
    defaultValues: {
      openDate: new Date(),
      closeDate: new Date(),
    },
  });
  const [isScholarDocLoading, setIsScholarDocLoading] = useState(false);
  const [isAppDocLoading, setIsAppDocLoading] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useEffect(() => {
    if (id && roles.includes(Role.ADMIN)) {
      setIsScholarDocLoading(true);
      setIsAppDocLoading(true);
      httpClient
        .get<GetScholarship>(`${Api.SCHOLARSHIP}/admin/${id}`)
        .then((response) => {
          reset(response);
          fetch(response.docLink).then((blobResponse) => {
            blobResponse.blob().then((blob) => {
              const scholarDoc = new File([blob], response.name, {
                type: blob.type,
              });
              resetField('scholarDoc', { defaultValue: [scholarDoc] });
              setIsScholarDocLoading(false);
            });
          });
          fetch(response.appDocLink).then((blobResponse) => {
            blobResponse.blob().then((blob) => {
              const appDoc = new File([blob], response.name, {
                type: blob.type,
              });
              resetField('appDoc', { defaultValue: [appDoc] });
              setIsAppDocLoading(false);
            });
          });
        });
    }
  }, [httpClient, id, reset, resetField, roles]);

  const onSubmit = (data: CreateOrEditScholarshipForm) => {
    if (id) {
      const formData = objectToFromData({
        ...getOnlyDirtyFields(dirtyFields, data),
        defaultBudget: dirtyFields.defaultBudget
          ? !data.defaultBudget || data.defaultBudget === 0
            ? null
            : data.defaultBudget
          : undefined,
        scholarDoc: touchedFields.scholarDoc ? data.scholarDoc[0] : undefined,
        appDoc: touchedFields.appDoc ? data.appDoc[0] : undefined,
      });
      httpClient
        .patch(`${Api.SCHOLARSHIP}/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          navigateBack();
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 422) {
              navigateBack();
            } else {
              console.error(error);
            }
          }
        });
    } else {
      const formData = objectToFromData({
        ...data,
        defaultBudget:
          !data.defaultBudget || data.defaultBudget === 0
            ? null
            : data.defaultBudget,
        scholarDoc: data.scholarDoc[0],
        appDoc: data.appDoc[0],
      });
      httpClient
        .post(Api.SCHOLARSHIP, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          navigateBack();
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            if (error.response.status === 400) {
              alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            } else if (error.response.status === 422) {
              alert('มีทุนชื่อนี้อยู่ในระบบแล้ว');
            }
          }
        });
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return {
    id,
    register,
    watch,
    handleSubmit,
    resetField,
    errors,
    isDirty,
    isScholarDocLoading,
    isAppDocLoading,
    isCancelModalOpen,
    setIsCancelModalOpen,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    onSubmit,
    navigateBack,
  };
};

export default useConfigScholarshipController;
