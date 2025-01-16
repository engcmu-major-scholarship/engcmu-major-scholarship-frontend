import { useNavigate, useParams } from 'react-router';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { useEffect, useState } from 'react';
import { Api } from '../../../constants/Api';
import { useAuth } from '../../../hooks/useAuth';
import { Role } from '../../../types/Roles';
import { Scholarship } from '../ScholarshipById/useScholarshipByIdController';
import { useForm } from 'react-hook-form';

export interface EditScholarshipForm {
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

const useEditScholarshipController = () => {
  const { id } = useParams();
  const { roles } = useAuth();
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    resetField,
    formState: { errors, isDirty },
  } = useForm<EditScholarshipForm>();
  const [oldScholarship, setOldScholarship] = useState<Scholarship | null>(
    null,
  );
  const [oldScholarDoc, setOldScholarDoc] = useState<File | null>(null);
  const [oldAppDoc, setOldAppDoc] = useState<File | null>(null);
  const [isScholarDocLoading, setIsScholarDocLoading] = useState(true);
  const [isAppDocLoading, setIsAppDocLoading] = useState(true);

  const onSubmit = (data: EditScholarshipForm) => {
    httpClient
      .patch(
        `${Api.SCHOLARSHIP}/${id}`,
        {
          name: data.name === oldScholarship?.name ? undefined : data.name,
          description:
            data.description === oldScholarship?.description
              ? undefined
              : data.description,
          requirement:
            data.requirement === oldScholarship?.requirement
              ? undefined
              : data.requirement,
          defaultBudget:
            data.defaultBudget === oldScholarship?.defaultBudget
              ? undefined
              : !data.defaultBudget || data.defaultBudget === 0
                ? null
                : data.defaultBudget,
          openDate:
            data.openDate ===
            oldScholarship?.openDate.toISOString().split('T')[0]
              ? undefined
              : new Date(data.openDate),
          closeDate:
            data.closeDate ===
            oldScholarship?.closeDate.toISOString().split('T')[0]
              ? undefined
              : new Date(data.closeDate),
          published:
            data.published === oldScholarship?.published
              ? undefined
              : data.published,
          scholarDoc:
            data.scholarDoc[0] === oldScholarDoc
              ? undefined
              : data.scholarDoc[0],
          appDoc: data.appDoc[0] === oldAppDoc ? undefined : data.appDoc[0],
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        console.error(err);
        alert('เกิดข้อผิดพลาดในการแก้ไขข้อมูล');
      });
  };

  useEffect(() => {
    if (roles.includes(Role.ADMIN)) {
      httpClient
        .get<Scholarship>(`${Api.SCHOLARSHIP}/admin/${id}`)
        .then((response) => {
          setOldScholarship({
            ...response,
            openDate: new Date(response.openDate),
            closeDate: new Date(response.closeDate),
          });
          resetField('name', {
            defaultValue: response.name,
          });
          resetField('description', {
            defaultValue: response.description,
          });
          resetField('requirement', {
            defaultValue: response.requirement,
          });
          resetField('defaultBudget', {
            defaultValue: response.defaultBudget,
          });
          resetField('openDate', {
            defaultValue: new Date(response.openDate)
              .toISOString()
              .split('T')[0],
          });
          resetField('closeDate', {
            defaultValue: new Date(response.closeDate)
              .toISOString()
              .split('T')[0],
          });
          resetField('published', { defaultValue: response.published });
          fetch(response.docLink).then((blobResponse) => {
            blobResponse.blob().then((blob) => {
              const scholarDoc = new File([blob], response.name, {
                type: blob.type,
              });
              setOldScholarDoc(scholarDoc);
              resetField('scholarDoc', { defaultValue: [scholarDoc] });
              setIsScholarDocLoading(false);
            });
          });
          fetch(response.appDocLink).then((blobResponse) => {
            blobResponse.blob().then((blob) => {
              const appDoc = new File([blob], response.name, {
                type: blob.type,
              });
              setOldAppDoc(appDoc);
              resetField('appDoc', { defaultValue: [appDoc] });
              setIsAppDocLoading(false);
            });
          });
        });
    }
  }, [httpClient, id, roles, resetField]);

  const navigateBack = () => {
    navigate(-1);
  };

  return {
    onSubmit,
    navigateBack,
    register,
    watch,
    handleSubmit,
    errors,
    isScholarDocLoading,
    isAppDocLoading,
    isDirty,
  };
};

export default useEditScholarshipController;
