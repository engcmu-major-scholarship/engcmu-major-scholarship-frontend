import { ChangeEvent, useEffect, useState } from 'react';
import { Api } from '../../constants/Api';
import { useHttpClient } from '../../hooks/useHttpClient';
export interface RecipientData {
  appId: number;
  studentId: string;
  firstName: string;
  lastName: string;
  scholarName: string;
  requestAmount: string;
}
export interface YearAndSemesters {
  year: number;
  semesters: number[];
}

export interface CurrentYearAndSem {
  year: number;
  semester: number;
}

const useSRController = () => {
  const [recipientData, setRecipientData] = useState<RecipientData[]>([]);
  const [YAS, setYAS] = useState<YearAndSemesters[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedSemester, setSelectedSemester] = useState<number>(0);
  const httpClient = useHttpClient();

  useEffect(() => {
    httpClient
      .get<YearAndSemesters[]>(Api.YEARS_SEMESTERS)
      .then((resyas) => setYAS(resyas));
    httpClient
      .get<CurrentYearAndSem>(Api.CURRENT_YEAR_SEMESTER)
      .then((resCurYearSem) => {
        setSelectedYear(resCurYearSem.year);
        setSelectedSemester(resCurYearSem.semester);
        fetchRecipient(resCurYearSem.year, resCurYearSem.semester);
      });
  }, []);
  const onYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
    fetchRecipient(Number(e.target.value), selectedSemester);
  };

  const onSemChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(Number(e.target.value));
    fetchRecipient(selectedYear, Number(e.target.value));
  };

  const fetchRecipient = (year: number, semester: number) => {
    httpClient
      .get<RecipientData[]>(`${Api.RECIPIENT}/${year}/${semester}`)
      .then((response) => {
        setRecipientData(response);
      });
  };

  return {
    recipientData,
    YAS,
    selectedSemester,
    selectedYear,
    onYearChange,
    onSemChange,
  };
};
export default useSRController;
