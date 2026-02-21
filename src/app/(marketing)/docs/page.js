import React from "react";
import Introduction from "./content/intro";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CopyIcon } from "lucide-react";
import PageContent from "@/components/documentation/pagecontent";

const DocsPage = () => {
  // In the future, render based on selected component
  return (
    <div className="pt-10  px-6 bg-pink-500 w-full">
      <div className="flex w-full">
        {/* title and pagedocs */}
        <div className="flex flex-col min-h-0" style={{ width: "75%" }}>
          <div className="space-y-4 mt-5 mb-6  flex items-center justify-between">
            <h1 className="text-4xl">Introduction</h1>
            <div className="space-x-2">
              <Button variant="outline" className={"h-7 text-xs sapce-x-2"}>
                <CopyIcon />
                Copy Page
              </Button>
              <Button variant="outline" className={"h-7 w-7 text-xs sapce-x-2"}>
                <ArrowLeft />
              </Button>
              <Button variant="outline" className={"h-7 w-7 text-xs sapce-x-2"}>
                <ArrowRight />
              </Button>
            </div>
          </div>
          <div className="text-white flex-1 flex flex-col overflow-y-auto h-[calc(100vh-150px)]">
            <Introduction />
          </div>
        </div>
        {/* page content tracking */}
        <div style={{ width: "25%" }}>
          <PageContent />
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
