import DocsSidebar from "@/components/documentation/sidebar";

export default function DocsLayout({ children }) {
  return (
    <div className="container mx-auto max-w-[1440px] px-4 md:px-8 border-b border-transparent">
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DocsSidebar />
        <main className="relative py-6 lg:gap-10 xl:grid xl:grid-cols-[1fr_250px] min-w-0 pt-25">
          {children}
        </main>
      </div>
    </div>
  );
}
