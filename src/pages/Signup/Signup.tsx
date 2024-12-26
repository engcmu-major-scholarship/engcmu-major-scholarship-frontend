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
            htmlFor="firstName"
            className="mb-2 text-sm font-medium text-gray-600"
          >
            First Name
          </label>
          <input
            id="firstName"
            placeholder="Enter your first name"
            {...register('firstName', {
              required: 'First Name is required',
            })}
            className={`border rounded-md p-2 focus:outline-none ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="lastName"
            className="mb-2 text-sm font-medium text-gray-600"
          >
            Last Name
          </label>
          <input
            id="lastName"
            placeholder="Enter your last name"
            {...register('lastName', {
              required: 'Last Name is required',
            })}
            className={`border rounded-md p-2 focus:outline-none ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="phone"
            className="mb-2 text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input
            id="phone"
            placeholder="Enter your phone number"
            {...register('phoneNumber', {
              required: 'Phone Number is required',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Phone Number must contain only digits',
              },
            })}
            className={`border rounded-md p-2 focus:outline-none ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-2 text-sm font-medium text-gray-600"
          >
            Contact Email
          </label>
          <input
            id="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
            className={`border rounded-md p-2 focus:outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

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
              validate: (value: string) => {
                if (value.length !== 13) {
                  return 'Citizen ID must be 13 characters long';
                }
                let sum = 0;
                for (let i = 0; i < 12; i++) {
                  sum += parseInt(value.charAt(i), 10) * (13 - i);
                }
                sum = (11 - (sum % 11)) % 10;
                if (sum !== parseInt(value.charAt(12), 10)) {
                  return 'Invalid Citizen ID';
                }
                return true;
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
