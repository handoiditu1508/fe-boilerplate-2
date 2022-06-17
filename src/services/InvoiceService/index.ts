import axios, { AxiosInstance } from "axios";

import { Invoice } from "../../types";
import config from "../../config";

class InvoiceService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.API_BASE_URL,
      timeout: 5000
    })
  }

  async getInvoices() {
    const response = await this.client.get<Invoice[]>("/invoices");
    return response.data;
  }

  async getInvoice(id: number) {
    const response = await this.client.get<Invoice>(`/invoices/${id}`);
    return response.data;
  }

  async deleteInvoice(id: number) {
    await this.client.delete(`/invoices/${id}`);
  }
}

export default InvoiceService;