import { AxiosBase } from './AxiosBase';

export class AxiosProtectedAPI extends AxiosBase {
  constructor(token?: string) {
    super({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.replace('/login');
        }
        return Promise.reject(error);
      },
    );
  }
}
