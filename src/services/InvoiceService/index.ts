import { HttpClient } from "../../common";
import { Invoice } from "../../types";

class InvoiceService {
  client: HttpClient;

  constructor() {
    this.client = new HttpClient();
  }

  async getInvoices(): Promise<Invoice[]> {
    return await this.client.get<Invoice[]>("/invoices");
  }

  async getInvoice(id: number): Promise<Invoice> {
    return await this.client.get<Invoice>(`/invoices/${id}`);
  }

  async deleteInvoice(id: number): Promise<void> {
    await this.client.delete(`/invoices/${id}`);
  }
}

export default InvoiceService;