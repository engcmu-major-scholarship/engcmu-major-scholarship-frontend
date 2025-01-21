import {
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

export interface PDFInputReactHookFormProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  register: UseFormRegister<TFieldValues>;
  name: TFieldName;
  registerOptions?: RegisterOptions<TFieldValues, TFieldName>;
  watch: UseFormWatch<TFieldValues>;
  label: string;
  error?: string;
  isLoading?: boolean;
}

const PDFInputReactHookForm = <
  T extends FieldValues,
  TFieldName extends FieldPath<T> = FieldPath<T>,
>({
  register,
  registerOptions,
  watch,
  name,
  label,
  error,
  isLoading,
}: PDFInputReactHookFormProps<T, TFieldName>) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type="file"
        accept="application/pdf"
        className="border-2 text-sm rounded-lg w-60 p-2.5"
        {...register(name, registerOptions)}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {watch(name) && watch(name)?.length !== 0 ? (
        <object
          data={URL.createObjectURL(watch(name)[0])}
          type="application/pdf"
          className="w-full h-[600px]"
        >
          <div className="text-red-500 text-sm">
            {
              'This browser does not support PDFs. Please download the PDF to view it: '
            }
            <a
              className="text-blue-700"
              href={URL.createObjectURL(watch(name)[0])}
            >
              Download PDF
            </a>
          </div>
        </object>
      ) : (
        <div className="flex flex-col w-full h-[600px] border-2 items-center justify-center bg-gray-100">
          <div className="text-5xl text-center text-gray-500">
            {isLoading ? 'Loading...' : 'Preview PDF'}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFInputReactHookForm;
