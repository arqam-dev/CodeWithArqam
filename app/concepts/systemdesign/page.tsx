import fs from "fs";
import path from "path";
import ConceptPageContent from "@/app/components/ConceptPageContent";

// Force dynamic rendering to ensure markdown file changes are reflected immediately
export const dynamic = 'force-dynamic';

export default function SystemDesignPage() {
  const filePath = path.join(process.cwd(), "concepts/systemdesign.md");
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return (
      <main style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        lineHeight: "1.8",
      }}>
        <h1>System Design Content Not Found</h1>
        <p>The system design content file could not be found.</p>
      </main>
    );
  }

  const content = fs.readFileSync(filePath, "utf8");
  return <ConceptPageContent content={content} />;
}

