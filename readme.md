<img src="https://raw.githubusercontent.com/georgedoescode/squircley.js/main/og-image.png">

# squircley.js

`squircley.js` is the core squirclular magic ✨ from https://squircley.app wrapped up into a simple, 0 dependency JavaScript library.

`squircley.js` can generate SVG's, add squircle backgrounds to DOM elements, and even generate base64 encoded squirculated strings ready to use with `img` tags.

You can currently find squircley.js on NPM https://www.npmjs.com/package/squircleyjs 📦

**Note** Right now squircley.js is just an ES module. I'll add UMD support etc if folks
need it in the future, I just didn't want to get lost in rollup land too early 🙏

## Usage

### createSquircle

**Options**

| Name        | Type     | Default            | Description                                                                |
| ----------- | -------- | ------------------ | -------------------------------------------------------------------------- |
| `format`    | `String` | `SVGNode`          | The format of the squircle. Accepts `SVGNode`, `backgroundImage`, `base64` |
| `viewBox`   | `Array`  | `[0, 0, 200, 200]` | SVG viewbox (x, y, w, h)                                                   |
| `width`     | `Number` | `200`              | Width of the squircle                                                      |
| `height`    | `Number` | `200`              | Height of the squircle                                                     |
| `curvature` | `Number` | `0.5`              | Value `0 - 1` that determines how round the squircle is                    |
| `fill`      | `String` | `0.5`              | Fill color of the squircle                                                 |
| `rotate`    | `Number` | `0`                | Rotation of the squircle                                                   |

**Examples**

```javascript
import { createSquircle } from 'squircleyjs';

// Create an SVG squircle and append it to the DOM
const target = document.querySelector('.target');
const squircleSVG = createSquircle({
    format: 'SVGNode',
    viewBox: [0, 0, 200, 200],
    width: 150,
    height: 150,
    curvature: 0.1,
    fill: '#fadb5f',
    rotate: 0,
});

target.appendChild(squircleSVG);

// Create a base64 encoded squircle and set it as the src attribute for an image
const target = document.querySelector('img');
const squircleBase64 = createSquircle({
    format: 'base64',
    viewBox: [0, 0, 200, 200],
    width: 150,
    height: 150,
    curvature: 0.1,
    fill: '#e46a3c',
    rotate: 0,
});

target.src = squircleBase64;

// Create a urlEncoded background-image squircle ready to use in CSS / attach to a custom property
const squircleBackgroundImage = createSquircle({
  format: "backgroundImage",
  viewBox: [0, 0, 200, 200],
  width: 150,
  height: 150,
  curvature: 0.1,
  fill: "#908cfa",
  rotate: 0
});

// store in custom property to use throughout app?
document.documentElement.style.setProperty(
  "--svg-squircle",
  squircleBackgroundImage
);

// directly apply as CSS
document.body.style.backgroundImage = squircleBackgroundImage;

...
```

### squircleBackground

**Options**

`squircleBackground` is simple a wrapper around `createSquircle`. The options are identical.

**Examples**

```javascript
import { squircleBackground } from 'squircleyjs';

// Add a quick squircle background image to a div
squircleBackground('.squircle-background-test', {
    fill: '#f78e8e',
});
```
