import { useEffect, useState } from 'react';
import { Api } from '../../constants/Api';
import { useHttpClient } from '../../hooks/useHttpClient';
export interface RecipientData {
  appId: number;
  studentId: string;
  firstName: string;
  lastName: string;
  scholarName: string;
  requestAmount: string;
}

const useSRController = () => {
  const [recipientData, setRecipientData] = useState<RecipientData[]>([]);
  const httpClient = useHttpClient();

  useEffect(() => {
    httpClient
      .get<RecipientData[]>(`${Api.RECIPIENT}/${2567}/${2}`)
      .then((response) => {
        setRecipientData(response);
      });
  }, []);

  return { recipientData };
};
export default useSRController;
