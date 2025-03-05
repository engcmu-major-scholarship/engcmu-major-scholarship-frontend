import { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import { Api } from '../../constants/Api';
import { useNavigate } from 'react-router';

//import { Application } from '../../../types/ModelType.ts';
export interface ApplicationInfo {
  appId: number;
  studentId: number;
  firstName: string;
  lastName: string;
  scholarName: string;
  requestAmount: number | null;
  adminApproveTime: Date | null;
  isFirstTime: boolean;
  approvalComment: string | null;
  docLink: string | null;
}
export interface GetApplication {
  scholarId: number;
  budget: number | null;
  doc: string;
}
export interface BasicScholarshipInfo {
  id: number;
  name: string;
  description: string;
}

export interface YearSemester {
  year: number;
  semester: number;
}
export interface YearSemesterGroup {
  year: number;
  semesters: number[];
}
const useConsiderScholarshipController = () => {
  const httpClient = useHttpClient();
  const navigate = useNavigate();

  const [applications, setApplications] = useState<ApplicationInfo[]>([]);
  const [filterResults, setFilterResults] = useState<ApplicationInfo[]>([]);
  const [scholarships, setScholarships] = useState<BasicScholarshipInfo[]>([]);
  const [filterText, setFilterText] = useState<string>('');

  const [yearSemesters, setYearSemesters] = useState<YearSemesterGroup[]>([]);
  const [currentYearSemester, setCurrentYearSemester] =
    useState<YearSemester | null>(null);
  const [selectedYearSemester, setSelectedYearSemester] =
    useState<YearSemester | null>(null);
  interface ApproveResponse {
    data: string;
    message: string;
    application: ApplicationInfo; // หรือใช้ type ที่ตรงกับโครงสร้างของ application
  }
  const approveApplication = async (appId: number, comment: string) => {
    try {
      const response = await httpClient.patch<ApproveResponse>(
        `${Api.APPLICATION}/approve/${appId}`,
        { comment },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      navigate(0);
      console.log('✅ Application approved successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error during application approval:', error);
      throw error; // ✅ ให้ handleApprove จัดการ error
    }
  };

  useEffect(() => {
    const fetchYearSemesters = async () => {
      try {
        const response = await httpClient.get<YearSemesterGroup[]>(
          `${Api.SETTING}/years-and-semesters`,
        );
        setYearSemesters(response);
      } catch (error) {
        console.error('Error fetching years and semesters:', error);
      }
    };

    const fetchCurrentYearSemester = async () => {
      try {
        const response = await httpClient.get<YearSemester>(
          `${Api.SETTING}/current-year-semester`,
        );
        setCurrentYearSemester(response);
        setSelectedYearSemester(response);
      } catch (error) {
        console.error('Error fetching current year and semester:', error);
      }
    };

    fetchYearSemesters();
    fetchCurrentYearSemester();
  }, [httpClient]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await httpClient.get<BasicScholarshipInfo[]>(
          Api.SCHOLARSHIP,
        );
        setScholarships(response);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      }
    };

    fetchScholarships();
  }, [httpClient]);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!selectedYearSemester) return;

      try {
        const response = await httpClient.get<ApplicationInfo[]>(
          `${Api.APPLICATION}/consider/${selectedYearSemester.year}/${selectedYearSemester.semester}`,
        );

        // ดึงข้อมูล docLink ของแต่ละแอปพลิเคชัน
        const applicationsWithDocLink = await Promise.all(
          response.map(async (application) => {
            try {
              const docResponse = await httpClient.get<GetApplication>(
                `${Api.APPLICATION}/${application.appId}`,
              );
              return {
                ...application,
                docLink: docResponse.doc, // เพิ่ม docLink เข้าไปในแต่ละ Application
              };
            } catch (error) {
              console.error(
                `Error fetching docLink for appId ${application.appId}:`,
                error,
              );
              return application; // ถ้าผิดพลาด ก็คืนค่าตัวเดิม
            }
          }),
        );

        setApplications(applicationsWithDocLink); // อัปเดต state ด้วยข้อมูลที่ได้
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, [selectedYearSemester, httpClient]); // ดึงข้อมูลเมื่อ selectedYearSemester เปลี่ยนแปลง

  useEffect(() => {
    if (!filterText) {
      setFilterResults(applications);
      return;
    }

    const results = applications.filter((application) =>
      application.scholarName?.toLowerCase().includes(filterText.toLowerCase()),
    );
    setFilterResults(results);
  }, [filterText, applications]);

  return {
    scholarships,
    filterResults,
    filterText,
    setFilterText,
    yearSemesters,
    currentYearSemester,
    selectedYearSemester,
    setSelectedYearSemester,
    approveApplication,
  };
};

export default useConsiderScholarshipController;
