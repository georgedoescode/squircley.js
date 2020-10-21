<img src="https://raw.githubusercontent.com/georgedoescode/squircley.js/main/og-image.png">

# squircley.js

squircley.js is a simple javascript library for quickly and easily creating squircles based on
https://squircley.app

You can currently find squircley.js on NPM at https://www.npmjs.com/package/squircleyjs

## Demo

A codesandbox demo is available @ https://lfqop.csb.app/

## Usage

**createSquircle**

```javascript
import { createSquircle } from 'squircleyjs';

// Create an SVG squircle and append it to the DOM
const target = document.querySelector('.target');
const squircleSVG = createSquircle({
    format: 'SVGNode',
    curvature: 0.1,
    fill: '#fadb5f',
    rotate: 0,
});

target.appendChild(squircleSVG);

// Create a base64 encoded squircle and set it as the src attribute for an image
const target = document.querySelector('img');
const squircleBase64 = createSquircle({
    format: 'base64',
    curvature: 0.1,
    fill: '#e46a3c',
    rotate: 0,
});

target.src = squircleBase64;

// Create a urlEncoded background-image squircle ready to use in CSS / attach to a custom property
const squircleBackgroundImage = createSquircle({
  format: "backgroundImage",
  curvature: 0.1,
  fill: "#908cfa",
  rotate: 0
});

document.documentElement.style.setProperty(
  "--svg-squircle",
  squircleBackgroundImage
);

...
```

**squircleBackground**

```javascript
import { squircleBackground } from 'squircleyjs';

// Add a quick squircle background image to a div
squircleBackground('.squircle-background-test', {
    fill: '#f78e8e',
});
```
