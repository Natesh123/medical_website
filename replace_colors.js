const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'src', 'components', 'Admin');

const findAndReplace = (dir) => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findAndReplace(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;

            // Replace dark blue hover hex with dark green hover hex
            if (content.includes('#083d8d')) { 
                content = content.replace(/#083d8d/gi, '#14532d'); // emerald-800
                updated = true;
            }

            if (updated) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    });
};

findAndReplace(adminDir);
console.log('Replacement complete for hover color.');
