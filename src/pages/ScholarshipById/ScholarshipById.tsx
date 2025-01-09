import useScholarshipByIdController from './useScholarshipByIdController';

const ScholarshipById = () => {
  const { scholarship } = useScholarshipByIdController();

  if (!scholarship) {
    return <div>Loading...</div>;
  }
  return <div>{scholarship.toString()}</div>;
};

export default ScholarshipById;
