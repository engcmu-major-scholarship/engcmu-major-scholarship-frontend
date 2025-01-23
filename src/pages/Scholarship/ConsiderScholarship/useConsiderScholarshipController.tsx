import { useEffect, useState } from 'react';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { Api } from '../../../constants/Api';
import { useNavigate } from 'react-router';
import { Path } from '../../../constants/Path';
import { useAuth } from '../../../hooks/useAuth';
import { Role } from '../../../types/Roles';

import { Application } from '../../../types/ModelType.ts';

const useConsiderScholarshipController = () => {
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  const { roles } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchResults, setSearchResults] = useState<Application[]>([]);
  //const [searchText, setSearchText] = useState<string>('');

  // const navigateToCreateScholarship = () => {
  //   navigate(Path.CREATE_SCHOLARSHIP);
  // };

  useEffect(() => {
    let endpoint: string = `${Api.APPLICATION}/consider/2566/1`;
    // if (roles.includes(Role.ADMIN)) {
    //   endpoint = `${Api.CONSIDER}/admin`;
    // }
    httpClient.get<Application[]>(endpoint).then((response) => {
      setApplications(response);
      // setSearchResults(response);
    });
  }, [httpClient, roles]);

  useEffect(() => {
    //if (searchText === '') {
    setSearchResults(applications);
    // } else {
    //   const results = scholarships.filter(
    //     (scholarship) =>
    //       scholarship.name.toLowerCase().includes(searchText.toLowerCase()) ||
    //       scholarship.description
    //         .toLowerCase()
    //         .includes(searchText.toLowerCase()),
    //   );
    //   setSearchResults(results);
    // }
  }, [applications]); //, searchText

  return {
    searchResults,
    //navigateToCreateScholarship,
    //searchText,
    //setSearchText,
  };
};

export default useConsiderScholarshipController;
