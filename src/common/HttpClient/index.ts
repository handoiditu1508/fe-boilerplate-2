import axios, { AxiosInstance } from "axios";

import config from "../../config";

export class HttpClient {
  client: AxiosInstance;

  constructor(baseUrl?: string) {
    this.client = axios.create({
      baseURL: baseUrl ?? config.API_BASE_URL,
      timeout: 5000
    })
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, body?: any): Promise<T> {
    const response = await this.client.post<T>(url, body);
    return response.data;
  }

  async put<T>(url: string, body?: any): Promise<T> {
    const response = await this.client.put<T>(url, body);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}