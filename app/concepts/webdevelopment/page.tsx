import fs from "fs";
import path from "path";
import ConceptPageContent from "@/app/components/ConceptPageContent";

// Force dynamic rendering to ensure markdown file changes are reflected immediately
export const dynamic = 'force-dynamic';

export default function WebdevelopmentPage() {
  const filePath = path.join(process.cwd(), "concepts/webdevelopment.md");
  const content = fs.readFileSync(filePath, "utf8");
  return <ConceptPageContent content={content} />;
}
