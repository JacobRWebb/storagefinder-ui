import React, { ReactNode } from "react";
import { Outlet } from "@tanstack/react-router";

export interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white px-6 py-4 shadow">
        <h1 className="text-xl font-bold">Item Tracker</h1>
      </header>
      <div className="flex flex-1">
        {/* Optional Sidebar could go here */}
        <main className="flex-1 p-6">
          {children ? children : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
