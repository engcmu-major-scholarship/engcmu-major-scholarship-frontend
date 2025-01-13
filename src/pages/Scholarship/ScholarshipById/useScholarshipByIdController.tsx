import { useEffect, useState } from 'react';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { useNavigate, useParams } from 'react-router';
import { Api } from '../../../constants/Api';

export interface Scholarship {
  name: string;
  description: string;
  requirement: string;
  defaultBudget: number | null;
  openDate: Date;
  closeDate: Date;
  docLink: string;
  appDocLink: string;
}

const useScholarshipByIdController = () => {
  const httpClient = useHttpClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    httpClient.get<Scholarship>(`${Api.SCHOLARSHIP}/${id}`).then((response) => {
      setScholarship({
        ...response,
        openDate: new Date(response.openDate),
        closeDate: new Date(response.closeDate),
      });
    });
  }, [id, httpClient]);

  return {
    scholarship,
    navigateBack,
  };
};

export default useScholarshipByIdController;
