"use client"
import ClientNavbar from "../layout/clientnav";
import LenzroAi from "../layout/lenzroai";

export default function CLientLayout({ children }) {
  return (
    <>
      <div className="bg-background min-h-screen">
        <ClientNavbar />
        {children}
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <LenzroAi />
      </div>
    </>
  );
}
