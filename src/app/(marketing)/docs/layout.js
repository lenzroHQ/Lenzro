import DocsSidebar from "@/components/documentation/sidebar";

export default function DocsLayout({ children }) {
  return (
    <div className="container mx-auto max-w-[1440px] px-0 md:px-8 border-b border-transparent">
      {/* Mobile: stacked (sidebar bar on top, then content). md+: two-column grid */}
      <div className="flex flex-col md:flex-row md:items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DocsSidebar />
        <main className="relative px-4 md:px-0 py-6 lg:gap-10 xl:grid xl:grid-cols-[1fr_250px] min-w-0 pt-6 md:pt-26">
          {children}
        </main>
      </div>
    </div>
  );
}
