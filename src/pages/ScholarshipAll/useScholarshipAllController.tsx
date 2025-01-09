import { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from '../../constants/Api';

export type BasicScholarshipInfo = {
  id: number;
  name: string;
  detail: string;
};

const useScholarshipAllController = () => {
  const httpClient = useHttpClient();
  const [scholarships, setScholarships] = useState<BasicScholarshipInfo[]>([]);

  useEffect(() => {
    httpClient.get<BasicScholarshipInfo[]>(Api.SCHOLARSHIP).then((response) => {
      setScholarships(response);
    });
  }, [httpClient]);

  return {
    scholarships,
  };
};

export default useScholarshipAllController;
