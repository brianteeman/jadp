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
        normal: host.dataset.normal,
        increased: host.dataset.increased,
        maximum: host.dataset.maximum,
        large: host.dataset.large,
        extraLarge: host.dataset.extraLarge,
        reset: host.dataset.reset,
        disclaimer: host.dataset.disclaimer,
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
        ['normal', labels.normal],
        ['large', labels.large],
        ['extra-large', labels.extraLarge],
    ];

    sizeGroup.appendChild(legend);

    const sizeButtons = new Map();

    sizeOptions.forEach(([value, label]) => {
        const button = create('button', {
            type: 'button',
            className: 'jadp-option',
            'data-text-size': value,
            'aria-pressed': 'false',
        }, label);

        button.addEventListener('click', () => window.JADP.set('textSize', value));
        sizeButtons.set(value, button);
        sizeGroup.appendChild(button);
    });

    content.appendChild(sizeGroup);

    const lineSpacingGroup = create('fieldset', { className: 'jadp-size-group' });
    const lineSpacingLegend = create('legend', {}, labels.lineSpacing);
    const lineSpacingOptions = [
        ['normal', labels.normal],
        ['increased', labels.increased],
        ['maximum', labels.maximum],
    ];

    lineSpacingGroup.appendChild(lineSpacingLegend);

    const lineSpacingButtons = new Map();

    lineSpacingOptions.forEach(([value, label]) => {
        const button = create('button', {
            type: 'button',
            className: 'jadp-option',
            'data-line-spacing': value,
            'aria-pressed': 'false',
        }, label);

        button.addEventListener('click', () => window.JADP.set('lineSpacing', value));
        lineSpacingButtons.set(value, button);
        lineSpacingGroup.appendChild(button);
    });

    content.appendChild(lineSpacingGroup);

    const letterSpacingGroup = create('fieldset', { className: 'jadp-size-group' });
    const letterSpacingLegend = create('legend', {}, labels.letterSpacing);
    const letterSpacingOptions = [
        ['normal', labels.normal],
        ['increased', labels.increased],
        ['maximum', labels.maximum],
    ];

    letterSpacingGroup.appendChild(letterSpacingLegend);

    const letterSpacingButtons = new Map();

    letterSpacingOptions.forEach(([value, label]) => {
        const button = create('button', {
            type: 'button',
            className: 'jadp-option',
            'data-letter-spacing': value,
            'aria-pressed': 'false',
        }, label);

        button.addEventListener('click', () => window.JADP.set('letterSpacing', value));
        letterSpacingButtons.set(value, button);
        letterSpacingGroup.appendChild(button);
    });

    content.appendChild(letterSpacingGroup);

    const wordSpacingGroup = create('fieldset', { className: 'jadp-size-group' });
    const wordSpacingLegend = create('legend', {}, labels.wordSpacing);
    const wordSpacingOptions = [
        ['normal', labels.normal],
        ['increased', labels.increased],
        ['maximum', labels.maximum],
    ];

    wordSpacingGroup.appendChild(wordSpacingLegend);

    const wordSpacingButtons = new Map();

    wordSpacingOptions.forEach(([value, label]) => {
        const button = create('button', {
            type: 'button',
            className: 'jadp-option',
            'data-word-spacing': value,
            'aria-pressed': 'false',
        }, label);

        button.addEventListener('click', () => window.JADP.set('wordSpacing', value));
        wordSpacingButtons.set(value, button);
        wordSpacingGroup.appendChild(button);
    });

    content.appendChild(wordSpacingGroup);

    const contrastGroup = create('fieldset', { className: 'jadp-size-group' });
    const contrastLegend = create('legend', {}, labels.contrast);
    const contrastOptions = [
        [false, labels.normalContrast],
        [true, labels.highContrast],
    ];
    const contrastButtons = new Map();

    contrastGroup.appendChild(contrastLegend);

    contrastOptions.forEach(([value, label]) => {
        const button = create('button', {
            type: 'button',
            className: 'jadp-option',
            'aria-pressed': 'false',
        }, label);

        button.addEventListener('click', () => window.JADP.set('highContrast', value));
        contrastButtons.set(value, button);
        contrastGroup.appendChild(button);
    });

    content.appendChild(contrastGroup);

    const grayscaleGroup = create('fieldset', { className: 'jadp-size-group' });
    const grayscaleLegend = create('legend', {}, labels.grayscale);
    const grayscaleOptions = [
        [false, labels.normalGrayscale],
        [true, labels.grayscaleOn],
    ];
    const grayscaleButtons = new Map();

    grayscaleGroup.appendChild(grayscaleLegend);

    grayscaleOptions.forEach(([value, label]) => {
        const button = create('button', {
            type: 'button',
            className: 'jadp-option',
            'aria-pressed': 'false',
        }, label);

        button.addEventListener('click', () => window.JADP.set('grayscale', value));
        grayscaleButtons.set(value, button);
        grayscaleGroup.appendChild(button);
    });

    content.appendChild(grayscaleGroup);

    const disclaimer = create('p', { className: 'jadp-disclaimer' }, labels.disclaimer);
    const footer = create('footer', { className: 'jadp-footer' });
    const reset = create('button', {
        type: 'button',
        className: 'jadp-reset',
    }, labels.reset);

    footer.appendChild(reset);
    panel.append(header, content, disclaimer, footer);
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
    });
}());
