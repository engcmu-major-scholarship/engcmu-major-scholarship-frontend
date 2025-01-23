import { useEffect, useState } from 'react';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { Api } from '../../../constants/Api';
import { useNavigate } from 'react-router';
import { Path } from '../../../constants/Path';
import { useAuth } from '../../../hooks/useAuth';
import { Role } from '../../../types/Roles';

//import { Application } from '../../../types/ModelType.ts';
export interface ApplicationInfo {
  appId: number;
  studentId: number;
  firstName: string;
  lastName: string;
  scholarName: string;
  requestAmount: number | null;
  adminApproveTime: Date | null;
  isFirstTime: Date | null;
}
export interface BasicScholarshipInfo {
  id: number;
  name: string;
  description: string;
}
const useConsiderScholarshipController = () => {
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  const { roles } = useAuth();
  const [applications, setApplications] = useState<ApplicationInfo[]>([]);
  //const [searchResults, setSearchResults] = useState<ApplicationInfo[]>([]);
  const [scholarships, setScholarships] = useState<BasicScholarshipInfo[]>([]);
  //const [searchText, setSearchText] = useState<string>('');

  // const navigateToCreateScholarship = () => {
  //   navigate(Path.CREATE_SCHOLARSHIP);
  // };

  useEffect(() => {
    let endpoint2: string = Api.SCHOLARSHIP;
    httpClient.get<BasicScholarshipInfo[]>(endpoint2).then((response) => {
      setScholarships(response);
    });

    let endpoint: string = `${Api.APPLICATION}/consider/2566/3`;
    httpClient.get<ApplicationInfo[]>(endpoint).then((response) => {
      setApplications(response);
    });
  }, [httpClient, roles]);

  useEffect(() => {
    //if (searchText === '') {
    // setSearchResults(applications);
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
  }, [scholarships, applications]); //, searchText

  return {
    scholarships,
    applications,
    //navigateToCreateScholarship,
    //searchText,
    //setSearchText,
  };
};

export default useConsiderScholarshipController;
