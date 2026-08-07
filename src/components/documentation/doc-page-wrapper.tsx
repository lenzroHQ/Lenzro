"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import TableOfContents from "./pagecontent";

export default function DocPageWrapper({
  title,
  description,
  toc = [],
  prev,
  next,
  children,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = document.querySelector(".doc-content")?.innerText || "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <div className="mx-auto w-full min-w-0">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground scroll-m-20">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0 pt-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs text-muted-foreground hover:text-foreground hidden sm:flex"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="mr-2 h-3.5 w-3.5" />
              ) : (
                <Copy className="mr-2 h-3.5 w-3.5" />
              )}
              Copy Page
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground hidden sm:flex"
              asChild={!!prev}
              disabled={!prev}
            >
              {prev ? (
                <Link href={prev.route} aria-label="Previous page">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              ) : (
                <ArrowLeft className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground hidden sm:flex"
              asChild={!!next}
              disabled={!next}
            >
              {next ? (
                <Link href={next.route} aria-label="Next page">
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <hr className="my-6 border-border" />

        {/* Prose content */}
        <div
          className="doc-content prose prose-zinc dark:prose-invert max-w-none
          prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-2xl  prose-h2:mt-10 prose-h2:mb-4 pb-24
          prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-2
          prose-p:text-muted-foreground prose-p:leading-7
          prose-a:text-foreground prose-a:underline hover:prose-a:text-foreground
          prose-code:bg-muted/50 prose-code:text-foreground prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-medium prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-border
          prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:text-muted-foreground
          prose-strong:text-foreground
          prose-li:text-muted-foreground
          prose-hr:border-border
        "
        >
          {children}
        </div>

        {/* ── Bottom prev/next navigation ── */}
        {(prev || next) && (
          <div className="flex flex-row items-center justify-between pb-10 pt-4">
            {prev ? (
              <Link
                href={prev.route}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {prev.title}
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={next.route}
                className="flex items-center gap-2 text-sm text-foreground hover:text-muted-foreground transition-colors"
              >
                {next.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>

      {/* ── Right TOC ── */}
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 pt-4">
          <TableOfContents items={toc} />
        </div>
      </div>
    </>
  );
}
