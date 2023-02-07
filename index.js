const express = require("express");
const fs = require("fs");
const resolve = require("path").resolve;
const puppeteer = require("puppeteer");
const {
  normalizeRspOptions,
  ensureDirExists,
  getValidatedFileName,
} = require("./utils");
let app;

/**
 * @returns {object}
 */
async function readOptionsFromFile() {
  try {
    const config = await fs.readFileSync("./.rsp.json");
    const options = normalizeRspOptions(JSON.parse(config.toString()));
    return options;
  } catch (err) {
    throw new Error(
      `Error: Failed to read options from '.rsp.json'.\nMessage: ${err}`
    );
  }
}

/**
 * @param {number} port
 * @param {string} routes
 * @param {string} dir
 * @returns {string|boolean}
 */
async function runStaticServer(port, routes, dir) {
  try {
    app = express();
    const resolvedPath = resolve(dir);
    app.use(express.static(resolvedPath));
    routes.forEach((route) => {
      app.get(route, (req, res) => {
        res.sendFile(`${resolvedPath}/index.html`);
        1;
      });
    });

    await app.listen(port);
    return `http://localhost:${port}`;
  } catch (err) {
    throw new Error(
      `Error: Failed to run puppeteer server on port ${port}.\nMessage: ${err}`
    );
  }
}

/**
 *
 * @param {string} route
 * @param {string} html
 * @param {string} dir
 */
async function createNewHTMLPage(route, html, dir) {
  try {
    if (route.indexOf("/") !== route.lastIndexOf("/")) {
      const subDir = route.slice(0, route.lastIndexOf("/"));
      await ensureDirExists(`${dir}${subDir}`);
    }

    const fileName = getValidatedFileName(route);

    await fs.writeFileSync(`${dir}${fileName}`, html, {
      encoding: "utf-8",
      flag: "w",
    });

    consoleColor(`Created ${fileName}`, "Green");

    if (fileName == "/index.html") {
      await fs.writeFileSync(`${dir}/200.html`, html, {
        encoding: "utf-8",
        flag: "w",
      });
      consoleColor(`Created /200.html`, "Green");
    }
  } catch (err) {
    throw new Error(
      `Error: Failed to create HTML page for ${route}.\nMessage: `,
      err
    );
  }
}

/**
 * @param {object} browser
 * @param {string} pageUrl
 * @param {object} options
 * @returns {string|number}
 */
async function getHTMLfromPuppeteerPage(browser, pageUrl, options) {
  try {
    const page = await browser.newPage();
    if (options?.userAgent) await page.setUserAgent(options.userAgent);

    await page.goto(
      pageUrl,
      Object.assign({ waitUntil: "networkidle0" }, options)
    );

    const html = await page.content();
    if (!html) return 0;

    return html;
  } catch (err) {
    throw new Error(
      `Error: Failed to build HTML for ${pageUrl}.\nMessage: ${err}`
    );
  }
}

/**
 * @param {string} baseUrl
 * @param {string[]} routes
 * @param {string} dir
 * @param {object} engine
 * @returns {number|undefined}
 */
async function runPuppeteer(baseUrl, routes, dir, engine) {
  const browser = await puppeteer.launch(engine.launchOptions);
  for (let i = 0; i < routes.length; i++) {
    try {
      consoleColor(`Processing route ${routes[i]}`, "Yellow");
      const html = await getHTMLfromPuppeteerPage(
        browser,
        `${baseUrl}${routes[i]}`,
        engine.gotoOptions
      );
      if (html) createNewHTMLPage(routes[i], html, dir);
      else return 0;
    } catch (err) {
      throw new Error(
        `Error: Failed to process route "${routes[i]}"\nMessage: ${err}`
      );
    }
  }

  await browser.close();
  return;
}

async function run(config) {
  const options = config || (await readOptionsFromFile());
  const r = options.routes;
  const routes = [...r, "/404"];
  const staticServerURL = await runStaticServer(
    options.port,
    routes,
    options.buildDirectory
  );

  if (!staticServerURL) return 0;

  await runPuppeteer(
    staticServerURL,
    routes,
    options.buildDirectory,
    options.engine
  );
  consoleColor("Finish react-spa-prerender tasks!", "White");
  process.exit();
}

module.exports = {
  run,
};

function consoleColor(msg, color = "Blue") {
  const colors = {
    Black: "30m",
    Red: "31m",
    Green: "32m",
    Yellow: "33m",
    Blue: "34m",
    Purple: "35m",
    Cyan: "36m",
    White: "37m",
  };

  console.log(`\x1b[${colors[color]}${msg}`);
}
