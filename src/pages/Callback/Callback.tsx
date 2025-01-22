import Loading from '../../components/Loading';
import useCallbackController from './useCallbackController';

const Callback = () => {
  useCallbackController();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Loading />
    </div>
  );
};

export default Callback;
