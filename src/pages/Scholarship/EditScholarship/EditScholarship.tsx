import useEditScholarshipController from './useEditScholarshipController';

const EditScholarship = () => {
  useEditScholarshipController();
  return (
    <div className="h-full w-full flex flex-col overflow-auto overflow-y-auto">
      Edit Scholarship
    </div>
  );
};

export default EditScholarship;
