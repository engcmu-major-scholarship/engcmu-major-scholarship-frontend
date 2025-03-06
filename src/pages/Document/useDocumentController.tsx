import { useForm } from 'react-hook-form';
import { useHttpClient } from '../../hooks/useHttpClient';
import { useCallback, useEffect, useState } from 'react';
import {
  CurrentYearAndSem,
  RecipientData,
} from '../Recipient/useRecipientController';
import { Api } from '../../constants/Api';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types/Roles';

export interface DocumentData {
  recordDepartment: string;
  recordTel: string;
  recordDocNumber: string;
  recordDocDate: Date;
  recordHeadings: string;
  recordApprover: string;
  recordApproverName: string;
  recordApproverPosition: string;
  recordContent: string;
  heading: string;
  content: string;
  docDate: Date;
  approverName: string;
  approverPosition: string;
}

const useDocumentController = () => {
  const { register, handleSubmit, watch } = useForm<DocumentData>();
  const [, setRecipients] = useState<RecipientData[]>([]);
  const [filteredRecipients, setFilteredRecipients] = useState<RecipientData[]>(
    [],
  );
  const [allScholarships, setAllScholarships] = useState<string[]>([]);
  const [selectedScholarship, setSelectedScholarship] = useState<string | null>(
    null,
  );
  const { roles } = useAuth();
  const httpClient = useHttpClient();

  const fetchRecipients = useCallback(
    (year: number, semester: number) => {
      httpClient
        .get<RecipientData[]>(`${Api.RECIPIENT}/${year}/${semester}`)
        .then((response) => {
          const uniqueScholarships = Array.from(
            new Set(response.map((rec) => rec.scholarName)),
          );
          setAllScholarships(uniqueScholarships);
          setSelectedScholarship(uniqueScholarships[0]);
          setRecipients(response);
          setFilteredRecipients(
            response.filter((rec) => rec.scholarName === uniqueScholarships[0]),
          );
        });
    },
    [httpClient],
  );

  useEffect(() => {
    if (roles.includes(Role.ADMIN)) {
      httpClient
        .get<CurrentYearAndSem>(Api.CURRENT_YEAR_SEMESTER)
        .then((resCurYearSem) => {
          fetchRecipients(resCurYearSem.year, resCurYearSem.semester);
        });
    }
  }, [fetchRecipients, httpClient, roles]);

  return {
    register,
    watch,
    handleSubmit,
    filteredRecipients,
    allScholarships,
    selectedScholarship,
    setSelectedScholarship,
  };
};

export default useDocumentController;
