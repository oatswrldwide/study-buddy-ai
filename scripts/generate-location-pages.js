import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the built index.html
const indexPath = path.join(__dirname, '../dist/index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf-8');

// Major locations to pre-render (top 50 for SEO)
const majorLocations = [
  'johannesburg', 'pretoria', 'cape-town', 'durban', 'soweto', 'alexandra', 'tembisa',
  'sandton', 'centurion', 'midrand', 'randburg', 'roodepoort', 'benoni', 'boksburg',
  'germiston', 'kempton-park', 'alberton', 'springs', 'brakpan', 'edenvale', 'krugersdorp',
  'vereeniging', 'vanderbijlpark', 'rosebank', 'bryanston', 'fourways', 'rivonia',
  'hatfield', 'menlo-park', 'lynnwood', 'waterkloof', 'brooklyn-pretoria',
  'mamelodi', 'atteridgeville', 'soshanguve', 'hammanskraal',
  'constantia', 'camps-bay', 'sea-point', 'woodstock', 'observatory', 'claremont',
  'umhlanga', 'chatsworth', 'phoenix', 'kwamashu', 'umlazi', 'pinetown',
  'port-elizabeth', 'bloemfontein', 'polokwane', 'nelspruit'
];

console.log(`Generating ${majorLocations.length} location pages...`);

// Create tutor directory in dist
const tutorDir = path.join(__dirname, '../dist/tutor');
if (!fs.existsSync(tutorDir)) {
  fs.mkdirSync(tutorDir, {recursive: true });
}

// Generate an index.html for each location
let generated = 0;
for (const location of majorLocations) {
  const locationDir = path.join(tutorDir, location);
  
  try {
    if (!fs.existsSync(locationDir)) {
      fs.mkdirSync(locationDir, { recursive: true });
    }
    
    // Write index.html (copy of main index.html)
    fs.writeFileSync(path.join(locationDir, 'index.html'), indexHtml);
    generated++;
  } catch (error) {
    console.error(`Failed to generate ${location}:`, error.message);
  }
}

console.log(`✓ Successfully generated ${generated} location pages`);
console.log(`  Located in: dist/tutor/[location]/index.html`);
