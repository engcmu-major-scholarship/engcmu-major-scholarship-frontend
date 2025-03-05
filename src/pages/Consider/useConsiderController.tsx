import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  CurrentYearAndSem,
  YearAndSemesters,
} from '../Recipient/useRecipientController';
import { Api } from '../../constants/Api';
import { useHttpClient } from '../../hooks/useHttpClient';

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

const useConsiderController = () => {
  const [considers, setConsiders] = useState<ConsiderAppData[]>([]);
  const [filteredConsiders, setFilteredConsiders] = useState<ConsiderAppData[]>(
    [],
  );
  const [YAS, setYAS] = useState<YearAndSemesters[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedSemester, setSelectedSemester] = useState<number>(0);
  const [allScholarships, setAllScholarships] = useState<string[]>([]);
  const [selectedScholarship, setSelectedScholarship] = useState<string | null>(
    null,
  );
  const httpClient = useHttpClient();

  const fetchConsiders = useCallback(
    (year: number, semester: number) => {
      httpClient
        .get<ConsiderAppData[]>(`${Api.CONSIDER}/${year}/${semester}`)
        .then((response) => {
          setConsiders(response);
          setFilteredConsiders(response);
          setSelectedScholarship(null);
          setAllScholarships(
            Array.from(new Set(response.map((rec) => rec.scholarName))),
          );
        });
    },
    [httpClient],
  );

  useEffect(() => {
    httpClient
      .get<YearAndSemesters[]>(Api.YEARS_SEMESTERS)
      .then((resyas) => setYAS(resyas));
    httpClient
      .get<CurrentYearAndSem>(Api.CURRENT_YEAR_SEMESTER)
      .then((resCurYearSem) => {
        setSelectedYear(resCurYearSem.year);
        setSelectedSemester(resCurYearSem.semester);
        fetchConsiders(resCurYearSem.year, resCurYearSem.semester);
      });
  }, [fetchConsiders, httpClient]);

  useEffect(() => {
    if (selectedScholarship) {
      setFilteredConsiders(
        considers.filter((rec) => rec.scholarName === selectedScholarship),
      );
    } else {
      setFilteredConsiders(considers);
    }
  }, [considers, selectedScholarship]);

  const onYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
    fetchConsiders(Number(e.target.value), selectedSemester);
  };

  const onSemChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(Number(e.target.value));
    fetchConsiders(selectedYear, Number(e.target.value));
  };

  return {
    filteredConsiders,
    YAS,
    selectedSemester,
    selectedYear,
    allScholarships,
    selectedScholarship,
    setSelectedScholarship,
    onYearChange,
    onSemChange,
  };
};

export default useConsiderController;
