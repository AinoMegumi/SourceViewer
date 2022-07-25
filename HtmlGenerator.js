const fs = require('fs');
const ExtensionPatternFile = './ContentTypePattern.json';
const Patterns = fs.existsSync(ExtensionPatternFile) ? JSON.parse(fs.readFileSync(ExtensionPatternFile)) : null;
const GetExtension = filename => filename.split('.').slice(-1)[0];

module.exports = filename => {
    if (Patterns == null) return null;
    const Ext = GetExtension(filename);
    const item = Patterns.ContentTypes.find(p => p.extension === Ext);
    if (item == null) return null;
    const BaseHtmlFile = './base/' + item.ContentType + '.html';
    if (!fs.existsSync(BaseHtmlFile)) return null;
    const html = fs.readFileSync(BaseHtmlFile, 'utf-8');
    const fileContent = fs.readFileSync(filename, 'utf-8');
    return html.replace('{FileContent}', fileContent);
};
