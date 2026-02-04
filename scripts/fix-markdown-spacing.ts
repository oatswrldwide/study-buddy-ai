import * as fs from 'fs';
import * as path from 'path';

const PSEO_DATA_DIR = path.join(process.cwd(), 'public', 'pseo-data');

interface PSEOPage {
  content: string;
  quickAnswer?: string;
  [key: string]: any;
}

function fixMarkdownSpacing(text: string): string {
  if (!text) return text;
  
  let fixed = text;
  
  // Fix headings that have content on same line - split heading from content
  // Match: ## Heading Text that continues...
  // Replace: ## Heading\n\nText that continues...
  fixed = fixed.replace(/(^#{1,6}\s+)([^\n#]+?)(\s+)([A-Z][a-z][^\n]{20,})/gm, (match, hashes, heading, space, content) => {
    // Only split if heading part is less than 80 chars and looks like a title
    const headingWords = heading.trim().split(' ');
    if (headingWords.length >= 5 && headingWords.length <= 15) {
      // Find a good split point (after about 5-10 words)
      const titleEnd = headingWords.slice(0, Math.min(10, headingWords.length)).join(' ');
      const remaining = heading.trim().substring(titleEnd.length).trim() + ' ' + content.trim();
      return `${hashes}${titleEnd}\n\n${remaining}`;
    }
    return match;
  });
  
  // Fix headings - ensure double newline after headings
  fixed = fixed.replace(/^(#{1,6}\s+[^\n]+)(\s*)([^#\n])/gm, '$1\n\n$3');
  
  // Fix punctuation separated by newlines (e.g., "text\n\n)" or "text\n\n.")
  fixed = fixed.replace(/([a-zA-Z0-9])\n+([.!?)])/g, '$1$2');
  
  // Fix paragraphs that run into each other - add space between sentences if missing
  fixed = fixed.replace(/([.!?])([A-Z])/g, '$1 $2');
  
  // Ensure proper spacing after periods in middle of sentences
  fixed = fixed.replace(/([.!?])([a-z])/g, '$1 $2');
  
  // Fix list items - ensure newline before lists  fixed = fixed.replace(/([^\n])\n(\*\s+)/g, '$1\n\n$2');
  fixed = fixed.replace(/([^\n])\n(\d+\.\s+)/g, '$1\n\n$2');
  
  // Fix table formatting - ensure newlines around tables
  fixed = fixed.replace(/([^\n])\n(\|[^\n]+\|)/g, '$1\n\n$2');
  
  // Fix table rows that have extra newlines
  fixed = fixed.replace(/(\|[^\n]+\|)\n\n(\|[^\n]+\|)/g, '$1\n$2');
  
  // Fix bullet points with extra spacing
  fixed = fixed.replace(/(\*\s+[^\n]+)\n\n(\*\s+)/g, '$1\n$2');
  
  // Fix numbered lists with extra spacing
  fixed = fixed.replace(/(\d+\.\s+[^\n]+)\n\n(\d+\.\s+)/g, '$1\n$2');
  
  // Fix links separated from text
  fixed = fixed.replace(/\n\n(\[[^\]]+\]\([^)]+\))\n\n/g, '\n\n$1\n');
  
  // Fix multiple consecutive spaces
  fixed = fixed.replace(/ {2,}/g, ' ');
  
  // Fix triple+ newlines to double newlines
  fixed = fixed.replace(/\n{3,}/g, '\n\n');
  
  // Trim whitespace
  fixed = fixed.trim();
  
  return fixed;
}

function fixPageContent(filePath: string): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const page: PSEOPage = JSON.parse(content);
    
    let modified = false;
    
    // Fix main content
    if (page.content) {
      const fixedContent = fixMarkdownSpacing(page.content);
      if (fixedContent !== page.content) {
        page.content = fixedContent;
        modified = true;
      }
    }
    
    // Fix quickAnswer
    if (page.quickAnswer) {
      const fixedQuickAnswer = fixMarkdownSpacing(page.quickAnswer);
      if (fixedQuickAnswer !== page.quickAnswer) {
        page.quickAnswer = fixedQuickAnswer;
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(page, null, 2), 'utf-8');
      console.log(`✓ Fixed: ${path.basename(filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`✗ Error fixing ${filePath}:`, error);
    return false;
  }
}

function main() {
  console.log('Starting markdown spacing fix...\n');
  
  const files = fs.readdirSync(PSEO_DATA_DIR)
    .filter(file => file.endsWith('.json'));
  
  let fixedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(PSEO_DATA_DIR, file);
    if (fixPageContent(filePath)) {
      fixedCount++;
    }
  }
  
  console.log(`\n✅ Complete: Fixed ${fixedCount} of ${files.length} files`);
}

main();
