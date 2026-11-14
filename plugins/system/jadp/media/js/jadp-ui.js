/**
 * JADP toolbar interface.
 *
 * The toolbar is built inside a Shadow Root so template styles cannot
 * inadvertently change its appearance.
 */
(function () {
    'use strict';

    const host = document.getElementById('jadp-root');

    if (!host || !window.JADP) {
        return;
    }

    // Keep the toolbar outside the filtered body so its fixed positioning
    // remains relative to the viewport when grayscale is enabled.
    document.documentElement.appendChild(host);

    const shadow = host.attachShadow({ mode: 'open' });
    const stylesheet = document.createElement('link');

    stylesheet.rel = 'stylesheet';
    stylesheet.href = host.dataset.jadpCss;
    shadow.appendChild(stylesheet);

    const labels = {
        open: host.dataset.openLabel,
        close: host.dataset.closeLabel,
        title: host.dataset.title,
        textSize: host.dataset.textSize,
        lineSpacing: host.dataset.lineSpacing,
        letterSpacing: host.dataset.letterSpacing,
        wordSpacing: host.dataset.wordSpacing,
        contrast: host.dataset.contrast,
        normalContrast: host.dataset.normalContrast,
        highContrast: host.dataset.highContrast,
        grayscale: host.dataset.grayscale,
        normalGrayscale: host.dataset.normalGrayscale,
        grayscaleOn: host.dataset.grayscaleOn,
        underlineLinks: host.dataset.underlineLinks,
        normalLinkStyle: host.dataset.normalLinkStyle,
        underline: host.dataset.underline,
        normal: host.dataset.normal,
        increased: host.dataset.increased,
        maximum: host.dataset.maximum,
        large: host.dataset.large,
        extraLarge: host.dataset.extraLarge,
        reset: host.dataset.reset,
    };

    const create = (tag, attributes = {}, text = '') => {
        const element = document.createElement(tag);

        Object.entries(attributes).forEach(([name, value]) => {
            if (name === 'className') {
                element.className = value;
            } else {
                element.setAttribute(name, value);
            }
        });

        if (text) {
            element.textContent = text;
        }

        return element;
    };

    // Font Awesome Free Solid SVG path data, embedded directly in the toolbar.
    // Icons are licensed under CC BY 4.0: https://fontawesome.com/license/free
    const iconPaths = {
        textSmall: { width: 448, height: 512, path: 'M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416 32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-1.8 0 18-48 159.6 0 18 48-1.8 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-25.8 0L254 52.8zM279.8 304l-111.6 0L224 155.1 279.8 304z', scale: { scaleX: 0.58, scaleY: 0.58 }},
        textMedium: { width: 576, height: 512, path: 'M64 128l0-32 64 0 0 320-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-320 64 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-48c0-26.5-21.5-48-48-48L160 32 48 32C21.5 32 0 53.5 0 80l0 48c0 17.7 14.3 32 32 32s32-14.3 32-32zM502.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 192-32 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0 0-192 32 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64z', scale: { scaleX: 0.78, scaleY: 0.78 }},
        textLarge: { width: 448, height: 512, path: 'M0 64C0 46.3 14.3 32 32 32l48 0 48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 112 224 0 0-112-16 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l48 0 48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 144 0 176 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-48 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-144-224 0 0 144 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-48 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-176L48 96 32 96C14.3 96 0 81.7 0 64z', scale: { scaleX: 1, scaleY: 1 }},
        lineNormal: { width: 448, height: 512, path: 'M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z', scale: { scaleX: 1, scaleY: 0.58 }},
        lineIncreased: { width: 448, height: 512, path: 'M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z', scale: { scaleX: 1, scaleY: 0.78 }, transform: 'scaleY(1.15) translate(0 -34)' },
        lineMaximum: { width: 448, height: 512, path: 'M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z', scale: { scaleX: 1, scaleY: 1 }, transform: 'scaleY(1.3) translate(0 -59)' },
        letterNormal: { width: 448, height: 512, path: 'M64 128l0-32 128 0 0 128-16 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-16 0 0-128 128 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-48c0-26.5-21.5-48-48-48L224 32 48 32C21.5 32 0 53.5 0 80l0 48c0 17.7 14.3 32 32 32s32-14.3 32-32zM9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 192 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 32-192 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64z', scale: { scaleX: 0.58, scaleY: 1 }},
        letterIncreased: { width: 448, height: 512, path: 'M64 128l0-32 128 0 0 128-16 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-16 0 0-128 128 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-48c0-26.5-21.5-48-48-48L224 32 48 32C21.5 32 0 53.5 0 80l0 48c0 17.7 14.3 32 32 32s32-14.3 32-32zM9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 192 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 6.7-19.8 29.6l0 32-192 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64z', scale: { scaleX: 0.78, scaleY: 1 }, transform: 'scaleX(1.12) translate(-24 0)' },
        letterMaximum: { width: 448, height: 512, path: 'M64 128l0-32 128 0 0 128-16 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-16 0 0-128 128 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-48c0-26.5-21.5-48-48-48L224 32 48 32C21.5 32 0 53.5 0 80l0 48c0 17.7 14.3 32 32 32s32-14.3 32-32zM9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 192 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8-16.6-19.8 29.6l0 32-192 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64z', scale: { scaleX: 1, scaleY: 1 }, transform: 'scaleX(1.25) translate(-45 0)' },
        wordNormal: { width: 448, height: 512, path: 'M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z', scale: { scaleX: 0.58, scaleY: 1 }},
        wordIncreased: { width: 448, height: 512, path: 'M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32-14.3 32-32z', scale: { scaleX: 0.78, scaleY: 1 }, transform: 'scaleY(1.15) translate(0 -34)' },
        wordMaximum: { width: 448, height: 512, path: 'M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0-17.7-14.3-32-32-32L32 416C14.3 416 0 430.3 0 448s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32z', scale: { scaleX: 1, scaleY: 1 }, transform: 'scaleY(1.3) translate(0 -59)' },
        contrastNormal: { width: 512, height: 512, path: 'M448 256c0-106-86-192-192-192l0 384c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z' },
        contrastHigh: { width: 512, height: 512, path: 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z' },
        colour: { width: 512, height: 512, path: 'M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z' },
        grayscale: { width: 384, height: 512, path: 'M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0l1.8 0c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z' },
        link: { width: 640, height: 512, path: 'M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z' },
        underline: { width: 448, height: 512, path: 'M16 64c0-17.7 14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 128c0 53 43 96 96 96s96-43 96-96l0-128-16 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 128c0 88.4-71.6 160-160 160s-160-71.6-160-160L64 96 48 96C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32z' },
    };

    const createIcon = (name) => {
        const definition = iconPaths[name];
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', `0 0 ${definition.width} ${definition.height}`);
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        svg.classList.add('jadp-icon');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', definition.path);

        if (definition.scale || definition.transform) {
            const scaleX = definition.scale?.scaleX || 1;
            const scaleY = definition.scale?.scaleY || 1;
            const centreX = definition.width / 2;
            const centreY = definition.height / 2;
            const scaleTransform = `translate(${centreX} ${centreY}) scale(${scaleX} ${scaleY}) translate(${-centreX} ${-centreY})`;
            path.setAttribute('transform', definition.transform ? `${scaleTransform} ${definition.transform}` : scaleTransform);
        }

        svg.appendChild(path);

        return svg;
    };

    const createTriggerIcon = (open = false) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 512 512');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        svg.classList.add('jadp-trigger-icon');

        const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        shape.setAttribute('d', open
            ? 'M160 160L352 352M352 160L160 352'
            : 'M256 32A224 224 0 1 0 256 480A224 224 0 1 0 256 32ZM256 112A48 48 0 1 0 256 208A48 48 0 1 0 256 112ZM112 240H400M256 208V320M256 320L176 416M256 320L336 416');
        svg.appendChild(shape);

        return svg;
    };

    const trigger = create('button', {
        type: 'button',
        className: 'jadp-trigger',
        'aria-expanded': 'false',
        'aria-controls': 'jadp-panel',
        'aria-label': labels.open,
        title: labels.open,
    });
    trigger.appendChild(createTriggerIcon());

    const panel = create('section', {
        id: 'jadp-panel',
        className: 'jadp-panel',
        'aria-labelledby': 'jadp-heading',
        hidden: '',
    });

    const header = create('header', { className: 'jadp-header' });
    const heading = create('h2', { id: 'jadp-heading' }, labels.title);
    const close = create('button', {
        type: 'button',
        className: 'jadp-close',
        'aria-label': labels.close,
    }, '×');

    header.append(heading, close);

    const content = create('div', { className: 'jadp-content' });
    const sizeGroup = create('fieldset', { className: 'jadp-size-group' });
    const legend = create('legend', {}, labels.textSize);
    const sizeOptions = [
        ['normal', labels.normal, 'textSmall'],
        ['large', labels.large, 'textMedium'],
        ['extra-large', labels.extraLarge, 'textLarge'],
    ];

    sizeGroup.appendChild(legend);
    const sizeOptionsContainer = create('div', { className: 'jadp-options' });

    const sizeButtons = new Map();

    sizeOptions.forEach(([value, label, iconName]) => {
        const button = create('button', {
            type: 'button',
            className: 'jadp-option',
            'data-text-size': value,
            'aria-pressed': 'false',
            'aria-label': label,
            title: label,
        });
        button.appendChild(createIcon(iconName));

        button.addEventListener('click', () => window.JADP.set('textSize', value));
        sizeButtons.set(value, button);
        sizeOptionsContainer.appendChild(button);
    });

    sizeGroup.appendChild(sizeOptionsContainer);

    content.appendChild(sizeGroup);

    const lineSpacingGroup = create('fieldset', { className: 'jadp-size-group' });
    const lineSpacingLegend = create('legend', {}, labels.lineSpacing);
    const lineSpacingOptions = [
        ['normal', labels.normal, 'lineNormal'],
        ['increased', labels.increased, 'lineIncreased'],
        ['maximum', labels.maximum, 'lineMaximum'],
    ];

    lineSpacingGroup.appendChild(lineSpacingLegend);
    const lineSpacingOptionsContainer = create('div', { className: 'jadp-options' });

    const lineSpacingButtons = new Map();

    lineSpacingOptions.forEach(([value, label, iconName]) => {
        const button = create('button', {
            type: 'button',
            className: 'jadp-option',
            'data-line-spacing': value,
            'aria-pressed': 'false',
            'aria-label': label,
            title: label,
        });
        button.appendChild(createIcon(iconName));

        button.addEventListener('click', () => window.JADP.set('lineSpacing', value));
        lineSpacingButtons.set(value, button);
        lineSpacingOptionsContainer.appendChild(button);
    });

    lineSpacingGroup.appendChild(lineSpacingOptionsContainer);

    content.appendChild(lineSpacingGroup);

    const letterSpacingGroup = create('fieldset', { className: 'jadp-size-group' });
    const letterSpacingLegend = create('legend', {}, labels.letterSpacing);
    const letterSpacingOptions = [
        ['normal', labels.normal, 'letterNormal'],
        ['increased', labels.increased, 'letterIncreased'],
        ['maximum', labels.maximum, 'letterMaximum'],
    ];

    letterSpacingGroup.appendChild(letterSpacingLegend);
    const letterSpacingOptionsContainer = create('div', { className: 'jadp-options' });

    const letterSpacingButtons = new Map();

    letterSpacingOptions.forEach(([value, label, iconName]) => {
        const button = create('button', {
            type: 'button',
            className: 'jadp-option',
            'data-letter-spacing': value,
            'aria-pressed': 'false',
            'aria-label': label,
            title: label,
        });
        button.appendChild(createIcon(iconName));

        button.addEventListener('click', () => window.JADP.set('letterSpacing', value));
        letterSpacingButtons.set(value, button);
        letterSpacingOptionsContainer.appendChild(button);
    });

    letterSpacingGroup.appendChild(letterSpacingOptionsContainer);

    content.appendChild(letterSpacingGroup);

    const wordSpacingGroup = create('fieldset', { className: 'jadp-size-group' });
    const wordSpacingLegend = create('legend', {}, labels.wordSpacing);
    const wordSpacingOptions = [
        ['normal', labels.normal, 'wordNormal'],
        ['increased', labels.increased, 'wordIncreased'],
        ['maximum', labels.maximum, 'wordMaximum'],
    ];

    wordSpacingGroup.appendChild(wordSpacingLegend);
    const wordSpacingOptionsContainer = create('div', { className: 'jadp-options' });

    const wordSpacingButtons = new Map();

    wordSpacingOptions.forEach(([value, label, iconName]) => {
        const button = create('button', {
            type: 'button',
            className: 'jadp-option',
            'data-word-spacing': value,
            'aria-pressed': 'false',
            'aria-label': label,
            title: label,
        });
        button.appendChild(createIcon(iconName));

        button.addEventListener('click', () => window.JADP.set('wordSpacing', value));
        wordSpacingButtons.set(value, button);
        wordSpacingOptionsContainer.appendChild(button);
    });

    wordSpacingGroup.appendChild(wordSpacingOptionsContainer);

    content.appendChild(wordSpacingGroup);

    const contrastGroup = create('fieldset', { className: 'jadp-size-group' });
    const contrastLegend = create('legend', {}, labels.contrast);
    const contrastOptions = [
        [false, labels.normalContrast, 'contrastNormal'],
        [true, labels.highContrast, 'contrastHigh'],
    ];
    const contrastButtons = new Map();

    contrastGroup.appendChild(contrastLegend);
    const contrastOptionsContainer = create('div', { className: 'jadp-options' });

    contrastOptions.forEach(([value, label, iconName]) => {
        const button = create('button', {
            type: 'button',
            className: 'jadp-option',
            'aria-pressed': 'false',
            'aria-label': label,
            title: label,
        });
        button.appendChild(createIcon(iconName));

        button.addEventListener('click', () => window.JADP.set('highContrast', value));
        contrastButtons.set(value, button);
        contrastOptionsContainer.appendChild(button);
    });

    contrastGroup.appendChild(contrastOptionsContainer);

    content.appendChild(contrastGroup);

    const grayscaleGroup = create('fieldset', { className: 'jadp-size-group' });
    const grayscaleLegend = create('legend', {}, labels.grayscale);
    const grayscaleOptions = [
        [false, labels.normalGrayscale, 'colour'],
        [true, labels.grayscaleOn, 'grayscale'],
    ];
    const grayscaleButtons = new Map();

    grayscaleGroup.appendChild(grayscaleLegend);
    const grayscaleOptionsContainer = create('div', { className: 'jadp-options' });

    grayscaleOptions.forEach(([value, label, iconName]) => {
        const button = create('button', {
            type: 'button',
            className: 'jadp-option',
            'aria-pressed': 'false',
            'aria-label': label,
            title: label,
        });
        button.appendChild(createIcon(iconName));

        button.addEventListener('click', () => window.JADP.set('grayscale', value));
        grayscaleButtons.set(value, button);
        grayscaleOptionsContainer.appendChild(button);
    });

    grayscaleGroup.appendChild(grayscaleOptionsContainer);

    content.appendChild(grayscaleGroup);

    const underlineLinksGroup = create('fieldset', { className: 'jadp-size-group' });
    const underlineLinksLegend = create('legend', {}, labels.underlineLinks);
    const underlineLinksOptions = [
        [false, labels.normalLinkStyle, 'link'],
        [true, labels.underline, 'underline'],
    ];
    const underlineLinksButtons = new Map();

    underlineLinksGroup.appendChild(underlineLinksLegend);
    const underlineLinksOptionsContainer = create('div', { className: 'jadp-options' });

    underlineLinksOptions.forEach(([value, label, iconName]) => {
        const button = create('button', {
            type: 'button',
            className: 'jadp-option',
            'aria-pressed': 'false',
            'aria-label': label,
            title: label,
        });
        button.appendChild(createIcon(iconName));

        button.addEventListener('click', () => window.JADP.set('underlineLinks', value));
        underlineLinksButtons.set(value, button);
        underlineLinksOptionsContainer.appendChild(button);
    });

    underlineLinksGroup.appendChild(underlineLinksOptionsContainer);

    content.appendChild(underlineLinksGroup);

    const footer = create('footer', { className: 'jadp-footer' });
    const reset = create('button', {
        type: 'button',
        className: 'jadp-reset',
    }, labels.reset);

    footer.appendChild(reset);
    panel.append(header, content, footer);
    shadow.append(trigger, panel);

    let isOpen = false;

    const setOpen = (open) => {
        isOpen = open;
        panel.hidden = !open;
        trigger.setAttribute('aria-expanded', String(open));
        trigger.setAttribute('aria-label', open ? labels.close : labels.open);
        trigger.setAttribute('title', open ? labels.close : labels.open);
        trigger.replaceChildren(createTriggerIcon(open));

        if (open) {
            close.focus();
        } else {
            trigger.focus();
        }
    };

    trigger.addEventListener('click', () => setOpen(!isOpen));
    close.addEventListener('click', () => setOpen(false));
    reset.addEventListener('click', () => window.JADP.reset());

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isOpen) {
            event.preventDefault();
            setOpen(false);
        }
    });

    window.JADP.subscribe((preferences) => {
        sizeButtons.forEach((button, value) => {
            button.setAttribute('aria-pressed', String(preferences.textSize === value));
        });

        lineSpacingButtons.forEach((button, value) => {
            button.setAttribute('aria-pressed', String(preferences.lineSpacing === value));
        });

        letterSpacingButtons.forEach((button, value) => {
            button.setAttribute('aria-pressed', String(preferences.letterSpacing === value));
        });

        wordSpacingButtons.forEach((button, value) => {
            button.setAttribute('aria-pressed', String(preferences.wordSpacing === value));
        });

        contrastButtons.forEach((button, value) => {
            button.setAttribute('aria-pressed', String(preferences.highContrast === value));
        });

        grayscaleButtons.forEach((button, value) => {
            button.setAttribute('aria-pressed', String(preferences.grayscale === value));
        });

        underlineLinksButtons.forEach((button, value) => {
            button.setAttribute('aria-pressed', String(preferences.underlineLinks === value));
        });
    });
}());
