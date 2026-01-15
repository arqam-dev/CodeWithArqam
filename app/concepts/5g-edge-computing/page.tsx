import fs from "fs";
import path from "path";
import ConceptPageContent from "@/app/components/ConceptPageContent";

export default function FiveGEdgeComputingPage() {
  const filePath = path.join(process.cwd(), "concepts/5g-edge-computing.md");
  const content = fs.readFileSync(filePath, "utf8");
  return <ConceptPageContent content={content} />;
}
