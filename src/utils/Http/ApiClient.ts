import { HttpClient } from './HttpClient';

export class ApiClient extends HttpClient {
  constructor(info?: { token: string }) {
    super({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        Authorization: `Bearer ${info?.token}`,
      },
    });
  }
}
