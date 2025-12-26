import fs from "fs";
import path from "path";
import ConceptPageContent from "@/app/components/ConceptPageContent";

export default function ReactPage() {
  const filePath = path.join(process.cwd(), "concepts/react.md");
  const content = fs.readFileSync(filePath, "utf8");
  return <ConceptPageContent content={content} conceptName="react" />;
}
