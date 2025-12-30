import fs from "fs";
import path from "path";
import InterviewQuestionsPageContent from "@/app/components/InterviewQuestionsPageContent";

interface InterviewQuestionsPageProps {
  params: {
    category: string;
  };
}

export default function InterviewQuestionsPage({ params }: InterviewQuestionsPageProps) {
  const category = params.category;
  const filePath = path.join(process.cwd(), "interview-questions", `${category}.md`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return (
      <main style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        lineHeight: "1.8",
      }}>
        <h1>Interview Questions Not Found</h1>
        <p>The category "{category}" could not be found.</p>
      </main>
    );
  }

  const content = fs.readFileSync(filePath, "utf8");
  return <InterviewQuestionsPageContent content={content} category={category} />;
}
