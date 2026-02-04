import * as fs from 'fs';
import * as path from 'path';

const PSEO_DATA_DIR = path.join(process.cwd(), 'public', 'pseo-data');

interface PSEOPage {
  content: string;
  quickAnswer?: string;
  [key: string]: any;
}

// Common heading patterns that need to be split
const headingPatterns = [
  { pattern: /(## The Shocking Truth[^#]+?)( Did you know)/, split: 1 },
  { pattern: /(## Feeling Overwhelmed[^#]+?)( Struggling with)/, split: 1 },
  { pattern: /(## Introducing StudyBuddy:[^#]+?)( StudyBuddy's)/, split: 1 },
  { pattern: /(## With Finals Approaching[^#]+?)( Don't let)/, split: 1 },
  { pattern: /(## Don't Let [^#]+? Back)( Start your)/, split: 1 },
  { pattern: /(## [\d]+ Benefits[^#]+?Tutor)(\n\n\* \*\*)/, split: 1 },
];

function fixHeadingsManually(text: string): string {
  if (!text) return text;
  
  let fixed = text;
  
  // Split long heading lines that contain both heading and content
  // Pattern: ## Heading Text Paragraph Content
  const lines = fixed.split('\n');
  const newLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if line is a heading with too much text (likely has paragraph content)
    if (line.match(/^##\s+/) && line.length > 60) {
      // Try to find where heading ends and paragraph begins
      // Headings typically end before "Did you know", "Struggling with", etc.
      let splitMatches = [
        line.match(/(^## [^\.!?]+?)(\s+)(Did you know|Struggling with|Our |Don't let|Start your|With |Get |StudyBuddy's|Every |Many studentsIn |At |The |You can|This |If you're)/),
        line.match(/(^## [^\.!?]{10,80}?)(\s{2,}|\. )(.+)/),
      ];
      
      let matched = false;
      for (const match of splitMatches) {
        if (match && match[1] && match[3]) {
          newLines.push(match[1].trim());
          newLines.push('');
          newLines.push(match[3].trim());
          matched = true;
          break;
        }
      }
      
      if (!matched) {
        newLines.push(line);
      }
    } else {
      newLines.push(line);
    }
  }
  
  return newLines.join('\n');
}

function fixPageContent(filePath: string): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const page: PSEOPage = JSON.parse(content);
    
    let modified = false;
    
    // Fix main content
    if (page.content) {
      const fixedContent = fixHeadingsManually(page.content);
      if (fixedContent !== page.content) {
        page.content = fixedContent;
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
  console.log('Splitting heading paragraphs...\n');
  
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
