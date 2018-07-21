// default imports
const url = require('url');
const fs = require('fs');

// custom imports
const dt = require('./myDateTime');
const mn = require('./meuNome');

const http = require('http');
http.createServer(function ( req, res ) {
    const parsedUrl = url.parse(req.url, true);

    // tratamento de exceção (index)
    if (parsedUrl.pathname === '/') {
        parsedUrl.pathname = '/index.html';
    }

    // roteamento
    if (['/index.html', '/demo.html', '/home.html'].indexOf(parsedUrl.pathname) > -1) {
        fs.readFile('./static/'+parsedUrl.pathname, (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    else if (parsedUrl.pathname === '/stats') {
        res.writeHead( 200, { 'Content-Type': 'text/plain; charset=utf-8' } );
        res.write([
            ['Você veio via', req.url].join(': '),
            'Hello World!',
            ['myDateTime', dt.myDateTime()].join(': '),
            ['meuNome', mn.meuNome()].join(': '),
            JSON.stringify(parsedUrl, null, '\t'),
        ].join('\n'));
        res.end();
    } else {
        fs.readFile('./static/404.html', (err, data) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    
}).listen(process.env.PORT || 8080);