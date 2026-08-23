import { CaseStudyPage } from "../case-page";
import { JsonLd } from "../../lib/seo";
import { createProjectBreadcrumb, createProjectMetadata } from "../seo";

export const metadata = createProjectMetadata("btc");

export default function BtcBacktestHubCasePage() {
  return (
    <>
      <JsonLd data={createProjectBreadcrumb("btc")} />
      <CaseStudyPage projectKey="btc" />
    </>
  );
}
