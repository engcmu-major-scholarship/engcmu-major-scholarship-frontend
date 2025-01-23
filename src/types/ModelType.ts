export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  user: User;
  advisor: Advisor;
  studentIdCard: string | null;
  bookBank: string | null;
}
export interface Admin {
  id: number;
  user: User;
}
export interface Advisor {
  id: number;
  user: User;
  name: string;
}
export interface Application {
  id: number;
  student: Student;
  semester: Semester;
  scholarship: Scholarship;
  requestAmount: number | null;
  grantedAmount: number | null;
  applicationDocument: string;
  submissionTime: Date | null;
  adminApprovalTime: Date | null;
  approvalComment: string | null;
  createdAt: Date;
}
export interface Config {
  id: number;
  applySemester: Semester;
}
export interface Disbursement {
  id: number;
  application: Application;
  disbursementDocument: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Scholarship {
  id: number;
  name: string;
  description: string;
  requirement: string;
  amount: number | null;
  openDate: Date;
  closeDate: Date;
  detailDocument: string;
  applicationDocument: string;
  published: boolean;
}
export interface Semester {
  id: number;
  year: Year;
  semester: number;
}
export interface User {
  id: string;
  CMUAccount: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Year {
  id: number;
  year: number;
}
