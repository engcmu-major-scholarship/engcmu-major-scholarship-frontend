import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types/Roles';
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from '../../constants/Api';
import { useNavigate } from 'react-router';

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

const useProfileController = () => {
  const { roles } = useAuth();
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  const {
    register,
    watch,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<EditStudentProfile>();
  const [name, setName] = useState<string>('');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useEffect(() => {
    if (roles.includes(Role.STUDENT)) {
      httpClient.get<StudentProfile>(Api.STUDENT_PROFILE).then((data) => {
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
    console.log(data);
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
    profile,
    isCancelModalOpen,
    setIsCancelModalOpen,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
  };
};

export default useProfileController;
