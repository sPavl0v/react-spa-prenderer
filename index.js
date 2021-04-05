const express = require('express');
const fs = require('fs');
var resolve = require('path').resolve
const puppeteer = require('puppeteer');
let app;

async function readOptionsFromFile() {
  const config = await fs.readFileSync('./.rsp.json');
  const options = JSON.parse(config.toString());
  return options;
}

async function runStaticServer(port, routes, dir) {
  try {
    app = express();
    const resolvedPath = resolve(dir); 
    app.use(express.static(resolvedPath));
    routes.forEach(route => {
      app.get(route, (req, res) => {
        res.sendFile(`${resolvedPath}/index.html`);
      })
    })

    await app.listen(port);
    return `http://localhost:${port}`;
  } catch(err) {
    return false;
  }
}

async function createNewHTMLPage(route, html, dir) {
  const fname = route === '/' ? 'index' : route;
  await fs.writeFileSync(`${dir}/${fname}.html`, html, {encoding: 'utf-8', flag: 'w'});
  console.log(`Created ${fname}.html`);
}

async function getHTMLfromPuppeteerPage(browser, pageUrl) {
  const page = await browser.newPage();
  await page.goto(pageUrl, {waitUntil: 'networkidle0'});
  const html = await page.content();
  if (!html) return 0;
  return html;
}

async function runPuppeteer(baseUrl, routes, dir) {
  console.log('runPuppeteer');
  const browser = await puppeteer.launch();
  for (let i = 0; i < routes.length; i++) {
    try {
      console.log(`Processing route "${routes[i]}"`);
      const html = await getHTMLfromPuppeteerPage(browser, `${baseUrl}${routes[i]}`);
      if (html) createNewHTMLPage(routes[i], html);
      else return 0;
    } catch (err) {
      console.error(`Error: Failed to process route "${routes[i]}"`);
      console.error(`Message: ${err}`);
      return 0;
    }
  }

  await browser.close();
  return;
} 

async function run() {
  const options = await readOptionsFromFile();
  const staticServerURL = await runStaticServer(options.port || 3000, options.routes, options.buildDirectory || './build');

  if (!staticServerURL) return 0;

  await runPuppeteer(staticServerURL, options.routes, options.buildDirectory || './build');
  console.log('Finish react-spa-prerender tasks!');
  process.exit();
}
   
module.exports = {
  run
}
