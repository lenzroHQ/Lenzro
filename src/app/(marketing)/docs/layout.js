import Sidebar from "@/components/documentation/sidebar";

export default function DocsLayout({ children }) {
  return (
    <div className="min-h-screen  pt-10 flex">
      <Sidebar />
      {children}
    </div>
  );
}
