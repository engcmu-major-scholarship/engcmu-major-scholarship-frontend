import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types/Roles';
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from '../../constants/Api';
import { useNavigate } from 'react-router';
import { objectToFromData } from '../../utils/objectToFormData';

export interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  advisorId: number;
  studentIdCard: string | null;
  bookBank: string | null;
}

export interface EditStudentProfile {
  advisorId: number;
  studentIdCard: File[];
  bookBank: File[];
}

export interface Advisor {
  id: number;
  name: string;
}

const useProfileController = () => {
  const { roles } = useAuth();
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  const {
    register,
    watch,
    resetField,
    handleSubmit,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm<EditStudentProfile>();
  const [name, setName] = useState<string>('');
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useEffect(() => {
    if (roles.includes(Role.STUDENT)) {
      httpClient.get<Advisor[]>(Api.ADVISOR).then((data) => {
        setAdvisors(data);
      });
      httpClient.get<StudentProfile>(Api.STUDENT).then((data) => {
        setName(data.firstName + ' ' + data.lastName);
        setProfile(data);
        resetField('advisorId', { defaultValue: data.advisorId });
        if (data.studentIdCard) {
          fetch(data.studentIdCard).then((res) => {
            res.blob().then((blob) => {
              const file = new File([blob], 'studentIdCard', {
                type: blob.type,
              });
              resetField('studentIdCard', { defaultValue: [file] });
            });
          });
        }
        if (data.bookBank) {
          fetch(data.bookBank).then((res) => {
            res.blob().then((blob) => {
              const file = new File([blob], 'bookBank', {
                type: blob.type,
              });
              resetField('bookBank', { defaultValue: [file] });
            });
          });
        }
      });
    }
  }, [httpClient, resetField, roles]);

  const onSubmit = (data: EditStudentProfile) => {
    const formData = objectToFromData({
      advisorId: dirtyFields.advisorId ? data.advisorId : undefined,
      studentIdCard: touchedFields.studentIdCard
        ? data.studentIdCard[0]
        : undefined,
      bookBank: touchedFields.bookBank ? data.bookBank[0] : undefined,
    });
    httpClient
      .patch(Api.STUDENT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        navigateBack();
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          if (err.response.status === 422) {
            navigateBack();
          } else if (err.response.status === 400) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
          } else {
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
          }
        }
      });
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return {
    register,
    watch,
    errors,
    handleSubmit,
    onSubmit,
    navigateBack,
    name,
    advisors,
    profile,
    isCancelModalOpen,
    setIsCancelModalOpen,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
  };
};

export default useProfileController;
