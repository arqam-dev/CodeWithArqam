import fs from "fs";
import path from "path";
import ConceptPageContent from "@/app/components/ConceptPageContent";

export default function ArtificialIntelligencePage() {
  const filePath = path.join(process.cwd(), "concepts/artificial-intelligence.md");
  const content = fs.readFileSync(filePath, "utf8");
  return <ConceptPageContent content={content} conceptName="artificial-intelligence" />;
}
