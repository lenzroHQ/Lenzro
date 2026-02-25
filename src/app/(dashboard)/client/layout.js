"use client";
import ClientNavbar from "../layout/clientnav";
import LenzroAi from "../layout/lenzroai";
import Sidebar from "../layout/sidebar";

export default function CLientLayout({ children }) {
  return (
    <>
      <div className="bg-background min-h-screen flex flex-col">
        {/* Fixed Top Navbar */}
        <div className="sticky top-0 z-40">
          <ClientNavbar />
        </div>
        {/* Sidebar and Children share remainder */}
        <div className="flex flex-row flex-1 gap-2 p-1 min-h-0">
          <Sidebar />
          <div className="flex-1 min-h-0  rounded-md overflow-auto">{children}</div>
        </div>
      </div>
      {/* Floating AI button */}
      <div className="fixed bottom-6 right-6 z-50">
        <LenzroAi />
      </div>
    </>
  );
}
