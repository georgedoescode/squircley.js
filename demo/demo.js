import { createSquircle, squircleBackground } from '../src/squircley.js';

// squircleBackground('.test', {
//     fill: 'orange',
//     curvature: 0.2,
//     rotate: 70,
// });

const colors = ['#f78e8e', '#FADB5F', '#908CFB'];
for (let i = 0; i < 400; i++) {
    const squircle = createSquircle({
        rotate: 0,
        curvature: Math.random(),
        fill: colors[~~(Math.random() * colors.length)],
    });

    document.querySelector('.canvas').appendChild(squircle);
}
