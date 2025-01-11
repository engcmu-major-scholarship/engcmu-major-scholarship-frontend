import { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import { useParams } from 'react-router';
import { Api } from '../../constants/Api';

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
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);

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
  };
};

export default useScholarshipByIdController;
