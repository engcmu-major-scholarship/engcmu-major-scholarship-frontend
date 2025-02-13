import useHomeController from './useHomeController';

const Home = () => {
  useHomeController();
  return (
    <div className="h-full w-full flex flex-col justify-center items-center overflow-auto"></div>
  );
};

export default Home;
