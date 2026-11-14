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
        normal: host.dataset.normal,
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
    });
}());
