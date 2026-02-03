const https = require('https');
const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/buscar') {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=celular';

    https.get(url, mlRes => {
      let data = '';
      mlRes.on('data', chunk => data += chunk);
      mlRes.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    }).on('error', () => {
      res.writeHead(500);
      res.end('erro');
    });
  } else {
    res.writeHead(200);
    res.end('ok');
  }
});

server.listen(PORT);
