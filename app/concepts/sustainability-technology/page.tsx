import fs from "fs";
import path from "path";
import ConceptPageContent from "@/app/components/ConceptPageContent";

export default function SustainabilityTechnologyPage() {
  const filePath = path.join(process.cwd(), "concepts/sustainability-technology.md");
  const content = fs.readFileSync(filePath, "utf8");
  return <ConceptPageContent content={content} conceptName="sustainability-technology" />;
}
