const fs = require('fs');
const path = require('path');

function convertTextToMarkdown(textContent, fileName) {
  let lines = textContent.split('\n');
  let markdown = '';
  let currentSection = null;
  let sectionContent = [];
  
  // Extract title from filename or content
  let title = fileName.replace('.txt', '').replace(/_/g, ' ').replace(/-/g, ' ');
  title = title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  
  // Special handling for specific titles
  if (title.toLowerCase().includes('sales')) title = 'Sales & Pre-Sales';
  if (title.toLowerCase().includes('aws')) title = 'AWS Certification';
  
  // Find title in content (usually centered between separators)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line && !line.startsWith('-->') && !line.startsWith('->') && 
        !line.match(/^[-=_]{10,}$/) && line.length > 2 && line.length < 100) {
      // Check if it looks like a title (centered or standalone)
      if (i > 0 && i < lines.length - 1) {
        const prevLine = lines[i-1].trim();
        const nextLine = lines[i+1].trim();
        if ((prevLine.match(/^[-=_]{10,}$/) || prevLine === '') && 
            (nextLine.match(/^[-=_]{10,}$/) || nextLine === '')) {
          title = line;
          break;
        }
      }
    }
  }
  
  markdown += `# ${title}\n\n`;
  
  // Process lines
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Skip decorative separators
    if (trimmed.match(/^[-=_]{10,}$/)) {
      continue;
    }
    
    // Skip empty lines at section boundaries
    if (!trimmed && i > 0 && i < lines.length - 1) {
      const nextTrimmed = lines[i+1].trim();
      if (nextTrimmed.startsWith('-->') || nextTrimmed.match(/^[-=_]{10,}$/)) {
        continue;
      }
    }
    
    // Detect section header: --> Section Name:
    if (trimmed.startsWith('-->')) {
      // Save previous section
      if (currentSection) {
        markdown += `<expand title="${currentSection}">\n`;
        markdown += `## ${currentSection}\n\n`;
        markdown += formatSectionContent(sectionContent);
        markdown += `</expand>\n\n`;
      }
      
      // Start new section
      currentSection = trimmed.replace(/^-->/, '').trim().replace(/[:：]$/, '');
      sectionContent = [];
    } else if (trimmed.startsWith('->')) {
      // Bullet point
      const content = trimmed.replace(/^->/, '').trim();
      sectionContent.push({ type: 'bullet', content, indent: getIndentLevel(line) });
    } else if (trimmed.length > 0) {
      // Regular content
      sectionContent.push({ type: 'text', content: trimmed, indent: getIndentLevel(line) });
    }
  }
  
  // Save last section
  if (currentSection) {
    markdown += `<expand title="${currentSection}">\n`;
    markdown += `## ${currentSection}\n\n`;
    markdown += formatSectionContent(sectionContent);
    markdown += `</expand>\n\n`;
  }
  
  return markdown;
}

function getIndentLevel(line) {
  const match = line.match(/^(\s*)/);
  return match ? Math.floor(match[1].length / 2) : 0; // Assuming 2 spaces per indent level
}

function formatSectionContent(content) {
  let result = '';
  let inList = false;
  let currentIndent = 0;
  
  for (const item of content) {
    if (item.type === 'bullet') {
      const indent = item.indent || 0;
      
      // Close previous list if indent changed
      if (inList && indent < currentIndent) {
        result += '\n';
        inList = false;
      }
      
      // Start new list if needed
      if (!inList) {
        inList = true;
        currentIndent = indent;
      }
      
      // Add bullet with proper indentation
      const indentStr = '  '.repeat(indent);
      result += `${indentStr}- ${item.content}\n`;
    } else {
      // Close list before text
      if (inList) {
        result += '\n';
        inList = false;
      }
      
      // Add text
      if (item.content) {
        // Check if it's a code block or special formatting
        if (item.content.startsWith('```') || item.content.match(/^[a-z]+\s*[:=]/i)) {
          result += `${item.content}\n\n`;
        } else {
          result += `${item.content}\n\n`;
        }
      }
    }
  }
  
  if (inList) {
    result += '\n';
  }
  
  return result;
}

// Main conversion
const notesOldPath = path.join(__dirname, '..', 'Notes-OLD');
const conceptsPath = path.join(__dirname, '..', 'concepts');

if (!fs.existsSync(conceptsPath)) {
  fs.mkdirSync(conceptsPath, { recursive: true });
}

const files = fs.readdirSync(notesOldPath).filter(file => file.endsWith('.txt'));

console.log(`Found ${files.length} files to convert...\n`);

for (const file of files) {
  // Skip React_Notes.txt since we already have react.md
  if (file === 'React_Notes.txt') {
    console.log(`⏭️  Skipping ${file} (already converted)`);
    continue;
  }
  
  try {
    const filePath = path.join(notesOldPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const markdown = convertTextToMarkdown(content, file);
    
    // Create markdown filename
    let mdFileName = file.replace('.txt', '').toLowerCase()
      .replace(/_/g, '-')
      .replace(/&/g, '-')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '') + '.md';
    
    // Special cases
    if (file.includes('Sales')) mdFileName = 'sales-presales.md';
    if (file.includes('AWS')) mdFileName = 'aws-certification.md';
    
    const mdFilePath = path.join(conceptsPath, mdFileName);
    fs.writeFileSync(mdFilePath, markdown, 'utf8');
    console.log(`✅ Converted: ${file} -> ${mdFileName}`);
  } catch (error) {
    console.error(`❌ Error converting ${file}:`, error.message);
  }
}

console.log('\n✨ Conversion complete!');
