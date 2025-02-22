import {
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

export interface DateTimePickerReactHookFormProps<
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

const DateTimePickerReactHookForm = <
  T extends FieldValues,
  TFieldName extends FieldPath<T> = FieldPath<T>,
>({
  register,
  registerOptions,
  watch,
  name,
  label,
  error,
}: DateTimePickerReactHookFormProps<T, TFieldName>) => {
  const value = watch(name);
  return (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type="datetime-local"
        className="border-2 text-sm rounded-lg w-full p-2.5"
        value={`${value?.getFullYear()}-${String(
          value?.getMonth() + 1,
        ).padStart(
          2,
          '0',
        )}-${String(value?.getDate()).padStart(2, '0')}T${String(
          value?.getHours(),
        ).padStart(2, '0')}:${String(value?.getMinutes()).padStart(2, '0')}`}
        {...register(name, registerOptions)}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default DateTimePickerReactHookForm;
