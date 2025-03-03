import { useEffect, useState } from 'react';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { Api } from '../../../constants/Api';
import { useNavigate } from 'react-router';
import { Path } from '../../../constants/Path';
import { useAuth } from '../../../hooks/useAuth';
import { Role } from '../../../types/Roles';

export interface BasicAnnouncementInfo {
  id: number;
  name: string;
  description: string;
}

const useAnnouncementAllController = () => {
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  const { roles } = useAuth();
  const [announcements, setAnnouncements] = useState<BasicAnnouncementInfo[]>(
    [],
  );
  const [searchResults, setSearchResults] = useState<BasicAnnouncementInfo[]>(
    [],
  );
  const [searchText, setSearchText] = useState<string>('');

  const navigateToCreateAnnouncement = () => {
    navigate(Path.CONFIG_ANNOUNCEMENT);
  };

  useEffect(() => {
    let endpoint: string = Api.ANNOUNCEMENT;
    if (roles.includes(Role.ADMIN)) {
      endpoint = `${Api.ANNOUNCEMENT}/admin`;
    }
    httpClient.get<BasicAnnouncementInfo[]>(endpoint).then((response) => {
      setAnnouncements(response);
      setSearchResults(response);
    });
  }, [httpClient, roles]);

  useEffect(() => {
    if (searchText === '') {
      setSearchResults(announcements);
    } else {
      const results = announcements.filter(
        (announcement) =>
          announcement.name.toLowerCase().includes(searchText.toLowerCase()) ||
          announcement.description
            .toLowerCase()
            .includes(searchText.toLowerCase()),
      );
      setSearchResults(results);
    }
  }, [announcements, searchText]);

  return {
    searchResults,
    navigateToCreateAnnouncement,
    searchText,
    setSearchText,
  };
};

export default useAnnouncementAllController;
