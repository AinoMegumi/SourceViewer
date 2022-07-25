const express = require('express');
const filetree = require('./filetree.js');
const fs = require('fs');
const GenHtml = require('./HtmlGenerator.js');
const app = express();

const server = () => {
    app.get('/source', (req, res) => {
        if (!req.query.file) {
            const result = filetree('./Src');
            if (result.files.length === 0) return res.sendStatus(404);
            res.type('application/json');
            return res.send(result);
        }
        const sourceFilePath = './Src/' + req.query.file;
        if (!fs.existsSync(sourceFilePath)) return res.sendStatus(404);
        const html = GenHtml(sourceFilePath);
        if (html == null) return res.download(sourceFilePath);
        res.type('text/html');
        res.send(html);
    });
    app.use(express.static('wwwroot'));
    return app;
};

server().listen(process.env.HTTP_PLATFORM_PORT || 10600);
