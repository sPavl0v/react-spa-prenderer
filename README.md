# react-spa-prerender
The easiest way to prerender static pages, optimize SEO and build high performance for your React SPA.
Build production-ready code just by adding few lines of code. [Example of usage with create-react-app](https://github.com/sPavl0v/react-spa-prenderer/tree/master/examples/cra)

Follow the steps below:

## Install
With npm
```
npm install react-spa-prerender --save-dev
```
With yarn
```
yarn add react-spa-prerender --dev
```

## Add as postbuild script
In your package.json add the following in the scripts section:
```
"scripts": {
    "postbuild": "react-spa-prerender",
}
```

## Add .rsp.json file
__.rsp.json__ is the configuration file for `react-spa-prerender`. Create this file in your __application root folder__.
The minimum configuration requires the __routes__ you want to be parsed.
Example:
```
{
    routes: [
        "/",
        "/about",
        "/services"
        ...
    ]
}
```
From example above:
Your "/" route will transform into "index.html" page.
"/about" -> "index.html"
"/services" -> "services.html"
and so on...

__The rest of the .rsp.json options described below__

## Add ReactDOM.hydrate in your index.js 
In your index.js(main app file) change the ReactDOM.render logic:
```
import ReactDOM from 'react-dom';

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
Into following:
```
import ReactDOM from 'react-dom';

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
} else {
  ReactDOM.render(<App />, rootElement);
}
```

## Voila!!!
That's it. After accomplishing all the steps above, run you build command and your prerendered files will be in your build directory.

## .rsp.json Options
```
|option | type | default | description |
|-----|--------|------|---------|
| routes(Required) | Array | - | An array of routes you want to parse and prerender into static html|
| port | String | '3000' | port where prerendering server will be starting |
| buildDirectory | String | './build' | a relative path to your build folder
```