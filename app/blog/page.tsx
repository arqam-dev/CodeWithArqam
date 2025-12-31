"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FaNewspaper, 
  FaCalendarAlt, 
  FaArrowRight,
  FaSearch,
  FaBook,
  FaArrowLeft
} from "react-icons/fa";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    slug: "ai-revolution",
    title: "How AI is Changing the Job Market for Software Engineers",
    description: "Explore how artificial intelligence is reshaping software engineering careers, from automation to new opportunities and the skills you need to stay relevant.",
    date: "2025-01-15",
    category: "Career",
    readTime: "8 min read",
    featured: true
  },
  {
    slug: "what-is-mcp-server",
    title: "What is MCP Server and When to Use It?",
    description: "Understand Model Context Protocol servers, their purpose, and how they compare to traditional API approaches like REST and GraphQL.",
    date: "2025-01-15",
    category: "Technical",
    readTime: "6 min read"
  }
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <FaArrowLeft size={18} />
              <span className="font-medium">Back to Home</span>
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

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
            <FaNewspaper className="text-purple-600 dark:text-purple-400" size={20} />
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Blog & Insights</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Tech Insights & Articles
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            Stay updated with the latest trends, tips, and insights from the world of software development and technology.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && !searchQuery && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center space-x-2">
              <span className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></span>
              <span>Featured Article</span>
            </h2>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transform hover:scale-[1.02]"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-bold uppercase">
                      Featured
                    </span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-semibold">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                    {featuredPost.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt size={14} />
                      <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <div className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 font-semibold">
                    <span>Read Full Article</span>
                    <FaArrowRight className="transform group-hover:translate-x-2 transition-transform" size={16} />
                  </div>
                </div>
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaNewspaper className="text-white opacity-20" size={120} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center space-x-2">
            <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded"></span>
            <span>{searchQuery ? `Search Results (${filteredPosts.length})` : 'All Articles'}</span>
          </h2>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <FaNewspaper className="mx-auto text-slate-400 mb-4" size={48} />
              <p className="text-lg text-slate-600 dark:text-slate-400">
                No articles found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchQuery ? filteredPosts : regularPosts).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 transform hover:scale-105"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt size={12} />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

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

