type FormDataValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | Blob
  | File
  | string[]
  | Blob[]
  | File[];

export function objectToFromData<T extends FormDataFields<T>>(
  obj: T,
): FormData {
  const formData = new FormData();

  for (const key in obj) {
    if (obj[key] === undefined) continue;
    if (obj[key] instanceof Array) {
      obj[key].forEach((value) => {
        formData.append(key, value);
      });
    } else if (obj[key] instanceof Date) {
      formData.append(key, obj[key].toISOString());
    } else if (obj[key] instanceof File || obj[key] instanceof Blob) {
      formData.append(key, obj[key]);
    } else if (typeof obj[key] === 'string') {
      formData.append(key, obj[key]);
    } else {
      formData.append(key, JSON.stringify(obj[key]));
    }
  }

  return formData;
}

export type FormDataFields<T> = {
  [K in keyof T]?: FormDataValue;
};
