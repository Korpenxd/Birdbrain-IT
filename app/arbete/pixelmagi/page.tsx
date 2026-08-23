import { CaseStudyPage } from "../case-page";
import { JsonLd } from "../../lib/seo";
import { createProjectBreadcrumb, createProjectMetadata } from "../seo";

export const metadata = createProjectMetadata("pixelmagi");

export default function PixelmagiCasePage() {
  return (
    <>
      <JsonLd data={createProjectBreadcrumb("pixelmagi")} />
      <CaseStudyPage projectKey="pixelmagi" />
    </>
  );
}
