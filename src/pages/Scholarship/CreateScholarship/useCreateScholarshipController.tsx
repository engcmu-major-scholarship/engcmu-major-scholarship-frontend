import { useNavigate } from 'react-router';
import { Api } from '../../../constants/Api';
import { useHttpClient } from '../../../hooks/useHttpClient';

export interface CreateScholarshipForm {
  name: string;
  defaultBudget: number | null;
  description: string;
  requirement: string;
  openDate: Date;
  closeDate: Date;
  appDoc: File[];
  scholarDoc: File[];
  published: boolean;
}

const useCreateScholarshipController = () => {
  const httpClient = useHttpClient();
  const navigate = useNavigate();

  const onSubmit = (data: CreateScholarshipForm) => {
    httpClient
      .post(
        Api.SCHOLARSHIP,
        {
          name: data.name,
          description: data.description,
          requirement: data.requirement,
          defaultBudget: data.defaultBudget ? data.defaultBudget : undefined,
          openDate: data.openDate,
          closeDate: data.closeDate,
          published: data.published ? data.published : undefined,
          scholarDoc: data.scholarDoc[0],
          appDoc: data.appDoc[0],
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
        if (err.response) {
          if (err.response.status === 400) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
          } else if (err.response.status === 422) {
            alert('มีทุนชื่อนี้อยู่ในระบบแล้ว');
          }
        }
      });
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return {
    onSubmit,
    navigateBack,
  };
};

export default useCreateScholarshipController;
