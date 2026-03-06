import { notFound } from "next/navigation";
import { getDocBySlug, getAllDocSlugs } from "@/lib/docs-registry";
import DocPageWrapper from "@/components/documentation/doc-page-wrapper";

/** Pre-generate all doc pages at build time */
export function generateStaticParams() {
  return getAllDocSlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return {};
  return {
    title: `${doc.title} — Lenzro Docs`,
    description: doc.description,
  };
}

export default async function DocSlugPage({ params }) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) notFound();

  const { Component, title, description, toc, prev, next } = doc;

  return (
    <DocPageWrapper
      title={title}
      description={description}
      toc={toc}
      prev={prev}
      next={next}
    >
      <Component />
    </DocPageWrapper>
  );
}
