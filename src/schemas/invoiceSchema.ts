import { InvoiceStatus } from "@/constants/invoiceStatus";
import { z } from "zod";

export const invoiceSchema = z.object({
    name: z.string().min(1, "Invoice name is required"),
    number: z.string().min(1, "Invoice number is required"),
    dueDate: z.date({ required_error: "Due date is required" }),
    amount: z
      .string()
      .regex(/^\d{1,3}([.,]?\d{3})*(\.\d+)?$/, "Amount must be a valid number"),
    status: z.nativeEnum(InvoiceStatus),
  });
