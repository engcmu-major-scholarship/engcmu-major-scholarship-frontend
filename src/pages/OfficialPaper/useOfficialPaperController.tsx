import { useEffect, useState } from "react";
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from "../../constants/Api";

interface Student {
  appId: number,
	studentId: string,
	firstName: string,
	lastName: string,
	scholarName: string,
	requestAmount: number,
}

const useOfficialPaperController = () => {
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
  const [recipient,setRecipient] = useState<Student[]>([]);

  useEffect(() => {
    const fetchRecipient = async () => {
      try{
        const response = await httpClient.get<Student[]>(
          `${Api.APPLICATION}/recipient/2567/2`
        );
        setRecipient(response);
      }catch(error){
          console.error("ไม่สามารถดึงข้อมูลนักศึกษาได้");
        }
      };
      fetchRecipient();
  }, [httpClient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return num.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return { formData, handleChange, loading, error, formatCurrency, recipient,};
}

export default useOfficialPaperController;