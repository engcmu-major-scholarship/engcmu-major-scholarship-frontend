import { useEffect, useState } from 'react';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { useNavigate, useParams } from 'react-router';
import { Api } from '../../../constants/Api';
import { useAuth } from '../../../hooks/useAuth';
import { Role } from '../../../types/Roles';

export interface Scholarship {
  name: string;
  description: string;
  requirement: string;
  defaultBudget: number | null;
  openDate: Date;
  closeDate: Date;
  docLink: string;
  appDocLink: string;
  published: boolean;
}

const useScholarshipByIdController = () => {
  const { roles } = useAuth();
  const httpClient = useHttpClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    let endpoint: string = `${Api.SCHOLARSHIP}/${id}`;
    if (roles.includes(Role.ADMIN)) {
      endpoint = `${Api.SCHOLARSHIP}/admin/${id}`;
    }
    httpClient.get<Scholarship>(endpoint).then((response) => {
      setScholarship({
        ...response,
        openDate: new Date(response.openDate),
        closeDate: new Date(response.closeDate),
      });
    });
  }, [id, httpClient, roles]);

  return {
    scholarship,
    navigateBack,
  };
};

export default useScholarshipByIdController;
