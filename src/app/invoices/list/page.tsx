"use client";

import { useState } from "react";
import {
  TextField,
  MenuItem,
  IconButton,
  Menu,
  MenuItem as DropdownItem,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import Sidebar from "@/component/Sidebar";
import Navbar from "@/component/Navbar";
import { getStatusColor } from "@/utils/getStatusColor";
import { useInvoices } from "@/hooks/useInvoices";
import { usePagination } from "@/hooks/usePagination";
import { InvoiceStatus } from "@/constants/invoiceStatus";

export default function MyInvoicesPage() {
  const { invoices } = useInvoices();
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const { page, setPage, paginate } = usePagination(4);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.name.toLowerCase().includes(search.toLowerCase()) ||
      invoice.number.toLowerCase().includes(search.toLowerCase());
  
    const matchesStatus = statusFilter === "All Status" || invoice.status === statusFilter;
  
    return matchesSearch && matchesStatus;
  });
  

  const paginatedInvoices = filteredInvoices.length > 4 ? paginate(filteredInvoices) : filteredInvoices;

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="container">
          <div className="content">
            {/* Search & Filter */}
            <div className="body-content">
              <h2 className="page-title">My Invoices</h2>
              <div className="search-filter-container">
                <div className="search-box">
                  <SearchIcon className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                  />
                </div>

                <div className="filter-box">
                <TextField
                  select
                  size="small"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-dropdown"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: "12px", 
                      color: "#9CA3AF",  
                    },
                  }}
                >
                  <MenuItem value="All Status">All Status</MenuItem>
                  <MenuItem value={InvoiceStatus.Paid}>Paid</MenuItem>
                  <MenuItem value={InvoiceStatus.Unpaid}>Unpaid</MenuItem>
                  <MenuItem value={InvoiceStatus.Pending}>Pending</MenuItem>
                </TextField>
                </div>
              </div>
            </div>

            {/* Invoice Table */}
            <div className="invoice-table">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.map((invoice, index) => (
                    <tr key={invoice.number + index}>
                      <td>
                        <div className="font-medium">{invoice.name}</div>
                        <div className="text-sm text-gray-500">{invoice.number}</div>
                      </td>
                      <td>{invoice.dueDate}</td>
                      <td>
                        <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(invoice.status as InvoiceStatus)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>{invoice.amount}</td>
                      <td className="action-btn">
                        <IconButton onClick={(event) => handleMenuOpen(event)}>
                          <DensityMediumIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3">
               {/* Pagination */}
                {filteredInvoices.length > 4 && (
                <Pagination count={Math.ceil(filteredInvoices.length / 4)} page={page} onChange={(event, value) => setPage(value)} />
                )}
            </div>
            {/* Dropdown Menu */}
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              className="dropdown-menu"
            >
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Delete</DropdownItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}
