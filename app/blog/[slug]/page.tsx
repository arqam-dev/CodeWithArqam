import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt, FaBook } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { readFile } from "fs/promises";
import { join } from "path";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = join(process.cwd(), "blogs", `${slug}.md`);
    const fileContent = await readFile(filePath, "utf-8");
    
    // Extract frontmatter
    const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!frontmatterMatch) return null;
    
    const frontmatter = frontmatterMatch[1];
    const content = frontmatterMatch[2];
    
    const metadata: any = {};
    frontmatter.split("\n").forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length) {
        metadata[key.trim()] = valueParts.join(":").trim().replace(/^["']|["']$/g, "");
      }
    });
    
    return {
      slug,
      title: metadata.title || "",
      description: metadata.description || "",
      date: metadata.date || "",
      category: metadata.category || "",
      readTime: metadata.readTime || "",
      content
    };
  } catch (error) {
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <FaArrowLeft size={18} />
              <span className="font-medium">Back to Blog</span>
            </Link>
            <Link
              href="/content"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <FaBook size={14} />
              <span>Learning Guides</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-bold uppercase">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
              {post.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <FaCalendarAlt size={14} />
                <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none markdown-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-white py-8 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} CodeWithArqam. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
