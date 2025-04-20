import React, { ReactNode } from "react";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from '../store/useAuthStore';
import { queryClient } from '../lib/react-query';

export interface LayoutProps {
  children?: ReactNode;
}

const LogoutButton: React.FC = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    clearAuth();
    queryClient.clear();
    navigate({ to: '/login' });
  };

  return (
    <button
      onClick={handleLogout}
      className="ml-4 px-4 py-2 rounded bg-white text-primary font-semibold hover:bg-gray-100 transition"
    >
      Logout
    </button>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white px-6 py-4 shadow flex items-center justify-between">
        <h1 className="text-xl font-bold">Item Tracker</h1>
        <LogoutButton />
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
