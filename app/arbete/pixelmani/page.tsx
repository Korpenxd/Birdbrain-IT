import { CaseStudyPage } from "../case-page";
import { JsonLd } from "../../lib/seo";
import { createProjectBreadcrumb, createProjectMetadata } from "../seo";

export const metadata = createProjectMetadata("pixelmani");

export default function PixelmaniCasePage() {
  return (
    <>
      <JsonLd data={createProjectBreadcrumb("pixelmani")} />
      <CaseStudyPage projectKey="pixelmani" />
    </>
  );
}
