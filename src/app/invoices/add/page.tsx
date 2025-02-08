"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Sidebar from "@/component/Sidebar";
import Navbar from "@/component/Navbar";
import { Invoice } from "@/types/invoiceTypes";
import { invoiceSchema } from "@/schemas/invoiceSchema";
import { useInvoices } from "@/hooks/useInvoices";
import { InvoiceStatus } from "@/constants/invoiceStatus";

export default function AddInvoice() {
  const { addInvoice } = useInvoices();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Invoice>({ resolver: zodResolver(invoiceSchema) });

  const onSubmit = (data: Invoice) => {
    const newInvoice = { ...data, dueDate: dayjs(data.dueDate).format("MMM DD, YYYY") };
    addInvoice(newInvoice);
    setOpen(true);
    reset();
  };


  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="container-add">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <h2 className="page-title">Add Invoice</h2>
            <div className="card">
              <div className="title-card">Invoice Form</div>
              <form onSubmit={handleSubmit(onSubmit)} className="form-group">
                <div className="form-body">
                  <div className="inputan">
                    <label className="label">
                      Name <span className="required">*</span>
                    </label>
                    <TextField
                      {...register("name")}
                      className="full-width"
                      placeholder="Enter invoice name"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      size='small'
                    />
                  </div>
                  <div>
                    <label className="label">
                      Number <span className="required">*</span>
                    </label>
                    <TextField
                      {...register("number")}
                      className="full-width"
                      placeholder="Enter invoice number"
                      error={!!errors.number}
                      helperText={errors.number?.message}
                      size='small'
                    />
                  </div>
                  <div>
                     <label className="label">
                      Due Date <span className="required">*</span>
                    </label>
                    <Controller
                      name="dueDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          value={field.value ? dayjs(field.value) : null} // Convert to Dayjs
                          onChange={(date) => field.onChange(date?.toDate() ?? null)} // Convert back to Date
                          format="DD/MM/YYYY"
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.dueDate,
                              helperText: errors.dueDate?.message,
                              size: 'small'
                            },
                          }}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="label">
                      Amount <span className="required">*</span>
                    </label>
                    <TextField
                      {...register("amount")}
                      type="number"
                      className="full-width"
                      placeholder="Enter invoice amount"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                      }}
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                       size='small'
                    />
                  </div>
                  <div>
                    <label className="label">
                      Status <span className="required">*</span>
                    </label>
                    <TextField
                      {...register("status")}
                      select
                      className="full-width"
                      size='small'
                      defaultValue={InvoiceStatus.Pending}
                      error={!!errors.status}
                      helperText={errors.status?.message}
                    >
                      <MenuItem value={InvoiceStatus.Pending}>Pending</MenuItem>
                      <MenuItem value={InvoiceStatus.Paid}>Paid</MenuItem>
                      <MenuItem value={InvoiceStatus.Unpaid}>Unpaid</MenuItem>
                    </TextField>
                  </div>
                </div>
                <div className="button-group">
                  <Button type="submit" variant="contained" color="primary" sx={{ textTransform: "none" }}>
                    + Add Invoice
                  </Button>
                </div>

              </form>
            </div>
          </LocalizationProvider>
            {/* Snackbar Notification */}
            {open && (
              <div className="notification">
                <div className="notification-icon">✔</div>
                <div className="notification-content">
                  <div className="notification-title">Invoice added successfully!</div>
                  <div>You can view and manage your invoice in the &apos;My Invoices&apos; section.</div>
                </div>
                <button className="notification-close" onClick={() => setOpen(false)}>✕</button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
