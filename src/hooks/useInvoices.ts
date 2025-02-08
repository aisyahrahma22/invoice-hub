"use client";

import { useState, useEffect } from "react";
import { Invoice } from "@/types/invoiceTypes";
import { getInvoices, saveInvoices } from "@/lib/localStorage";

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const storedInvoices = getInvoices();
    if (storedInvoices) {
      setInvoices(storedInvoices);
    }
  }, []);

  const addInvoice = (newInvoice: Invoice) => {
    const updatedInvoices = [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    saveInvoices(updatedInvoices);
  };

  return { invoices, setInvoices, addInvoice };
};
