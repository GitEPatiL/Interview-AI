const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'frontend/src/features/interview/style/home.scss'),
  path.join(__dirname, 'frontend/src/features/interview/style/interview.scss')
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace dark topbar/navbar backgrounds
  content = content.replace(/rgba\(5,5,8,0\.85\)/g, 'rgba(255, 235, 204, 0.85)');
  
  // Replace white text overrides (if any) with black
  content = content.replace(/color:\s*#fff\s*!important/g, 'color: #111827 !important');
  content = content.replace(/color:\s*#ffffff/g, 'color: #111827');
  
  // Replace dark cards/bottom bars
  content = content.replace(/background:\s*#0c0c14/g, 'background: #FFEBCC');
  
  // Invert black to white for inner glass containers if any? No, we use #FFEBCC
  
  // Replace whitesmoke with dark text if left over
  content = content.replace(/whitesmoke/g, '#111827');

  // Fix SVG fill/strokes that are white to black
  content = content.replace(/fill:\s*#fff/g, 'fill: #111827');
  content = content.replace(/stroke:\s*#fff/g, 'stroke: #111827');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
}
