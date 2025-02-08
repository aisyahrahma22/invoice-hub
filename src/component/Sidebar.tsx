"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { name: "Add Invoices", path: "/invoices/add" },
  { name: "My Invoices", path: "/invoices/list" },
];

export default function Sidebar() {
  const pathname = usePathname(); // Get current URL path

  return (
    <div className="sidebar-container">
      {/* Logo */}
      <div className="sidebar-logo">
        <Image src="/invoicehub-logo.png" alt="Invoice Hub Logo" width={200} height={50} />
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map(({ name, path }) => {
          const isActive = pathname === path;
          return (
            <Link key={name} href={path} className={`sidebar-item ${isActive ? "active" : ""}`}>
              <span className="ml-3 font-medium">{name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
