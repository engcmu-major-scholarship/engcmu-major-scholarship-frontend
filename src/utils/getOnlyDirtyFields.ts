import { FieldNamesMarkedBoolean, FieldValues } from 'react-hook-form';

export function getOnlyDirtyFields<TFieldValues extends FieldValues>(
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>,
  data: TFieldValues,
): Partial<TFieldValues> {
  const dirtyData: Partial<TFieldValues> = {};
  for (const key in dirtyFields) {
    if (dirtyFields[key]) {
      dirtyData[key] = data[key];
    }
  }
  return dirtyData;
}
