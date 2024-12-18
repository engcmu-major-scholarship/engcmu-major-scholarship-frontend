import useHomeController from './useHomeController';

const Home = () => {
  const { token, navigateToSignin } = useHomeController();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-9xl text-center">Home</div>
      <button
        className="w-64 h-12 border border-gray-300 rounded-lg hover:shadow-md cursor-pointer disabled:opacity-50 hover:disabled:shadow-none"
        onClick={navigateToSignin}
        disabled={token !== null}
      >
        Signin
      </button>
    </div>
  );
};

export default Home;
