import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Invoice } from "../../../types";
import InvoiceService from "../../../services/InvoiceService";
import { RootState } from "../../app/store";

export type InvoiceState = {
  invoices: Invoice[],
  loading: boolean,
  error: string | undefined
};

const initialState: InvoiceState = {
  invoices: [],
  loading: false,
  error: undefined
};

export const getAsync = createAsyncThunk(
  "invoice/getAsync",
  async () => {
    const invoiceService = new InvoiceService();
    let invoices = await invoiceService.getInvoices();
    return invoices;
  }
);

export const deleteAsync = createAsyncThunk(
  "invoice/deleteAsync",
  async (id: number) => {
    const invoiceService = new InvoiceService();
    await invoiceService.deleteInvoice(id);
    return id;
  }
);

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(getAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAsync.fulfilled, (state, action) => {
        state.invoices = action.payload;
        state.error = undefined;
        state.loading = false;
      })
      .addCase(getAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        const index = state.invoices.findIndex(invoice => invoice.id === action.payload);
        if (index !== -1) {
          state.invoices.splice(index, 1);
        }
        state.error = undefined;
        state.loading = false;
      })
      .addCase(deleteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const selectInvoices = (state: RootState) => state.invoice.invoices;
export const selectInvoice = (id: number) => (state: RootState) => {
  const index = state.invoice.invoices.findIndex((invoice: any) => invoice.id === id);
  return index !== -1
    ? state.invoice.invoices[index]
    : undefined;
}
export const selectLoading = (state: RootState) => state.invoice.loading;
export const selectError = (state: RootState) => state.invoice.error;

export default invoiceSlice.reducer;