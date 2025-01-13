import { useEffect, useState } from 'react';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { Api } from '../../../constants/Api';
import { useNavigate } from 'react-router';
import { Path } from '../../../constants/Path';

export interface BasicScholarshipInfo {
  id: number;
  name: string;
  description: string;
}

const useScholarshipAllController = () => {
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState<BasicScholarshipInfo[]>([]);

  const navigateToCreateScholarship = () => {
    navigate(Path.CREATE_SCHOLARSHIP);
  };

  useEffect(() => {
    httpClient.get<BasicScholarshipInfo[]>(Api.SCHOLARSHIP).then((response) => {
      setScholarships(response);
    });
  }, [httpClient]);

  return {
    scholarships,
    navigateToCreateScholarship,
  };
};

export default useScholarshipAllController;
