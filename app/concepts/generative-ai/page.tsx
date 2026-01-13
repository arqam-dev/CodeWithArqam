import fs from "fs";
import path from "path";
import ConceptPageContent from "@/app/components/ConceptPageContent";

export default function GenerativeAiPage() {
  const filePath = path.join(process.cwd(), "concepts/generative-ai.md");
  const content = fs.readFileSync(filePath, "utf8");
  return <ConceptPageContent content={content} conceptName="generative-ai" />;
}
