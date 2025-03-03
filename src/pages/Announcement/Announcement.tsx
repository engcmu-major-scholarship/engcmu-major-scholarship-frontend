import { useParams } from 'react-router';
import AnnouncementById from './AnnouncementById/AnnouncementById';
import AnnouncementAll from './AnnouncementAll/AnnouncementAll';

const Announcement = () => {
  const { id } = useParams();
  if (id) {
    return <AnnouncementById />;
  } else {
    return <AnnouncementAll />;
  }
};

export default Announcement;
