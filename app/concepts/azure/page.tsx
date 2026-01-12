import fs from "fs";
import path from "path";
import ConceptPageContent from "@/app/components/ConceptPageContent";

export default function AzurePage() {
  const filePath = path.join(process.cwd(), "concepts/azure.md");
  const content = fs.readFileSync(filePath, "utf8");
  return <ConceptPageContent content={content} />;
}
