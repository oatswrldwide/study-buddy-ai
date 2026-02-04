import * as fs from 'fs';
import * as path from 'path';

const PSEO_DATA_DIR = path.join(process.cwd(), 'public', 'pseo-data');

interface PSEOPage {
  content: string;
  quickAnswer?: string;
  [key: string]: any;
}

function fixContent(text: string): string {
  if (!text) return text;
  
  let fixed = text;
  
  // Fix escaped quotes and newlines (but not legitimate newlines)
  fixed = fixed.replace(/\\"/g, '"');
  
  // Fix specific broken headings that we know about
  // Fix broken title that shouldn't be split: "# Title:\n\nRest of title"
  fixed = fixed.replace(/(^#\s+[^:\n]+:)\n\n([A-Z][^\n#]+)/gm, '$1 $2');
  
  // Fix "## Heading\n\nNot ..." where "Not" is part of the heading
  fixed = fixed.replace(/(^##\s+Feeling Overwhelmed is Normal, But Staying Behind is)\n\n(Not\s)/gm, '$1 $2');
  
  // Fix ## Heading\n\nYour where "Your" is part of heading
  fixed = fixed.replace(/(^##\s+Introducing StudyBuddy:)\n\n(Your 24\/7 AI Tutor)/gm, '$1 $2');
  
  // Fix "## With Finals Approaching,\n\nEvery Day Counts" 
  fixed = fixed.replace(/(^##\s+With Finals Approaching,)\n\n(Every Day Counts)/gm, '$1 $2');
  
  // Fix "## Don't Let ... Back\n\nStart your" to keep heading together but separate paragraph
  fixed = fixed.replace(/(^##\s+Don't Let [^\n]+ Back)\n\n(Start your free trial)/gm, '$1\n\n$2');
  
  // Fix really broken headings where content follows immediately after with no space
  // "## Long Heading Did you know..." -> "## Long Heading\n\nDid you know..."
  fixed = fixed.replace(/(^##\s+The Shocking Truth[^\n]+?Students)\s+(Did you know)/gm, '$1\n\n$2');
  fixed = fixed.replace(/(^##\s+Introducing[^\n:]+Tutor)\s+(StudyBuddy's 24\/7)/gm, '$1\n\n$2');
  fixed = fixed.replace(/(^##\s+[^\n]{40,}?Tutor)\s+(StudyBuddy's)/gm, '$1\n\n$2');
  
  // Fix text that continues from heading but got separated: "...mountain to climb\n\nMany students"
  fixed = fixed.replace(/(but you're not alone\.)\n\n(Many students)/g, '$1 $2');
  fixed = fixed.replace(/(With the right support, you can too\.)\n\n(Our AI tutor provides:)/g, '$1\n\n$2');
  
  // Fix broken line in middle of sentence
  fixed = fixed.replace(/([a-z,])\n\n(Our AI tutor provides:)/g, '$1\n\n$2');
  fixed = fixed.replace(/([a-z])\n\n([a-z])/g, '$1$2');
  
  // Fix "### 8. FA\n\nQ" -> "### 8. FAQ"
  fixed = fixed.replace(/###\s+8\.\s+FA\n\nQ/g, '### 8. FAQ');
  
  // Fix table rows with extra newlines between them
  fixed = fixed.replace(/(\|[^\n]+\|)\n\n(\|[^\n]+\|)/g, '$1\n$2');
  
  // Ensure proper spacing after headings (double newline)
  fixed = fixed.replace(/(^#{1,6}\s+[^\n]+)\n([^#\n*|])/gm, '$1\n\n$2');
  
  // Fix links that are separated by too many newlines
  fixed = fixed.replace(/\n{3,}(\[[^\]]+\]\([^)]+\))/g, '\n\n$1');
  
  // Remove triple+ newlines
  fixed = fixed.replace(/\n{3,}/g, '\n\n');
  
  // Trim
  fixed = fixed.trim();
  
  return fixed;
}

function fixPage(filePath: string): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const page: PSEOPage = JSON.parse(content);
    
    let modified = false;
    
    // Fix content
    if (page.content) {
      const fixedContent = fixContent(page.content);
      if (fixedContent !== page.content) {
        page.content = fixedContent;
        modified = true;
      }
    }
    
    // Fix quickAnswer
    if (page.quickAnswer) {
      const fixedQuickAnswer = fixContent(page.quickAnswer);
      if (fixedQuickAnswer !== page.quickAnswer) {
        page.quickAnswer = fixedQuickAnswer;
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(page, null, 2), 'utf-8');
      const fileName = path.basename(filePath);
      console.log(`✓ ${fileName}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`✗ Error: ${path.basename(filePath)}`, error);
    return false;
  }
}

function main() {
  console.log('🔧 Fixing PSEO page formatting...\n');
  
  const files = fs.readdirSync(PSEO_DATA_DIR)
    .filter(file => file.endsWith('.json'))
    .sort();
  
  let fixedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(PSEO_DATA_DIR, file);
    if (fixPage(filePath)) {
      fixedCount++;
    }
  }
  
  console.log(`\n✅ Fixed ${fixedCount} of ${files.length} files`);
}

main();
