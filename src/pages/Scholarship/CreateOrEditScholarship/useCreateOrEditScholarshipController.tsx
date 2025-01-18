import { useEffect, useState } from 'react';
import { FieldNamesMarkedBoolean, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { useAuth } from '../../../hooks/useAuth';
import { Api } from '../../../constants/Api';
import { Role } from '../../../types/Roles';

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
  defaultBudget: number | null;
  description: string;
  requirement: string;
  openDate: Date | string;
  closeDate: Date | string;
  appDoc: File[];
  scholarDoc: File[];
  published: boolean;
}

const useCreateOrEditScholarshipController = () => {
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
    formState: { errors, isDirty, dirtyFields },
  } = useForm<CreateOrEditScholarshipForm>();
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
          reset({
            name: response.name,
            defaultBudget: response.defaultBudget,
            description: response.description,
            requirement: response.requirement,
            openDate: new Date(response.openDate).toISOString().split('T')[0],
            closeDate: new Date(response.closeDate).toISOString().split('T')[0],
            published: response.published,
          });
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
      httpClient.patch(
        `${Api.SCHOLARSHIP}/${id}`,
        {
          ...getOnlyDirtyFields(dirtyFields, data),
          defaultBudget: dirtyFields.defaultBudget
            ? !data.defaultBudget || data.defaultBudget === 0
              ? null
              : data.defaultBudget
            : undefined,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
    } else {
      httpClient.post(
        Api.SCHOLARSHIP,
        {
          ...data,
          defaultBudget:
            !data.defaultBudget || data.defaultBudget === 0
              ? null
              : data.defaultBudget,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
    }
    navigateBack();
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

function getOnlyDirtyFields<T extends Record<keyof T, unknown>>(
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<T>>>,
  data: T,
): Partial<T> {
  const dirtyData: Partial<T> = {};
  for (const key in dirtyFields) {
    if (dirtyFields[key]) {
      dirtyData[key as unknown as keyof T] = data[key as unknown as keyof T];
    }
  }
  return dirtyData;
}

export default useCreateOrEditScholarshipController;
