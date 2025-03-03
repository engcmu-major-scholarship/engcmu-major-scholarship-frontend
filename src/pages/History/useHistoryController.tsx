import { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from '../../constants/Api';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types/Roles';

export interface ApplicationHistory {
  scholarName: string;
  budget: number | null;
  year: number;
  semester: number;
  submissionTime: Date | null;
  adminApprovalTime: Date | null;
}

const useHistoryController = () => {
  const { token, roles } = useAuth();
  const httpClient = useHttpClient();
  const [history, setHistory] = useState<ApplicationHistory[]>([]);

  useEffect(() => {
    if (token && roles.includes(Role.STUDENT)) {
      httpClient
        .get<ApplicationHistory[]>(Api.APPLICATION_HISTORY)
        .then((response) => {
          setHistory(
            response
              .map((application) => ({
                ...application,
                submissionTime: application.submissionTime
                  ? new Date(application.submissionTime)
                  : null,
                adminApprovalTime: application.adminApprovalTime
                  ? new Date(application.adminApprovalTime)
                  : null,
              }))
              .sort((a, b) => {
                if (a.year === b.year) {
                  return a.semester - b.semester;
                }
                return a.year - b.year;
              }),
          );
        });
    }
  }, [httpClient, roles, token]);

  return {
    history,
  };
};

export default useHistoryController;
