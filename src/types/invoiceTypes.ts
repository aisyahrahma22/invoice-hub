import { InvoiceStatus } from "@/constants/invoiceStatus";

export interface Invoice {
    number: string;
    name: string;
    dueDate: string;
    status: InvoiceStatus;
    amount: string;
    statusColor: string;
}