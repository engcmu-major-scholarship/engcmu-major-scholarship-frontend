const hashParamsParser = <T extends Record<string, string>>(hash: string) => {
  return hash
    .replace('#', '')
    .split('&')
    .reduce((acc, param) => {
      const [key, value] = param.split('=');
      return { ...acc, [key]: value };
    }, {} as T);
};

export default hashParamsParser;
