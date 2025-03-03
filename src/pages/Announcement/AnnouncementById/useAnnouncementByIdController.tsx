import { useEffect, useState } from 'react';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { useNavigate, useParams } from 'react-router';
import { Api } from '../../../constants/Api';
import { useAuth } from '../../../hooks/useAuth';
import { Role } from '../../../types/Roles';

export interface Announcement {
  name: string;
  description: string;
  docLink: string | null;
  published: boolean;
}

const useAnnouncementByIdController = () => {
  const { roles } = useAuth();
  const httpClient = useHttpClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    let endpoint: string = `${Api.ANNOUNCEMENT}/${id}`;
    if (roles.includes(Role.ADMIN)) {
      endpoint = `${Api.ANNOUNCEMENT}/admin/${id}`;
    }
    httpClient.get<Announcement>(endpoint).then((response) => {
      setAnnouncement(response);
    });
  }, [id, httpClient, roles]);

  return {
    announcement,
    navigateBack,
  };
};

export default useAnnouncementByIdController;
