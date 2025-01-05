import { handleCMUAccountSignIn } from '../../utils/handleCMUAccountSignIn';
import useSigninController from './useSigninController';
import cmuLogo from '/cmu.png';

const Signin = () => {
  const { error } = useSigninController();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-9xl text-center">Signin</div>
      <button
        className="flex justify-center items-center w-64 h-12 rounded-lg bg-[#9d76b3] hover:bg-[#6b69b1] hover:shadow-md cursor-pointer"
        onClick={handleCMUAccountSignIn}
      >
        <img src={cmuLogo} className="size-6 mr-3" />
        <span className="text-white">Sign in with CMU Account</span>
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default Signin;
