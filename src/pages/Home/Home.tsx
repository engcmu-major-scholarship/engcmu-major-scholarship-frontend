import useHomeController from './useHomeController';

const Home = () => {
  const { navigateToLogin } = useHomeController();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-9xl text-center">Hello World</div>
      <button
        className="w-64 h-12 border border-gray-300 rounded-lg hover:shadow-md cursor-pointer"
        onClick={navigateToLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Home;
