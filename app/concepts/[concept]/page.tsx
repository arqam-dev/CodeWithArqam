import fs from "fs";
import path from "path";
import ConceptPageContent from "@/app/components/ConceptPageContent";

interface ConceptPageProps {
  params: Promise<{
    concept: string;
  }>;
}

export default async function ConceptDynamicPage({ params }: ConceptPageProps) {
  // Convert URL parameter to filename (e.g., "git" -> "git.md", "sales-presales" -> "sales-presales.md")
  const { concept } = await params;
  const conceptName = concept;
  const filePath = path.join(process.cwd(), "concepts", `${conceptName}.md`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return (
      <main style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        lineHeight: "1.8",
      }}>
        <h1>Concept Not Found</h1>
        <p>The concept "{conceptName}" could not be found.</p>
      </main>
    );
  }

  const content = fs.readFileSync(filePath, "utf8");
  return <ConceptPageContent content={content} conceptName={conceptName} />;
}

