const DEFAULTS = {
    format: 'SVGNode',
    viewBox: [0, 0, 200, 200],
    width: 200,
    height: 200,
    curvature: 0.5,
    fill: '#4C3EF7',
    rotate: 0,
};

/* 
    Thanks to Olga Nikolskaya https://medium.com/@nikolskayaolia/an-easy-way-to-implement-smooth-shapes-such-as-superellipse-and-squircle-into-a-user-interface-a5ba4e1139ed 
    Code updated based on the above article to allow for rectangular shapes + dynamic curvature
*/
function createSquirclePath(w, h, vW, vH, curvature, rotate) {
    const pathNode = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    );
    const width = w;
    const height = h;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const arc = Math.min(halfWidth, halfHeight) * (1 - curvature);

    const d = `
        M 0 ${halfHeight}
        C 0 ${arc}, ${arc} 0, ${halfWidth} 0
        S ${width} ${arc}, ${width} ${halfHeight}, ${width - arc} ${height}
          ${halfWidth} ${height}, 0 ${height - arc}, 0 ${halfHeight}
    `;

    const transform = `
        rotate(
            ${rotate},
            ${w / 2},
            ${h / 2}
        )
        translate(
            ${(vW - w) / 2},
            ${(vH - h) / 2}
        )
    `;

    pathNode.setAttribute('d', d);
    pathNode.setAttribute('transform', transform);

    return pathNode;
}

function createSquircleSVG(w, h, pathNode) {
    const SVGNode = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    );

    SVGNode.setAttribute('viewBox', `0 0 ${w} ${h}`);
    SVGNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    SVGNode.setAttribute('version', '1.1');

    SVGNode.appendChild(pathNode);

    return SVGNode;
}

function createSquircle(opts) {
    opts = Object.assign(DEFAULTS, opts);

    const path = createSquirclePath(
        opts.width,
        opts.height,
        opts.viewBox[2],
        opts.viewBox[3],
        opts.curvature,
        opts.rotate
    );

    const squircleSVG = createSquircleSVG(
        opts.viewBox[2],
        opts.viewBox[3],
        path
    );

    squircleSVG.setAttribute('fill', opts.fill);

    if (opts.format === 'base64') {
        // return base64 encoded squircle for images etc
        return `data:image/svg+xml;base64,${btoa(squircleSVG.outerHTML)}`;
    } else if (opts.format === 'backgroundImage') {
        // return nicely formatted SVG that can be used in CSS as variable or background etc
        const html = squircleSVG.outerHTML.replace(/"/g, `'`);
        return `url("data:image/svg+xml;utf8,${html.replace(
            /[\r\n%#()<>?[\\\]^`{|}]/g,
            encodeURIComponent
        )}")`.replace(/\s+/g, ' ');
    } else {
        // return SVG node
        return squircleSVG;
    }
}

function squircleBackground(target, opts) {
    const squircleBackgroundUrl = createSquircle({
        format: 'backgroundImage',
        ...opts,
    });

    if (typeof target === 'string') {
        target = document.querySelector(target);
    }

    target.style.backgroundRepeat = 'no-repeat';
    target.style.backgroundPosition = 'center center';
    target.style.backgroundImage = squircleBackgroundUrl;
}

export { createSquircle, squircleBackground };
