import { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from '../../constants/Api';
import { useNavigate } from 'react-router';
import { Path } from '../../constants/Path';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types/Roles';

export interface BasicRecipientInfo {
  StudentId: string;
  firstname: string;
  lastname: string;
}
export interface ConsiderAppData {
  appId: number;
  studentId: string;
  firstName: string;
  lastName: string;
  scholarName: string;
  defaultAmount: number | null;
  requestAmount: number | null;
  isFirstTime: boolean;
}

export interface Application {
  scholarName: string;
  defaultAmount: number;
  requestAmount: number | null;
  year: number;
  semester: number;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  advisorName: string | null;
  studentIDCardDocLink: string | null;
  studentBookBankDocLink: string | null;
}

const useRecipientHistoryController = () => {
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  const { roles } = useAuth();
  const [recipient, setrecipient] = useState<BasicRecipientInfo[]>([]);
  const [searchResults, setSearchResults] = useState<BasicRecipientInfo[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const [modalApp, setModalApp] = useState<Application[] | null>([]);
  const [modalStudentData, setModalStudentData] = useState<Student | null>(
    null,
  );

  const navigateToCreateAnnouncement = () => {
    navigate(Path.CONFIG_ANNOUNCEMENT);
  };

  useEffect(() => {
    let endpoint: string = Api.APPLICATION;
    if (roles.includes(Role.ADMIN)) {
      endpoint = `${Api.STUDENT}/search?search=${searchText}`;
    }
    httpClient.get<BasicRecipientInfo[]>(endpoint).then((response) => {
      setrecipient(response);
      setSearchResults(response);
    });
  }, [httpClient, roles, searchText, recipient]);

  const handleDocCheckClick = (studentId: string) => {
    httpClient
      .get<Application[]>(`${Api.APPLICATION}/history/${studentId}`)
      .then((res) => {
        setModalApp(res);
        httpClient
          .get<Student>(`${Api.STUDENT}/${studentId}`)
          .then((resStu) => {
            setModalStudentData(resStu);
          });
      });
  };

  const closeModal = () => {
    setModalApp(null);
    setModalStudentData(null);
  };

  return {
    searchResults,
    navigateToCreateAnnouncement,
    searchText,
    setSearchText,
    closeModal,
    handleDocCheckClick,
    modalApp,
    modalStudentData,
  };
};

export default useRecipientHistoryController;
