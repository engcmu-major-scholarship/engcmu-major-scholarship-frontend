import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from '../../constants/Api';
import { Role } from '../../types/Roles';

export interface CurrentYearSemester {
  year: number;
  semester: number;
}

export interface CurrentYearStatus {
  appId: number;
  scholarName: string;
  year: number;
  semester: number;
  submissionTime: Date | null;
  adminApproveTime: Date | null;
}

const useStatusController = () => {
  const { roles } = useAuth();
  const httpClient = useHttpClient();
  const [currentYearSemester, setCurrentYearSemester] =
    useState<CurrentYearSemester | null>(null);
  const [currentYearStatus, setCurrentYearStatus] = useState<
    CurrentYearStatus[]
  >([]);

  useEffect(() => {
    httpClient
      .get<CurrentYearSemester>(Api.CURRENT_YEAR_SEMESTER)
      .then((response) => {
        setCurrentYearSemester(response);
      });
    if (roles.includes(Role.STUDENT)) {
      httpClient
        .get<CurrentYearStatus[]>(Api.CURRENT_YEAR_APPLICATION)
        .then((response) => {
          setCurrentYearStatus(response);
        });
    }
  }, [httpClient, roles]);
  return {
    currentYearSemester,
    currentYearStatus,
  };
};

export default useStatusController;
