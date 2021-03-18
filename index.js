const express = require('express');
const serveStatic = require('serve-static');
const puppeteer = require('puppeteer');
let app;
 
async function runStaticServer() {
  try {
    const app = express(); 
    app.use(serveStatic('./build')); // , { 'index': ['default.html', 'default.htm'] }
    await app.listen(3000);
    console.log('server is running');
    return 'http://localhost:3000';
  } catch(err) {
    return false;
  }
}

async function runPuppeteer(url) {
  console.log('runPuppeteer');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, {waitUntil: 'networkidle0'});
  // await page.waitForNavigation();
  

  console.log('load HTML');
  const html = await page.content(); // serialized HTML of page DOM.
  console.log('html', html);

  await browser.close();
  return html;
} 

function stopStaticServer() {
  app.close();
}

async function run() {
  const staticServerURL = await runStaticServer();

  if (!staticServerURL) return 0;

  const html = await runPuppeteer(staticServerURL);
  if (html) {
    stopStaticServer();
  }
}
   
module.exports = {
  run
}

  // await page.setRequestInterception(true);
  // page.on('request', async (req) => {
  //   console.log('req', req._url);
  //   await req.continue();
  // })
  // page.on('response', async (response) => {
  //   const res = await response.url();
  //   return res;
  // });