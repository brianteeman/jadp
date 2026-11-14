/**
 * Create the JADP toolbar host from options supplied by Joomla.
 *
 * The host is created in JavaScript rather than injected into the rendered
 * HTML response by the system plugin.
 */
(function () {
    'use strict';

    if (!window.Joomla || typeof Joomla.getOptions !== 'function') {
        return;
    }

    const options = Joomla.getOptions('plg_system_jadp');

    if (!options || !options.css || !options.labels) {
        return;
    }

    const host = document.createElement('div');

    host.id = 'jadp-root';
    host.dataset.jadpCss = options.css;

    Object.entries(options.labels).forEach(([name, value]) => {
        const attribute = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

        host.dataset[attribute] = value;
    });

    document.documentElement.appendChild(host);
}());
