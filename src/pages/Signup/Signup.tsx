import { useForm } from 'react-hook-form';
import useSignupController, { SignupData } from './useSignupController';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>();
  const { onSubmit } = useSignupController();

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Signup</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="justify-center items-center bg-white shadow-lg rounded-lg p-8 w-96 flex flex-col space-y-4"
      >
        <div className="flex flex-col">
          <label
            htmlFor="citizenId"
            className="mb-2 text-sm font-medium text-gray-600"
          >
            Citizen ID
          </label>
          <input
            id="citizenId"
            placeholder="Enter your 13-digit ID"
            {...register('citizenId', {
              required: 'Citizen ID is required',
              minLength: {
                value: 13,
                message: 'Citizen ID must be 13 characters long',
              },
              maxLength: {
                value: 13,
                message: 'Citizen ID must be 13 characters long',
              },
            })}
            className={`border rounded-md p-2 focus:outline-none ${
              errors.citizenId ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.citizenId && (
            <span className="text-red-500 text-sm mt-1">
              {errors.citizenId.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-24 h-8 border border-gray-300 rounded-lg hover:shadow-md cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
