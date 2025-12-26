#CodeWithArqam - https://codewitharqam.com/
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## AI Content Enrichment

The website includes AI-powered content enrichment for expandable sections. Users can click "Enrich with AI" button in any expandable section to get detailed explanations.

**How it works:**
- Uses Hugging Face Inference API (completely free, no signup needed) by default
- Optionally supports OpenAI API (free tier available) for better results
- Provides fallback content if AI services are unavailable

**Optional: Enhanced AI with OpenAI (Recommended)**
1. Get a free API key from [OpenAI](https://platform.openai.com/api-keys) (free tier available)
2. Add it to your `.env.local` file:
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key-here
   ```
3. Restart your development server

**Note:** The feature works without any API key using Hugging Face, but OpenAI provides better quality responses.

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
