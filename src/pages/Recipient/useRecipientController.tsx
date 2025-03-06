import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Api } from '../../constants/Api';
import { useHttpClient } from '../../hooks/useHttpClient';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types/Roles';
import { useNavigate } from 'react-router';
import { Path } from '../../constants/Path';
import { Degree } from '../../types/Degree';

export interface RecipientData {
  appId: number;
  studentId: string;
  firstName: string;
  lastName: string;
  scholarName: string;
  defaultAmount: number | null;
  requestAmount: number | null;
  degress: Degree;
}

export interface YearAndSemesters {
  year: number;
  semesters: number[];
}

export interface CurrentYearAndSem {
  year: number;
  semester: number;
}

const useRecipientController = () => {
  const [recipients, setRecipients] = useState<RecipientData[]>([]);
  const [filteredRecipients, setFilteredRecipients] = useState<RecipientData[]>(
    [],
  );
  const [YAS, setYAS] = useState<YearAndSemesters[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedSemester, setSelectedSemester] = useState<number>(0);
  const [allScholarships, setAllScholarships] = useState<string[]>([]);
  const [selectedScholarship, setSelectedScholarship] = useState<string | null>(
    null,
  );
  const { roles } = useAuth();
  const httpClient = useHttpClient();
  const navigate = useNavigate();

  const fetchRecipients = useCallback(
    (year: number, semester: number) => {
      httpClient
        .get<RecipientData[]>(`${Api.RECIPIENT}/${year}/${semester}`)
        .then((response) => {
          setRecipients(response);
          setFilteredRecipients(response);
          setSelectedScholarship(null);
          setAllScholarships(
            Array.from(new Set(response.map((rec) => rec.scholarName))),
          );
        });
    },
    [httpClient],
  );

  useEffect(() => {
    if (roles.includes(Role.ADMIN)) {
      httpClient
        .get<YearAndSemesters[]>(Api.YEARS_SEMESTERS)
        .then((resyas) => setYAS(resyas));
      httpClient
        .get<CurrentYearAndSem>(Api.CURRENT_YEAR_SEMESTER)
        .then((resCurYearSem) => {
          setSelectedYear(resCurYearSem.year);
          setSelectedSemester(resCurYearSem.semester);
          fetchRecipients(resCurYearSem.year, resCurYearSem.semester);
        });
    }
  }, [fetchRecipients, httpClient, roles]);

  useEffect(() => {
    if (selectedScholarship) {
      setFilteredRecipients(
        recipients.filter((rec) => rec.scholarName === selectedScholarship),
      );
    } else {
      setFilteredRecipients(recipients);
    }
  }, [recipients, selectedScholarship]);

  const onYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
    fetchRecipients(Number(e.target.value), selectedSemester);
  };

  const onSemChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(Number(e.target.value));
    fetchRecipients(selectedYear, Number(e.target.value));
  };

  const navigateToDocPage = () => {
    navigate(Path.DOCUMENT);
  };

  return {
    filteredRecipients,
    YAS,
    selectedSemester,
    selectedYear,
    allScholarships,
    selectedScholarship,
    setSelectedScholarship,
    onYearChange,
    onSemChange,
    navigateToDocPage,
  };
};

export default useRecipientController;
