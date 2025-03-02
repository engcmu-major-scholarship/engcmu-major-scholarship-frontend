import { useEffect, useState } from "react";
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from "../../constants/Api";

interface Student {
  id: number;
  name: string;
  studentId: string;
  amount: string;
  degree: string;
  adminApprovalTime?: string;
}

export function useOfficialPaperController() {
  const [formData, setFormData] = useState({
    title: '',
    detail: '',
    semester: '',
    year: '',
    description: '',
    totalAmount: '0',
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const httpClient = useHttpClient();

  useEffect(() => {
    setLoading(true);
    httpClient
      .get<{ students?: Student[], doclink?: string }>(Api.SCHOLARSHIP)
      .then((response) => {
        console.log("API Response:", response);
        const students = response.students ?? [];
        const doclink = response.doclink ?? "";
        

        const approvedStudents = students.filter((s) => s.adminApprovalTime);
        
        const total = approvedStudents.reduce((sum, student) => {
          return sum + (parseFloat(student.amount) || 0);
        }, 0);
        
        setFormData((prev) => ({
          ...prev,
          students: approvedStudents,
          totalAmount: total.toString(),
          doclink: doclink,
        }));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setError("ไม่สามารถดึงข้อมูลนักศึกษาได้");
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return num.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return { formData, handleChange, loading, error, formatCurrency };
}