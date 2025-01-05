import useHomeController from './useHomeController';

const Home = () => {
  useHomeController();
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="text-9xl text-center">Home</div>
    </div>
  );
};

export default Home;
