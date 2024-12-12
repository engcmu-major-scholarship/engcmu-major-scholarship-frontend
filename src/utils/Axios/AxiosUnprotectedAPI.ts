import { AxiosBase } from './AxiosBase';

export class AxiosUnprotectedAPI extends AxiosBase {
  constructor() {
    super({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }
}
