import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      // Backgrounds
      content = content.replace(/(background(?:-color)?\s*:\s*)(#ffffff|white|#fff\b)/gi, '$1#18181b');
      content = content.replace(/(background(?:-color)?\s*:\s*)(#f8fafc|#f8f9fa)/gi, '$1#09090b');
      content = content.replace(/(background(?:-color)?\s*:\s*)(#f1f3f5|#f1f5f9|#e9eef7)/gi, '$1#27272a');
      content = content.replace(/(background(?:-color)?\s*:\s*)(#e9ecef)/gi, '$1#3f3f46');
      content = content.replace(/(background(?:-color)?\s*:\s*)(#dee2e6)/gi, '$1#52525b');
      
      // Gradients (Specific light gradients to dark gradients)
      content = content.replace(/linear-gradient\(135deg,\s*(#f(?:8fafc|8f9fa|fffff)),\s*(#f(?:1f3f5|1f5f9|eeef7))\)/gi, 'linear-gradient(135deg, #18181b, #09090b)');

      // Borders
      content = content.replace(/(border(?:-[a-z]+)?\s*:\s*[^;]*)(#e2e8f0|#cbd5e1|#ddd\b)/gi, '$1#3f3f46');
      content = content.replace(/(border(?:-[a-z]+)?\s*:\s*[^;]*)rgba\(226,\s*232,\s*240,\s*0\.8\)/gi, '$1rgba(63, 63, 70, 0.8)');
      content = content.replace(/(border(?:-[a-z]+)?\s*:\s*[^;]*)rgba\(203,\s*213,\s*225,\s*0\.8\)/gi, '$1rgba(82, 82, 91, 0.8)');

      // Colors (Text)
      content = content.replace(/(color\s*:\s*)(#0f172a|#1e293b|#1a1a1a|#000\b|#000000|#333\b|#333333)/gi, '$1#f4f4f5');
      content = content.replace(/(color\s*:\s*)(#334155)/gi, '$1#d4d4d8');
      content = content.replace(/(color\s*:\s*)(#475569|#64748b|#777\b)/gi, '$1#a1a1aa');

      // Variables in App.css / index.css
      content = content.replace(/--bg:\s*#f8fafc;/gi, '--bg: #09090b;');
      content = content.replace(/--card:\s*#ffffff;/gi, '--card: #18181b;');
      content = content.replace(/--text:\s*#0f172a;/gi, '--text: #f4f4f5;');

      // Glassmorphism panels
      content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.95\)/g, 'rgba(24, 24, 27, 0.95)');
      content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.9\)/g, 'rgba(24, 24, 27, 0.9)');
      content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.8\)/g, 'rgba(39, 39, 42, 0.8)');
      content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.5\)/g, 'rgba(39, 39, 42, 0.5)');

      // Enhance shadows for dark mode
      content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.05\)/g, 'rgba(0, 0, 0, 0.4)');
      content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.08\)/g, 'rgba(0, 0, 0, 0.5)');
      content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.1\)/g, 'rgba(0, 0, 0, 0.6)');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Dark theme conversion complete!');
