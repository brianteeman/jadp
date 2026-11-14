# Joomla Accessibility Display Preferences (JADP)

## 1. Purpose and Philosophy

Joomla Accessibility Display Preferences (JADP) is a Joomla core feature that provides **visitors** with a collection of optional controls to customise the visual presentation of a website.

The objective is to give visitors greater control over how they view and interact with website content, offering simple adjustments to display characteristics such as text size, spacing and contrast.

**JADP is not an accessibility overlay, an automated accessibility remediation tool or a replacement for accessible web development practices.**

**An essential distinction must be maintained:**

JADP provides user preference controls only. It does not make a website accessible, repair accessibility problems or guarantee compliance with WCAG or any other accessibility standard.

It cannot compensate for missing alternative text, incorrect HTML semantics, inaccessible forms, keyboard navigation problems or other underlying accessibility deficiencies.

This distinction should be communicated clearly within the toolbar itself and in the associated Joomla documentation.

The guiding principles are:

- **User choice:** All preferences are optional and controlled by the visitor.
- **Non-invasive:** Changes should affect visual presentation without modifying website content or its underlying semantics.
- **Reversible:** Visitors can reset their preferences at any time.
- **Persistent:** Visitor preferences should be retained across page navigation and subsequent visits to the same website.
- **Lightweight:** No external services, third-party dependencies or unnecessary JavaScript frameworks.
- **Joomla-native:** The implementation should follow Joomla coding standards, language conventions and asset management practices.

## 2. Feature Scope

The initial implementation will provide the following controls.

### 2.1 Text Size

Allow visitors to increase or decrease the size of website text.

The implementation should provide a sensible range of adjustments and prevent excessively large or small values.

### 2.2 Line Spacing

Allow visitors to increase the vertical spacing between lines of text to improve readability.

### 2.3 Letter Spacing

Allow visitors to increase the spacing between individual characters.

### 2.4 Word Spacing

Allow visitors to increase the spacing between words.

### 2.5 High Contrast

Provide an alternative high-contrast presentation to help visitors distinguish text and other interface elements.

The implementation must be carefully considered to avoid making content or controls unusable.

### 2.6 Grayscale

Allow visitors to remove colour from the website presentation.

### 2.7 Underline Links

Provide an option to underline links so that they are more easily distinguishable from surrounding text.

### 2.8 Reset Preferences

Provide a single control to restore all display preferences to their original settings.

Resetting preferences should also remove any saved preference values from browser storage.

### 2.9 Stretch Goals

The following feature is outside the scope of the initial release but may be considered for a future version.

**Reading Guide**

Provide a horizontal reading guide spanning the width of the viewport to help visitors maintain their position when reading website content.

The proposed behaviour is:

- Remain at a fixed vertical position within the viewport while the page scrolls beneath it.
- Be independently enabled and disabled.
- Be visually distinguishable while remaining sufficiently transparent to avoid obscuring content.
- Not interfere with clicking, selecting text or interacting with page elements.
- Allow its vertical position to be adjusted by the visitor.

### Explicit Exclusions

The following features are deliberately outside the scope of JADP, both for the initial release and as proposed future functionality:

- Text-to-speech and speech recognition.
- Custom mouse cursors.
- Dyslexia-specific fonts.
- Automatic image descriptions.
- AI-assisted accessibility features.
- Automatic DOM modifications or content rewriting.

JADP should remain a focused collection of display preference controls rather than growing into a general-purpose accessibility product.

## 3. User Interface and Interaction

JADP will be presented as an optional toolbar that site owners can enable and that visitors can open and close.

The toolbar should be visually unobtrusive when closed and should not permanently occupy valuable website screen space.

### 3.1 Toolbar Activation

A clearly identifiable button should allow visitors to open and close the toolbar.

The activation button must have an accessible name and be operable using a keyboard.

Its expanded or collapsed state should be communicated to assistive technologies.

### 3.2 Toolbar Layout

The toolbar should present the available controls in a clear and understandable layout.

Each control must have:

- A descriptive accessible name.
- A clear indication of its current state.
- Keyboard accessibility.
- An understandable method of enabling, disabling or adjusting the preference.

Icons may be used, but should not be the sole means of identifying a control.

### 3.3 Control Behaviour

Changes should take effect immediately without requiring a page reload.

Visitors should be able to enable several preferences simultaneously. Enabling one preference must not unexpectedly disable another.

Where a preference has multiple levels, such as text size or spacing, the current level should be apparent to the visitor.

### 3.4 Reset and Close Behaviour

Closing the toolbar must not reset the visitor's preferences.

The reset control must be clearly distinguishable from the close control.

Resetting should restore the original presentation of the website and clear the saved preferences from browser storage.

### 3.5 Accessibility Information

The plugin configuration in the Joomla administrator should display an explanation of the toolbar's purpose.

The following statement should be displayed to the site administrator:

"This toolbar provides user preference controls only. It does not make this website accessible or guarantee compliance with accessibility standards."

This makes clear that enabling the plugin does not make a website accessible or guarantee compliance with accessibility standards.

### 3.6 Preference Persistence

All visitor-selected preferences must persist across page navigation and subsequent visits to the same website.

Browser `localStorage` will be used to store the visitor's preferences.

The expected behaviour is:

- When a visitor changes a preference, the new value is immediately saved to browser storage.
- When the visitor navigates to another page on the same website, the saved preferences are automatically reapplied.
- When the visitor closes the browser and subsequently returns to the website, their preferences are restored.
- When the visitor resets their preferences, all stored preference values are removed and the default presentation is restored.

Preferences should be applied as early as reasonably possible during page loading to minimise any visible transition between the default presentation and the visitor's saved preferences.

Only display preference values should be stored. No personal information, tracking identifiers or browsing history should be collected.

The storage implementation should:

- Use a Joomla-specific storage key.
- Include a storage version to allow future changes to the preference structure.
- Handle unavailable, blocked or inaccessible local storage gracefully.
- Continue to allow preferences to operate for the current page even when persistence is unavailable.

Browser storage is scoped to an origin. Preferences will therefore not automatically transfer between different protocols, hostnames or ports.

The implementation should not depend on cookies, server-side user accounts or external storage services.


## 4. Agreed Implementation Decisions

These decisions supplement the original feature specification and take precedence where the earlier wording is less specific.

### 4.1 Toolbar Position and Behaviour

- The activation button is fixed to the bottom-right of the viewport.
- The initial implementation uses this physical position regardless of text direction.
- The toolbar is opened and closed by the activation button.
- Closing the toolbar does not reset visitor preferences.
- The toolbar must remain usable on narrow viewports and on devices with display cut-outs or safe areas.

### 4.2 Text Size Presets

Text size is presented as three mutually exclusive presets:

- Normal (default).
- Large.
- Extra large.

The selected preset must be apparent and exposed accessibly, for example by using native buttons with aria-pressed.

### 4.3 Reset Control

The toolbar must include a dedicated, visible Reset preferences button in its footer. It must be visually and functionally distinct from the close button.

Activating reset must:

1. Restore every preference to its default.
2. Remove or update all preference attributes on the document root.
3. Update the selected and enabled state of every toolbar control.
4. Remove the JADP entry from localStorage.
5. Restore the default presentation without reloading the page.
6. Leave the toolbar open.

### 4.4 Toolbar Isolation

The toolbar interface should be isolated from template CSS. The preferred approach is a Shadow DOM host for the toolbar UI, with its own styles. Website display preferences must still be applied to the website document, outside the shadow root.

This is an implementation direction to validate with Joomla, browser support and Content Security Policy testing, not a reason to introduce unnecessary dependencies.

### 4.5 Reference Implementation

The following project is a design and implementation reference only:

https://github.com/ifrederico/accessible-web-widget

Useful ideas to evaluate include its floating activation button, isolated toolbar UI, preference state management, responsive panel and dedicated footer reset control.

JADP must remain much smaller and adhere to its own scope and explicit exclusions. Do not import features such as profiles, text-to-speech, dyslexia-specific fonts, auditing, automated remediation, cookie fallbacks or remote font services.

The reference repository is MIT licensed. Any direct reuse of code must retain appropriate licence and attribution notices. Prefer an independent implementation based on JADP requirements.

## 5. Proposed Joomla Extension Architecture

The initial implementation is expected to be a Joomla system plugin, provisionally named plg_system_jadp.

The plugin should:

- Run on the frontend only.
- Support an administrator enable/disable option.
- Register assets using Joomla WebAssetManager.
- Supply the toolbar configuration to JavaScript using Joomla's script-options API. JavaScript creates the toolbar host element and appends it to the document.
- Avoid loading JADP assets when disabled.
- Keep visitor preference state entirely in the browser.

A provisional file structure is:

```text
plugins/system/jadp/
├── services/
│   └── provider.php
├── src/
│   └── Extension/
│       └── Jadp.php
├── language/
│   └── en-GB/
│       ├── plg_system_jadp.ini
│       └── plg_system_jadp.sys.ini
├── media/
│   ├── css/
│   │   ├── jadp.css
│   │   └── jadp-ui.css
│   ├── js/
│   │   ├── jadp-init.js
│   │   ├── jadp.js
│   │   ├── jadp-host.js
│   │   └── jadp-ui.js
├── jadp.xml
└── README.md
```

The exact event and asset-loading implementation must be checked against the target Joomla version before coding.

### 5.1 JavaScript Responsibilities

- jadp-init.js: read, validate and apply saved preferences as early as practical to reduce visual flicker.
- jadp.js: maintain preference state, apply changes, persist values and handle reset.
- jadp-host.js: read the configuration supplied through Joomla's script options, create the toolbar host element and append it to the document root.
- jadp-ui.js: find the host created by jadp-host.js and create and manage the toolbar UI and its interactions, preferably within a Shadow DOM.

All JavaScript must be written in **vanilla ES6**, using native browser APIs and language features. Do not use jQuery, Bootstrap JavaScript, third-party libraries or JavaScript frameworks. The code must remain compatible with the browsers supported by the target Joomla release.

### 5.2 Preference Storage

Use one Joomla-specific, versioned localStorage entry. The provisional key is:

joomla.jadp.preferences

The initial version 1 data shape is:

```json
{
  "version": 1,
  "preferences": {
    "textSize": "normal",
    "lineSpacing": "normal",
    "letterSpacing": "normal",
    "wordSpacing": "normal",
    "highContrast": false,
    "grayscale": false,
    "underlineLinks": false
  }
}
```

Values must be validated before use. Corrupt, unsupported or inaccessible storage must not break the page. In-memory changes must continue to work when persistence is unavailable. Do not fall back to cookies.

### 5.3 Document State and CSS

The preference engine should express active preferences through a consistent set of data attributes on the document root. CSS should provide the visual changes.

The toolbar host is created by `jadp-host.js`, rather than being inserted into the rendered HTML response by PHP. The plugin passes the required stylesheet URL and translated labels to JavaScript using Joomla's `Document::addScriptOptions()` API. The script reads these values through `Joomla.getOptions()`, creates the host element and appends it to `document.documentElement`, outside the page's `body` element.

Appending the host outside `body` is important because the grayscale preference applies a CSS `filter` to the body. A filtered element becomes a containing block for fixed-position descendants. If the toolbar host were inside the body, its fixed-position activation button and panel could consequently be positioned relative to the body rather than the viewport, causing the toolbar to move or appear in the wrong place. Keeping the host as a child of the document root, outside the filtered body, avoids that problem and also keeps the toolbar itself in normal colour.

The implementation must avoid indiscriminate rules that unintentionally resize layout dimensions, icons, controls or other non-text UI. In particular, changing the root font size must not be assumed to be a safe way to scale website text because it also changes dimensions expressed in rem.

High contrast must use a considered palette rather than simply inverting the entire page. The toolbar itself must remain legible and usable when page preferences are active. Grayscale must not make the toolbar grayscale.

The precise selectors and effects must be tested against Cassiopeia and representative third-party templates.


### 5.4 Toolbar Icons

Icons may be used within the toolbar, including on the activation, close and preference controls, but all icons must be implemented as inline SVG markup.

Do not use icon fonts, external SVG files, image-based icons, icon libraries or third-party icon packages. Icons must not be the sole means of identifying a control; provide an accessible name and retain clear text labels where appropriate. Inline SVGs used decoratively should be hidden from assistive technology, while any meaningful SVG must have an accessible text alternative.

## 6. Initial Implementation Milestone

Build a working Joomla system plugin in increments. The first milestone should include:

- A valid Joomla plugin skeleton and manifest.
- Frontend-only activation and asset registration.
- Fixed bottom-right activation button.
- Isolated, responsive toolbar UI.
- Three text-size presets.
- Versioned localStorage persistence, including graceful storage failure handling.
- Dedicated footer reset button with the reset behaviour specified above.
- Close behaviour that preserves preferences.
- An administrator-facing note explaining the purpose and limitations of the toolbar.
- Joomla language strings rather than hard-coded user-facing text.

Add the remaining spacing, contrast, grayscale and link underline preferences in subsequent increments.

## 7. Quality and Compatibility Checks

At minimum, test:

- Keyboard operation, visible focus, accessible names and state announcements.
- Opening, closing and focus restoration.
- Resetting all preferences without reloading.
- Multiple preferences active at the same time.
- Persistence across navigation and reloads.
- Corrupt, unsupported and unavailable localStorage.
- Two open tabs receiving storage updates.
- Responsive and touch layouts.
- RTL pages, including Arabic and Hebrew.
- Cassiopeia and representative third-party templates.
- High contrast and grayscale interactions with fixed elements, dialogs, dropdowns and forms.
- Content Security Policy compatibility and the chosen Shadow DOM styling approach.

The initial release must not claim that enabling JADP makes a website accessible or guarantees conformance with any accessibility standard.


## 8. Implementation Progress

The first implementation increment is present under `plugins/system/jadp/`.

It currently provides the Joomla system plugin manifest and service provider, frontend-only asset registration, the fixed bottom-right activation control, an isolated Shadow DOM toolbar, the three text-size presets, versioned localStorage persistence, cross-tab storage updates, reset behaviour and the required disclaimer.

The toolbar currently provides text size, line spacing, letter spacing, word spacing, high contrast, grayscale and link underlining controls. The administrator plugin configuration includes an explanatory note about the purpose and limitations of the toolbar.

The current text-size rule adjusts the body base font size and deliberately does not change the document root font size or rem-based layout dimensions.

The toolbar host is created in JavaScript from Joomla script options and appended to `document.documentElement`, outside `body`. This is intentional: the grayscale preference filters the body, and a CSS filter creates a containing block for fixed-position descendants. Keeping the toolbar outside that filtered element prevents its fixed-position controls from being repositioned relative to the body or being affected by the grayscale filter.

The plugin has not yet been installed and tested in a live Joomla site. Joomla installation, runtime behaviour, CSP, template compatibility and accessibility testing remain outstanding.

## 9. To Investigate

The following implementation details need further review and testing before the plugin is considered ready for release.

### 9.1 High Contrast

The current high-contrast rules apply a black background, white text and yellow links, while making the backgrounds of almost all page elements transparent and changing their borders to white.

This broad approach may remove meaningful visual distinctions or make some interface components harder to use. Test navigation menus, alerts, cards, tables, form controls and components that rely on background colours to communicate meaning. Consider whether a more selective palette and set of rules would be more appropriate.

### 9.2 Text Size Coverage

The current implementation increases the font size on the body element. This avoids changing the root font size and unintentionally resizing rem-based layout dimensions.

However, elements with explicitly defined font sizes, particularly those using rem units, may not scale. Test representative templates to establish which text is affected and whether the result is sufficiently consistent.

### 9.3 Spacing Coverage

The line, letter and word spacing rules currently target a defined list of elements, such as paragraphs, list items, table cells, labels and headings.

Text in other elements, including spans and generic containers, may not be affected. Investigate whether the selectors should cover more text without unintentionally changing icons, controls or other non-text elements.
