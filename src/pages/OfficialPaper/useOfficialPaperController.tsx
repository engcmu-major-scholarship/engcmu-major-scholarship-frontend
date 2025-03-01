import { useEffect, useState } from "react";
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from "../../constants/Api";

interface Student {
  id: number;
  name: string;
  studentId: string;
  amount: string;
  degree: string;
  approved: boolean;
}

export function useOfficialPaperController() {
  const [formData, setFormData] = useState({
    title: '',
    detail: '',
    semester: '',
    year: '',
    description: '',
    totalAmount: '',
    totalText: '',
    date: new Date().toISOString().split("T")[0],
    students: [] as Student[],
    approverName: '',
    approverPosition: '',
    additionalNotes: '',
    facultySection: '',
    tel: '',
    documentNumber: '',
    documentDate: '',
    topic: '',
    toApprover: '',
    memoDetail: '',
    memoApproverName: '',
    memoApproverPosition: '',
  });

  const httpClient = useHttpClient();

  useEffect(() => {
    httpClient
      .get<{ students?: Student[], doclink?: string }>(Api.SCHOLARSHIP)
      .then((response) => {
        console.log("API Response:", response);
        const students = response.students ?? [];
        const doclink = response.doclink ?? "";
        setFormData((prev) => ({
          ...prev,
          students: students.filter((s) => s.approved),
          doclink: doclink, 
        }));
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return { formData, handleChange };
}
