import useHomeController from './useHomeController';

const Home = () => {
  const { token, navigateToSignin, navigateToSignOut } = useHomeController();
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
      <button
        className="w-64 h-12 mt-2 border border-gray-300 rounded-lg hover:shadow-md cursor-pointer disabled:opacity-50 hover:disabled:shadow-none"
        onClick={navigateToSignOut}
        disabled={token === null}
      >
        Signout
      </button>
    </div>
  );
};

export default Home;
