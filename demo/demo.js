import { createSquircle } from '../src/squircley.js';

// width and height can now be separate values, viewbox can also be defined to add padding etc

const squircleSVG = createSquircle({
    format: 'SVGNode',
    viewBox: [0, 0, 200, 200],
    width: 150,
    height: 150,
    curvature: 0.125,
    fill: '#4C3EF7',
    rotate: 0,
});

document.body.appendChild(squircleSVG);
