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
  const [searchResults, setSearchResults] = useState<BasicScholarshipInfo[]>(
    [],
  );
  const [searchText, setSearchText] = useState<string>('');

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
      setSearchResults(response);
    });
  }, [httpClient, roles]);

  useEffect(() => {
    if (searchText === '') {
      setSearchResults(scholarships);
    } else {
      const results = scholarships.filter(
        (scholarship) =>
          scholarship.name.toLowerCase().includes(searchText.toLowerCase()) ||
          scholarship.description
            .toLowerCase()
            .includes(searchText.toLowerCase()),
      );
      setSearchResults(results);
    }
  }, [scholarships, searchText]);

  return {
    searchResults,
    navigateToCreateScholarship,
    searchText,
    setSearchText,
  };
};

export default useScholarshipAllController;
