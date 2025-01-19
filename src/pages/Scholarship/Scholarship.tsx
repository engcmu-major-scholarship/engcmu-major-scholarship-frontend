import { useParams } from 'react-router';
import ScholarshipById from './ScholarshipById/ScholarshipById';
import ScholarshipAll from './ScholarshipAll/ScholarshipAll';

const Scholarship = () => {
  const { id } = useParams();
  if (id) {
    return <ScholarshipById />;
  } else {
    return <ScholarshipAll />;
  }
};

export default Scholarship;
