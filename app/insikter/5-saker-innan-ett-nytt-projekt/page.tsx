import type { Metadata } from "next";

import { InsightArticlePage } from "../article-page";
import { getInsightArticle } from "../articles";

const article = getInsightArticle("5-saker-innan-ett-nytt-projekt");

export const metadata: Metadata = {
  title: `${article.title.sv} | Birdbrain IT`,
  description: article.excerpt.sv,
};

export default function ArticlePage() {
  return <InsightArticlePage article={article} />;
}
