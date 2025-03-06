import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from '../../constants/Api';
import { BasicAnnouncementInfo } from '../Announcement/AnnouncementAll/useAnnouncementAllController';
import { Role } from '../../types/Roles';
import { CurrentYearAndSem } from '../Recipient/useRecipientController';
import { ConsiderAppData } from '../Consider/useConsiderController';
import { ApplyableScholarship } from '../Apply/useApplyController';
import { CurrentYearStatus } from '../Status/useStatusController';

const useHomeController = () => {
  const { token, roles } = useAuth();
  const httpClient = useHttpClient();
  const [announcements, setAnnouncements] = useState<BasicAnnouncementInfo[]>(
    [],
  );
  const [considers, setConsiders] = useState<ConsiderAppData[]>([]);
  const [scholarships, setScholarships] = useState<ApplyableScholarship[]>([]);
  const [currentYearStatus, setCurrentYearStatus] = useState<
    CurrentYearStatus[]
  >([]);

  const fetchConsiders = useCallback(
    (year: number, semester: number) => {
      httpClient
        .get<ConsiderAppData[]>(`${Api.CONSIDER}/${year}/${semester}`)
        .then((response) => {
          setConsiders(response);
        });
    },
    [httpClient],
  );

  useEffect(() => {
    if (roles.includes(Role.STUDENT)) {
      httpClient
        .get<ApplyableScholarship[]>(Api.APPLYABLE_SCHOLARSHIP)
        .then((response) => {
          setScholarships(response);
        });
    }
  }, [httpClient, roles]);

  useEffect(() => {
    if (roles.includes(Role.STUDENT)) {
      httpClient
        .get<CurrentYearStatus[]>(Api.CURRENT_YEAR_APPLICATION)
        .then((response) => {
          setCurrentYearStatus(response);
        });
    }
  }, [httpClient, roles]);

  useEffect(() => {
    if (roles.includes(Role.ADMIN)) {
      httpClient
        .get<CurrentYearAndSem>(Api.CURRENT_YEAR_SEMESTER)
        .then((resCurYearSem) => {
          fetchConsiders(resCurYearSem.year, resCurYearSem.semester);
        });
    }
  }, [fetchConsiders, httpClient, roles]);

  useEffect(() => {
    httpClient
      .get<BasicAnnouncementInfo[]>(Api.ANNOUNCEMENT)
      .then((response) => {
        setAnnouncements(response);
      });
  }, [httpClient]);

  return {
    token,
    roles,
    announcements,
    considers,
    scholarships,
    currentYearStatus,
  };
};

export default useHomeController;
