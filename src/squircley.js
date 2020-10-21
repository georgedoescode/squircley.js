const DEFAULTS = {
    format: 'SVGNode',
    curvature: 0.5,
    fill: '#4C3EF7',
    rotate: 0,
};

function createSquirclePath(w, h, curvature, rotate) {
    const pathNode = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    );
    const curveWidth = (w / 2) * (1 - curvature);
    const curveHeight = (h / 2) * (1 - curvature);

    const d = `
        M 0, ${h / 2}
        C 0, ${curveWidth} ${curveHeight}, 0 ${w / 2}, 0
        S ${w}, ${curveHeight} ${w}, ${h / 2}
            ${w - curveWidth}, ${h - 0} ${w / 2}, ${h}
            0, ${w - curveHeight} 0, ${h / 2}
    `;

    const transform = `
        rotate(
            ${rotate},
            ${w / 2},
            ${h / 2}
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

    const viewboxWidth = 100;
    const viewboxHeight = 100;

    const path = createSquirclePath(
        viewboxWidth,
        viewboxHeight,
        opts.curvature,
        opts.rotate
    );
    const squircleSVG = createSquircleSVG(viewboxWidth, viewboxHeight, path);

    squircleSVG.setAttribute('fill', opts.fill);

    if (opts.format === 'base64') {
        // return base64 enoded squircle for images etc
        return `data:image/svg+xml;base64,${btoa(squircleSVG.outerHTML)}`;
    } else if (opts.format === 'backgroundImage') {
        // return nicely formatted SVG that can be used in CSS as variable or bacgkround etc
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
