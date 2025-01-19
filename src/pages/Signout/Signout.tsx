import Loading from '../../components/Loading';
import useSignoutController from './useSignoutController';

const Signout = () => {
  useSignoutController();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Loading />
    </div>
  );
};

export default Signout;
