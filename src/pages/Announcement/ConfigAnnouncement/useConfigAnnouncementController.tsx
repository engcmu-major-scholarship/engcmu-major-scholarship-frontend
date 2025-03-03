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
  description: string;
  docLink: string;
  published: boolean;
}

export interface CreateOrEditScholarshipForm {
  name: string;
  description: string;
  doc: File[];
  published: boolean;
}

const useConfigAnnouncementController = () => {
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
  } = useForm<CreateOrEditScholarshipForm>();
  const [isDocLoading, setIsDocLoading] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useEffect(() => {
    if (id && roles.includes(Role.ADMIN)) {
      setIsDocLoading(true);
      httpClient
        .get<GetScholarship>(`${Api.ANNOUNCEMENT}/admin/${id}`)
        .then((response) => {
          reset(response);
          if (response.docLink) {
            fetch(response.docLink).then((blobResponse) => {
              blobResponse.blob().then((blob) => {
                const doc = new File([blob], response.name, {
                  type: blob.type,
                });
                resetField('doc', { defaultValue: [doc] });
                setIsDocLoading(false);
              });
            });
          } else {
            setIsDocLoading(false);
          }
        });
    }
  }, [httpClient, id, reset, resetField, roles]);

  const onSubmit = (data: CreateOrEditScholarshipForm) => {
    if (id) {
      const formData = objectToFromData({
        ...getOnlyDirtyFields(dirtyFields, data),
        doc: touchedFields.doc ? data.doc[0] : undefined,
      });
      httpClient
        .patch(`${Api.ANNOUNCEMENT}/${id}`, formData, {
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
        doc: data.doc[0],
      });
      httpClient
        .post(Api.ANNOUNCEMENT, formData, {
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
              alert('มีข่าวประชาสัมพันธ์ชื่อนี้อยู่ในระบบแล้ว');
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
    isDocLoading,
    isCancelModalOpen,
    setIsCancelModalOpen,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    onSubmit,
    navigateBack,
  };
};

export default useConfigAnnouncementController;
