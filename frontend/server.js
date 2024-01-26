const express = require('express');
const next = require('next');
const https = require('https');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

const sslOptions = {
    pfx: fs.readFileSync('secure-markdown.pfx'),
    passphrase: 'Haslo123@', // Set the password you used during the PKCS12 file creation
};

app.prepare().then(() => {
    const server = express();

    // Your existing Next.js routes
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    // HTTPS server
    https.createServer(sslOptions, server).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on https://localhost:${port}`);
    });
});