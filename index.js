const express = require('express');
const serveStatic = require('serve-static');
 
function startStaticServer() {
  const app = express();
 
  app.use(serveStatic('./build')) // , { 'index': ['default.html', 'default.htm'] }
  app.listen(3000)
}

function run() {
  startStaticServer();
}
   
module.exports = {
  run
}