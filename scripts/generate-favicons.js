const sharp = require('sharp');
const fs = require('fs');

const svgBuffer = fs.readFileSync('./public/favicon.svg');

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' }
];

async function generateFavicons() {
  console.log('Generating favicons...');
  
  for (const { size, name } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`./public/${name}`);
    console.log(`✓ Created ${name} (${size}x${size})`);
  }
  
  // Create favicon.ico (32x32 is most common)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile('./public/favicon.ico');
  console.log('✓ Created favicon.ico (32x32)');
  
  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
