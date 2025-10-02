"use client";

import { useEffect, useState } from "react";
import DashboardNavbarComponent from "@/components/dashboard/dashboard-navbar";
import DashboardSidebarComponent from "@/components/dashboard/dashboard-sidebar";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setShowSidebar(false);
        }
      };
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            <DashboardSidebarComponent
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar} 
            />
            <div className="flex-1 flex flex-col">
                <DashboardNavbarComponent 
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar} 
                />
                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}