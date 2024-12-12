import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class AxiosBase {
  protected readonly axios: AxiosInstance;

  protected constructor(config: AxiosRequestConfig) {
    this.axios = axios.create(config);
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.axios.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await this.axios.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    const response = await this.axios.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.axios.delete<T>(url);
    return response.data;
  }
}
