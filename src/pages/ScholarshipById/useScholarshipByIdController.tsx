import { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import { useParams } from 'react-router';
import { Api } from '../../constants/Api';

export type Scholarship = {
  name: string;
  description: string;
  requirement: string;
  defaultBudget: number | null;
  docLink: string;
  appDocLink: string;
  isPublic: boolean;
};

const useScholarshipByIdController = () => {
  const httpClient = useHttpClient();
  const { id } = useParams();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);

  useEffect(() => {
    httpClient.get<Scholarship>(`${Api.SCHOLARSHIP}/${id}`).then((response) => {
      setScholarship(response);
    });
  }, [id, httpClient]);

  return {
    scholarship,
  };
};

export default useScholarshipByIdController;
