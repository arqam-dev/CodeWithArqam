import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

export default function ReactPage() {
  // Path to Markdown file
  const filePath = path.join(process.cwd(), "concepts/react.md");

  // Read content (server-side)
  const content = fs.readFileSync(filePath, "utf8");

  return (
    <main style={{
      maxWidth: "900px",
      margin: "40px auto",
      padding: "20px",
      whiteSpace: "pre-wrap", // preserves line breaks
    }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </main>
  );
}
