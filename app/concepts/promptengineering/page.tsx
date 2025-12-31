import fs from "fs";
import path from "path";
import ConceptPageContent from "@/app/components/ConceptPageContent";

export default function PromptEngineeringPage() {
  const filePath = path.join(process.cwd(), "concepts/promptengineering.md");
  const content = fs.readFileSync(filePath, "utf8");
  return <ConceptPageContent content={content} conceptName="promptengineering" />;
}

