import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from '../../constants/Api';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types/Roles';
import { objectToFromData } from '../../utils/objectToFormData';

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
    formState: { errors, dirtyFields, touchedFields },
  } = useForm<ApplyData>();
  const [scholarships, setScholarships] = useState<ApplyableScholarship[]>([]);
  const [oldData, setOldData] = useState<ApplyData | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
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
        if (id && roles.includes(Role.STUDENT)) {
          httpClient
            .get<GetApplication>(`${Api.APPLICATION}/${id}`)
            .then((appRes) => {
              const scholarship = response.find(
                (scholarship) => scholarship.id === appRes.scholarId,
              );
              if (scholarship) {
                resetField('scholarId', { defaultValue: scholarship.id });
                resetField('amount', {
                  defaultValue: scholarship.defaultBudget ?? appRes.budget,
                });
              } else {
                alert('ทุนที่ท่านได้เคยเลือกไว้ไม่สามารถสมัครได้');
              }
              fetch(appRes.doc).then((docRes) => {
                docRes.blob().then((blob) => {
                  const file = new File([blob], 'document.pdf', {
                    type: blob.type,
                  });
                  resetField('documents', { defaultValue: [file] });
                  setOldData({
                    scholarId: appRes.scholarId,
                    amount: appRes.budget,
                    documents: [file],
                  });
                });
              });
            });
        }
      });
  }, [httpClient, id, navigate, resetField, roles]);

  const handleScholarshipChange = (scholarshipId: number) => {
    const scholarship = scholarships.find(
      (scholarship) => scholarship.id === scholarshipId,
    );
    resetField('amount', {
      defaultValue: scholarship?.defaultBudget ?? oldData?.amount,
    });
  };

  const saveApplication = (data: ApplyData) => {
    const formData = objectToFromData({
      scholarId: data.scholarId,
      budget: scholarships.find(
        (scholarship) => scholarship.id === data.scholarId,
      )?.defaultBudget
        ? null
        : data.amount,
      doc: data.documents[0],
    });
    return httpClient.post(Api.APPLICATION, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const updateApplication = (data: ApplyData) => {
    const formData = objectToFromData({
      scholarId: dirtyFields.scholarId ? data.scholarId : undefined,
      budget: dirtyFields.amount
        ? scholarships.find((scholarship) => scholarship.id === data.scholarId)
            ?.defaultBudget
          ? null
          : data.amount
        : undefined,
      doc: touchedFields.documents ? data.documents[0] : undefined,
    });
    console.log('formData', formData);
    return httpClient.patch(`${Api.APPLICATION}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const submitApplication = () => {
    return httpClient.patch(`${Api.APPLICATION_SUBMIT}/${id}`);
  };

  const onSave = (data: ApplyData) => {
    if (id) {
      updateApplication(data)
        .then(() => {
          navigateBack();
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 422) {
              navigateBack();
            } else if (error.response.status === 400) {
              alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            }
          }
        });
    } else {
      saveApplication(data)
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
    }
  };

  const onSubmit = (data: ApplyData) => {
    if (id) {
      updateApplication(data)
        .then(() => {
          submitApplication()
            .then(() => {
              navigateBack();
            })
            .catch((error) => {
              console.error(error);
              alert('ไม่สามารถส่งใบสมัครได้');
            });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 422) {
              submitApplication()
                .then(() => {
                  navigateBack();
                })
                .catch((error) => {
                  console.error(error);
                  alert('ไม่สามารถส่งใบสมัครได้');
                });
            } else if (error.response.status === 400) {
              alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            }
          }
        });
    } else {
      saveApplication(data)
        .then(() => {
          submitApplication()
            .then(() => {
              navigateBack();
            })
            .catch((error) => {
              console.error(error);
              alert('ไม่สามารถส่งใบสมัครได้');
            });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              alert('กรุณากรอกข้อมูลให้ครบถ้วน');
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
    errors,
    watch,
    handleScholarshipChange,
    handleSubmit,
    onSave,
    onSubmit,
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
