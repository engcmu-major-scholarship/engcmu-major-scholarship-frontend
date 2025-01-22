import {
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

export interface DatePickerReactHookFormProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  register: UseFormRegister<TFieldValues>;
  name: TFieldName;
  registerOptions?: RegisterOptions<TFieldValues, TFieldName>;
  watch: UseFormWatch<TFieldValues>;
  label: string;
  error?: string;
}

const DatePickerReactHookForm = <
  T extends FieldValues,
  TFieldName extends FieldPath<T> = FieldPath<T>,
>({
  register,
  registerOptions,
  watch,
  name,
  label,
  error,
}: DatePickerReactHookFormProps<T, TFieldName>) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type="date"
        className="border-2 text-sm rounded-lg w-full p-2.5"
        value={watch(name)?.toISOString().split('T')[0]}
        {...register(name, registerOptions)}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default DatePickerReactHookForm;
