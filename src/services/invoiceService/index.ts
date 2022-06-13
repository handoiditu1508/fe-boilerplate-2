import axios, { AxiosInstance } from "axios";

import { Invoice } from "../../types";

class InvoiceService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3001/api",
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