import { getIntroDoc } from "@/lib/docs-registry";
import DocPageWrapper from "@/components/documentation/doc-page-wrapper";

export default function DocsPage() {
  const doc = getIntroDoc();
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
