import fs from "fs";
import path from "path";
import ConceptPageContent from "@/app/components/ConceptPageContent";

export default function XRMetaversePage() {
  const filePath = path.join(process.cwd(), "concepts/xr-metaverse.md");
  const content = fs.readFileSync(filePath, "utf8");
  return <ConceptPageContent content={content} />;
}
