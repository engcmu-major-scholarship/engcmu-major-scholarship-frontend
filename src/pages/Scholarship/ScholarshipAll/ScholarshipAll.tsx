import { useNavigate } from 'react-router';
import useScholarshipAllController from './useScholarshipAllController';
import { Path } from '../../../constants/Path';

const ScholarshipAll = () => {
  const { scholarships } = useScholarshipAllController();
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="w-full p-4 text-xl text-center">ทุนทั้งหมด</div>
      <div className="w-full pb-6 flex flex-col gap-3 items-center">
        {scholarships.map((scholarship, index) => (
          <div
            key={index}
            className="flex flex-col w-9/12 p-12 bg-[#E4F0F1] rounded-lg"
          >
            <div className="text-lg font-bold">{scholarship.name}</div>
            <div className="text-sm">{scholarship.description}</div>
            <button
              className="text-sm mt-2 text-end underline"
              onClick={() => navigate(`${Path.SCHOLARSHIP}/${scholarship.id}`)}
            >
              {'ดูรายละเอียดทุน'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipAll;
