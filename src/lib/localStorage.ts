"use client";

import { InvoiceStatus } from "@/constants/invoiceStatus";
import { Invoice } from "@/types/invoiceTypes";

export const getInvoices = () => {
  if (typeof window !== "undefined") {
    const storedInvoices = localStorage.getItem("invoices");
    return storedInvoices ? JSON.parse(storedInvoices) : null;
  }
  return null;
};

export const saveInvoices = (invoices: Invoice[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }
};

export const initializeInvoices = () => {
  if (typeof window !== "undefined") {
    const storedInvoices = getInvoices();
    if (!storedInvoices) {
      const defaultInvoices: Invoice[] = [
        { number: "INV202501", name: "Internet Subscription", dueDate: "Jan 13, 2025", status: InvoiceStatus.Paid, amount: "Rp 582.901", statusColor: "bg-green-100 text-green-600" },
        { number: "INV202502", name: "Electricity Bill", dueDate: "Feb 04, 2025", status: InvoiceStatus.Paid, amount: "Rp 311.909", statusColor: "bg-green-100 text-green-600" },
        { number: "INV202503", name: "Gym Membership", dueDate: "Feb 23, 2025", status: InvoiceStatus.Unpaid, amount: "Rp 425.000", statusColor: "bg-red-100 text-red-600" },
        { number: "INV202504", name: "Phone Bill", dueDate: "Feb 23, 2025", status: InvoiceStatus.Pending, amount: "Rp 148.891", statusColor: "bg-yellow-100 text-yellow-600" },
      ];
     saveInvoices(defaultInvoices);
    }
  }
};
