import { Path } from '../../constants/Path';
import { HttpClient } from './HttpClient';

export class ApiClient extends HttpClient {
  constructor(info?: { token: string }) {
    super({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        Authorization: `Bearer ${info?.token}`,
      },
    });

    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.replace(Path.SIGNIN);
        }
        return Promise.reject(error);
      },
    );
  }
}
