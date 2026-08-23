import { InsightArticlePage } from "../article-page";
import { getInsightArticle } from "../articles";
import { JsonLd } from "../../lib/seo";
import { createInsightMetadata, createInsightStructuredData } from "../seo";

const article = getInsightArticle("driva-eget-som-utvecklare");

export const metadata = createInsightMetadata(article);

export default function ArticlePage() {
  return (
    <>
      <JsonLd data={createInsightStructuredData(article)} />
      <InsightArticlePage article={article} />
    </>
  );
}
