import { InvoiceStatus } from "@/constants/invoiceStatus";

export const getStatusColor = (status: InvoiceStatus): string => {
  switch (status) {
    case InvoiceStatus.Paid:
      return "bg-green-100 text-green-600";
    case InvoiceStatus.Unpaid:
      return "bg-red-100 text-red-600";
    case InvoiceStatus.Pending:
      return "bg-yellow-100 text-yellow-600";
    default:
      return "bg-gray-100 text-gray-600"; 
  }
};
