const fs = require('fs');
const path = require('path');

const conceptsPath = path.join(__dirname, '..', 'concepts');
const appConceptsPath = path.join(__dirname, '..', 'app', 'concepts');

// Get all markdown files
const files = fs.readdirSync(conceptsPath).filter(file => file.endsWith('.md'));

console.log(`Creating page.tsx files for ${files.length} concepts...\n`);

for (const file of files) {
  // Get concept name from filename (remove .md extension)
  const conceptName = file.replace('.md', '');
  
  // Create folder path
  const conceptFolder = path.join(appConceptsPath, conceptName);
  
  // Create folder if it doesn't exist
  if (!fs.existsSync(conceptFolder)) {
    fs.mkdirSync(conceptFolder, { recursive: true });
  }
  
  // Create page.tsx file
  const pagePath = path.join(conceptFolder, 'page.tsx');
  
  // Generate component name (capitalize first letter of each word)
  const componentName = conceptName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Page';
  
  const pageContent = `import fs from "fs";
import path from "path";
import ConceptPageContent from "@/app/components/ConceptPageContent";

export default function ${componentName}() {
  const filePath = path.join(process.cwd(), "concepts/${conceptName}.md");
  const content = fs.readFileSync(filePath, "utf8");
  return <ConceptPageContent content={content} />;
}
`;
  
  fs.writeFileSync(pagePath, pageContent, 'utf8');
  console.log(`✅ Created: app/concepts/${conceptName}/page.tsx`);
}

console.log('\n✨ All concept pages created!');

