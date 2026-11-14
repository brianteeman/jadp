/**
 * JADP early preference initialisation.
 *
 * This file is intentionally small and loaded synchronously in the document head
 * to apply saved preferences before the page is displayed.
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'joomla.jadp.preferences';
    const DEFAULTS = {
        textSize: 'normal',
        lineSpacing: 'normal',
        letterSpacing: 'normal',
        wordSpacing: 'normal',
        highContrast: false,
        grayscale: false,
        underlineLinks: false,
    };

    const isValidPreferences = (value) => {
        if (!value || typeof value !== 'object') {
            return false;
        }

        const preferences = value.preferences;

        return value.version === 1
            && preferences
            && typeof preferences === 'object'
            && ['normal', 'large', 'extra-large'].includes(preferences.textSize)
            && ['normal', 'increased', 'maximum'].includes(preferences.lineSpacing)
            && ['normal', 'increased', 'maximum'].includes(preferences.letterSpacing)
            && ['normal', 'increased', 'maximum'].includes(preferences.wordSpacing)
            && typeof preferences.highContrast === 'boolean'
            && typeof preferences.grayscale === 'boolean'
            && typeof preferences.underlineLinks === 'boolean';
    };

    let saved = null;

    try {
        saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    } catch (error) {
        // Storage may be unavailable or contain invalid JSON. Defaults are safe.
    }

    const preferences = isValidPreferences(saved) ? saved.preferences : DEFAULTS;
    const root = document.documentElement;

    root.dataset.jadpTextSize = preferences.textSize;

    if (preferences.lineSpacing !== 'normal') {
        root.dataset.jadpLineSpacing = preferences.lineSpacing;
    }

    if (preferences.letterSpacing !== 'normal') {
        root.dataset.jadpLetterSpacing = preferences.letterSpacing;
    }

    if (preferences.wordSpacing !== 'normal') {
        root.dataset.jadpWordSpacing = preferences.wordSpacing;
    }

    if (preferences.highContrast) {
        root.dataset.jadpHighContrast = 'true';
    }

    if (preferences.grayscale) {
        root.dataset.jadpGrayscale = 'true';
    }

    if (preferences.underlineLinks) {
        root.dataset.jadpUnderlineLinks = 'true';
    }
}());
