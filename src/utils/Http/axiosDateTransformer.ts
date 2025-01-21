import { AxiosResponseTransformer } from 'axios';

export const axiosDateTransformer: AxiosResponseTransformer = (data) => {
  if (data && typeof data === 'object') {
    return transformDateStringsToDates(data);
  }
  return data;
};

export const transformDateStringsToDates = (
  data: Record<string | number | symbol, unknown>,
) => {
  for (const key in data) {
    if (data[key]) {
      if (
        typeof data[key] === 'string' &&
        data[key].match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
      ) {
        data[key] = new Date(data[key]);
      } else if (typeof data[key] === 'object') {
        data[key] = transformDateStringsToDates(
          data[key] as Record<string, unknown>,
        );
      }
    }
  }
  return data;
};
