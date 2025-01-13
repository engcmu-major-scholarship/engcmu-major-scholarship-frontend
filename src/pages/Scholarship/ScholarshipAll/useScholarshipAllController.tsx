import { useEffect, useState } from 'react';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { Api } from '../../../constants/Api';
import { useNavigate } from 'react-router';
import { Path } from '../../../constants/Path';
import { useAuth } from '../../../hooks/useAuth';
import { Role } from '../../../types/Roles';

export interface BasicScholarshipInfo {
  id: number;
  name: string;
  description: string;
}

const useScholarshipAllController = () => {
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  const { roles } = useAuth();
  const [scholarships, setScholarships] = useState<BasicScholarshipInfo[]>([]);

  const navigateToCreateScholarship = () => {
    navigate(Path.CREATE_SCHOLARSHIP);
  };

  useEffect(() => {
    let endpoint: string = Api.SCHOLARSHIP;
    if (roles.includes(Role.ADMIN)) {
      endpoint = `${Api.SCHOLARSHIP}/admin`;
    }
    httpClient.get<BasicScholarshipInfo[]>(endpoint).then((response) => {
      setScholarships(response);
    });
  }, [httpClient, roles]);

  return {
    scholarships,
    navigateToCreateScholarship,
  };
};

export default useScholarshipAllController;
