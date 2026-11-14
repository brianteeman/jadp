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

    const iconPaths = {
        textSmall: ['M96 96h320v48H96z M208 144h96v272h-96z'],
        textMedium: ['M48 48h416v48H48z M184 96h144v320H184z'],
        textLarge: ['M16 16h480v48H16z M160 64h192v352H160z'],
        lineNormal: ['M64 96h384v40H64z M64 224h384v40H64z M64 352h384v40H64z'],
        lineIncreased: ['M64 48h384v40H64z M64 224h384v40H64z M64 400h384v40H64z'],
        lineMaximum: ['M64 16h384v40H64z M64 224h384v40H64z M64 432h384v40H64z'],
        letterNormal: ['M96 64h48v384H96z M232 64h48v384h-48z M368 64h48v384h-48z'],
        letterIncreased: ['M48 64h48v384H48z M232 64h48v384h-48z M416 64h48v384h-48z'],
        letterMaximum: ['M16 64h48v384H16z M232 64h48v384h-48z M448 64h48v384h-48z'],
        wordNormal: ['M48 112h144v80H48z M240 112h224v80H240z M48 320h144v80H48z M240 320h224v80H240z'],
        wordIncreased: ['M32 112h128v80H32z M288 112h192v80H288z M32 320h128v80H32z M288 320h192v80H288z'],
        wordMaximum: ['M16 112h112v80H16z M336 112h160v80H336z M16 320h112v80H16z M336 320h160v80H336z'],
        contrastNormal: ['M256 32a224 224 0 1 0 0 448a224 224 0 1 0 0-448z M256 96a160 160 0 1 1 0 320a160 160 0 1 1 0-320z'],
        contrastHigh: ['M256 32a224 224 0 1 0 0 448a224 224 0 1 0 0-448z'],
        colour: ['M256 32a224 224 0 1 0 0 448a224 224 0 1 0 0-448z M256 112a144 144 0 1 1 0 288a144 144 0 1 1 0-288z'],
        grayscale: ['M256 32a224 224 0 1 0 0 448a224 224 0 1 0 0-448z M256 112a144 144 0 1 0 0 288a144 144 0 1 0 0-288z'],
        link: ['M196 160h-52a112 112 0 0 0 0 224h80v-48h-80a64 64 0 0 1 0-128h52z M368 128h-80v48h80a64 64 0 0 1 0 128h-52v48h52a112 112 0 0 0 0-224z M160 232h192v48H160z'],
        underline: ['M96 48h48v176a112 112 0 0 0 224 0V48h48v176a160 160 0 0 1-320 0z M64 416h384v48H64z'],
    };

    const createIcon = (name) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 512 512');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        svg.classList.add('jadp-icon');

        iconPaths[name].forEach((pathData) => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', pathData);
            svg.appendChild(path);
        });

        return svg;
    };

    const trigger = create('button', {
        type: 'button',
        className: 'jadp-trigger',
        'aria-expanded': 'false',
        'aria-controls': 'jadp-panel',
        'aria-label': labels.open,
    }, labels.open);

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
        sizeGroup.appendChild(button);
    });

    content.appendChild(sizeGroup);

    const lineSpacingGroup = create('fieldset', { className: 'jadp-size-group' });
    const lineSpacingLegend = create('legend', {}, labels.lineSpacing);
    const lineSpacingOptions = [
        ['normal', labels.normal, 'lineNormal'],
        ['increased', labels.increased, 'lineIncreased'],
        ['maximum', labels.maximum, 'lineMaximum'],
    ];

    lineSpacingGroup.appendChild(lineSpacingLegend);

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
        lineSpacingGroup.appendChild(button);
    });

    content.appendChild(lineSpacingGroup);

    const letterSpacingGroup = create('fieldset', { className: 'jadp-size-group' });
    const letterSpacingLegend = create('legend', {}, labels.letterSpacing);
    const letterSpacingOptions = [
        ['normal', labels.normal, 'letterNormal'],
        ['increased', labels.increased, 'letterIncreased'],
        ['maximum', labels.maximum, 'letterMaximum'],
    ];

    letterSpacingGroup.appendChild(letterSpacingLegend);

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
        letterSpacingGroup.appendChild(button);
    });

    content.appendChild(letterSpacingGroup);

    const wordSpacingGroup = create('fieldset', { className: 'jadp-size-group' });
    const wordSpacingLegend = create('legend', {}, labels.wordSpacing);
    const wordSpacingOptions = [
        ['normal', labels.normal, 'wordNormal'],
        ['increased', labels.increased, 'wordIncreased'],
        ['maximum', labels.maximum, 'wordMaximum'],
    ];

    wordSpacingGroup.appendChild(wordSpacingLegend);

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
        wordSpacingGroup.appendChild(button);
    });

    content.appendChild(wordSpacingGroup);

    const contrastGroup = create('fieldset', { className: 'jadp-size-group' });
    const contrastLegend = create('legend', {}, labels.contrast);
    const contrastOptions = [
        [false, labels.normalContrast, 'contrastNormal'],
        [true, labels.highContrast, 'contrastHigh'],
    ];
    const contrastButtons = new Map();

    contrastGroup.appendChild(contrastLegend);

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
        contrastGroup.appendChild(button);
    });

    content.appendChild(contrastGroup);

    const grayscaleGroup = create('fieldset', { className: 'jadp-size-group' });
    const grayscaleLegend = create('legend', {}, labels.grayscale);
    const grayscaleOptions = [
        [false, labels.normalGrayscale, 'colour'],
        [true, labels.grayscaleOn, 'grayscale'],
    ];
    const grayscaleButtons = new Map();

    grayscaleGroup.appendChild(grayscaleLegend);

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
        grayscaleGroup.appendChild(button);
    });

    content.appendChild(grayscaleGroup);

    const underlineLinksGroup = create('fieldset', { className: 'jadp-size-group' });
    const underlineLinksLegend = create('legend', {}, labels.underlineLinks);
    const underlineLinksOptions = [
        [false, labels.normalLinkStyle, 'link'],
        [true, labels.underline, 'underline'],
    ];
    const underlineLinksButtons = new Map();

    underlineLinksGroup.appendChild(underlineLinksLegend);

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
        underlineLinksGroup.appendChild(button);
    });

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
        trigger.textContent = open ? labels.close : labels.open;

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
