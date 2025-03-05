import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from '../../constants/Api';
import { BasicAnnouncementInfo } from '../Announcement/AnnouncementAll/useAnnouncementAllController';

const useHomeController = () => {
  const { token, roles } = useAuth();
  const httpClient = useHttpClient();
  const [announcements, setAnnouncements] = useState<BasicAnnouncementInfo[]>(
    [],
  );

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
  };
};

export default useHomeController;
