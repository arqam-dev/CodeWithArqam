import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import ExpandableSection from "@/app/components/ExpandableSection";

export default function ReactPage() {
  // Path to Markdown file
  const filePath = path.join(process.cwd(), "concepts/react.md");

  // Read content (server-side)
  let content = fs.readFileSync(filePath, "utf8");

  // Parse expandable sections: <expand title="Title">content</expand>
  const expandableRegex = /<expand\s+title="([^"]+)">([\s\S]*?)<\/expand>/g;
  const parts: Array<{ type: "text" | "expandable"; content: string; title?: string }> = [];
  let lastIndex = 0;
  let match;

  while ((match = expandableRegex.exec(content)) !== null) {
    // Add text before the expandable section
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: content.slice(lastIndex, match.index),
      });
    }
    // Add expandable section
    parts.push({
      type: "expandable",
      title: match[1],
      content: match[2].trim(),
    });
    lastIndex = expandableRegex.lastIndex;
  }
  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: "text",
      content: content.slice(lastIndex),
    });
  }

  return (
    <main style={{
      maxWidth: "900px",
      margin: "40px auto",
      padding: "20px",
      lineHeight: "1.8",
    }}>
      {parts.map((part, index) => {
        if (part.type === "expandable") {
          return (
            <ExpandableSection
              key={index}
              title={part.title || "Section"}
              content={part.content}
            />
          );
        }
        return <ReactMarkdown key={index}>{part.content}</ReactMarkdown>;
      })}
    </main>
  );
}
