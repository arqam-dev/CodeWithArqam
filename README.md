# CodeWithArqam

**A comprehensive learning platform for software development concepts, tutorials, and interview preparation.**

🌐 **Live Website:** [https://codewitharqam.com/](https://codewitharqam.com/)

## About

CodeWithArqam is an educational platform designed to help students and developers learn software development concepts through comprehensive guides, interactive quizzes, and interview preparation resources. Created by a Principal Software Engineer with 9+ years of industry experience, the platform offers structured learning paths across multiple technology domains.

## Connect with Us

- **LinkedIn:** [https://www.linkedin.com/in/arqam-dev/](https://www.linkedin.com/in/arqam-dev/)
- **YouTube:** [https://www.youtube.com/@codewitharqam](https://www.youtube.com/@codewitharqam)
- **Instagram:** [https://www.instagram.com/codewitharqam](https://www.instagram.com/codewitharqam)
- **TikTok:** [https://www.tiktok.com/@codewitharqam](https://www.tiktok.com/@codewitharqam)
- **GitHub:** [https://github.com/arqam-dev](https://github.com/arqam-dev)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arqam-dev/codewitharqam.git
cd codewitharqam
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Available Scripts

- `npm run dev` - Start development server on default port (3000)
- `npm run dev:3000` - Start development server on port 3000
- `npm run dev:3001` - Start development server on port 3001
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Project Features

### 📚 Comprehensive Learning Content
- **27+ Concepts** across 12+ categories
- Expandable sections with detailed explanations
- Real-world examples and best practices
- Categories include:
  - Frontend (JavaScript, React, Angular, HTML, CSS)
  - Backend (Node.js, GraphQL)
  - Full Stack (Next.js)
  - Cloud & DevOps (AWS, Cloud Computing)
  - Database (SQL, NoSQL)
  - Mobile Development
  - CS Fundamentals (Data Structures, OOP, OS, Networking, Hardware)
  - Tools (Git)
  - Web Development
  - Quality Assurance
  - VS Comparisons
  - Professional Skills

### 🎯 Interactive Quizzes
- 25-question quizzes for each concept
- Multiple choice questions with instant feedback
- Review mode showing correct/incorrect answers
- Scroll navigation for long quizzes

### 💼 Interview Questions
- Comprehensive Q&A for technical interviews
- Categories: Frontend, Backend, Databases, System Design
- General Questions & Answers
- Scenario-Based Questions & Answers
- Practical, real-world focused questions

### 🎨 Modern UI/UX
- Responsive design for all devices
- Dark mode support
- Smooth animations and transitions
- Interactive expandable sections
- Copy-to-clipboard functionality
- Fullscreen mode for content viewing

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Technologies Used

- **Framework:** Next.js 16.1.1
- **React:** 19.2.3
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript 5
- **Markdown:** react-markdown 10.1.0
- **Icons:** react-icons 5.5.0
- **Analytics:** Vercel Analytics

## Project Structure

```
codewitharqam/
├── app/
│   ├── content/          # Main content page with categories
│   ├── concepts/         # Individual concept pages
│   ├── interview-questions/  # Interview Q&A pages
│   ├── portfolio/        # Portfolio page
│   ├── api/              # API routes
│   ├── components/       # React components
│   ├── globals.css       # Global styles
│   └── page.tsx          # Home page
├── concepts/             # Markdown files for concepts
├── quizzes/              # JSON files for quiz questions
├── interview-questions/  # Markdown files for interview Q&A
└── public/               # Static assets
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## AI Content Enrichment

The website includes AI-powered content enrichment for expandable sections. Users can click "Enrich with AI" button in any expandable section to get detailed explanations.

**How it works:**
- Uses Hugging Face Inference API (completely free, no signup needed) by default
- Optionally supports OpenAI API (free tier available) for better results
- Provides fallback content if AI services are unavailable
- Seamlessly integrates with existing expandable concept sections

**Optional: Enhanced AI with OpenAI (Recommended)**
1. Get a free API key from [OpenAI](https://platform.openai.com/api-keys) (free tier available)
2. Add it to your `.env.local` file:
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key-here
   ```
3. Restart your development server

**Note:** The feature works without any API key using Hugging Face, but OpenAI provides better quality responses. The AI enrichment feature enhances learning by providing additional context and explanations for complex topics.

## Reviews System

The website includes a reviews/feedback system that uses Google Sheets as a free database alternative.

**Setup Instructions:**
1. Create a Google Sheet with columns: `Name`, `Email`, `Rating`, `Comment`, `Timestamp`
2. Go to **Extensions** → **Apps Script** in your Google Sheet
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([data.name, data.email, data.rating, data.comment, new Date().toISOString()]);
    return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    const reviews = [];
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] && data[i][0].toString().trim() !== '') {
        reviews.push({name: data[i][0], email: data[i][1], rating: data[i][2], comment: data[i][3], timestamp: data[i][4]});
      }
    }
    return ContentService.createTextOutput(JSON.stringify({reviews: reviews.reverse()})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.toString(), reviews: []})).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy** → **New deployment** → **Web app**
5. Set "Who has access" to **Anyone** and deploy
6. Copy the Web App URL and add to `.env.local`:
   ```
   GOOGLE_SHEETS_WEBHOOK_URL=your-web-app-url
   GOOGLE_SHEETS_PUBLIC_URL=your-web-app-url
   ```
7. Restart your dev server

## License

This project is private and proprietary.

## Contributing

This is a personal educational project. For suggestions or feedback, please reach out through our social media channels.

---

**Made with ❤️ by Arqam**
