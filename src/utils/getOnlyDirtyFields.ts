export function getOnlyDirtyFields<T extends Record<keyof T, unknown>>(
  dirtyFields: Partial<Readonly<T>>,
  data: T,
): Partial<T> {
  const dirtyData: Partial<T> = {};
  for (const key in dirtyFields) {
    if (dirtyFields[key]) {
      dirtyData[key as keyof T] = data[key as keyof T];
    }
  }
  return dirtyData;
}
