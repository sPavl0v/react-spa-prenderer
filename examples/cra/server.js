const express = require('express');
const serveStatic = require('serve-static');
const app = express();
const resolve = require('path').resolve;

app.use(serveStatic(resolve('./build')));
app.get('/', (req, res) => res.sendFile(resolve('./build/index.html')))

app.get('/about', (req, res) => res.sendFile(resolve('./build/about.html')));
app.get('/services', (req, res) => res.sendFile(resolve('./build/services.html')));

app.listen(3000, () => console.log('Started on PORT 3000'));
