# Joomla Accessibility Display Preferences (JADP)

## 1. Purpose and Philosophy

Joomla Accessibility Display Preferences (JADP) is a Joomla system plugin that provides **visitors** with a collection of optional controls to customise the visual presentation of a website.

The objective is to give visitors greater control over how they view and interact with website content, offering simple adjustments to display characteristics such as text size, spacing and contrast.

**JADP is not an accessibility overlay, an automated accessibility remediation tool or a replacement for accessible web development practices.**

**An essential distinction must be maintained:**

JADP provides user preference controls only. It does not make a website accessible, repair accessibility problems or guarantee compliance with WCAG or any other accessibility standard.

It cannot compensate for missing alternative text, incorrect HTML semantics, inaccessible forms, keyboard navigation problems or other underlying accessibility deficiencies.

This distinction should be communicated clearly in the associated Joomla documentation and in the plugin configuration shown to site administrators. The current toolbar does not display this disclaimer.

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

Allow visitors to choose between three text-size presets: Normal, Large and Extra large. Normal is the default; there is no smaller-than-normal setting.

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

A skip-link-style **Open display preferences** link is also provided at the beginning of the page. It is visually hidden until it receives keyboard focus, making JADP discoverable to keyboard users without requiring them to locate the floating button. The link is part of the page's normal document content, so screen reader users can encounter it when navigating from the start of the page.

Activating the link opens the existing toolbar and moves focus into it. Closing the toolbar returns focus to the control that opened it, whether that was the skip link or the floating button. The floating button remains available for mouse and touch users.

While the toolbar is open, the current implementation keeps keyboard focus within the panel: Tab from the last focusable control moves to the first, and Shift+Tab from the first moves to the last. Pressing Escape closes the toolbar and returns focus to the original opener. This is the current implementation behaviour; it should be reviewed alongside the intended non-modal interaction model.

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

- The activation button position is configurable in the plugin settings: top-left, top-right, middle-left, middle-right, bottom-left or bottom-right. The default is bottom-left.
- The initial implementation uses this physical position regardless of text direction.
- The toolbar is opened and closed by the activation button.
- Closing the toolbar does not reset visitor preferences.
- The toolbar must remain usable on narrow viewports and on devices with display cut-outs or safe areas.

### 4.2 Text Size Presets

Text size is presented as three mutually exclusive presets:

- Normal (default).
- Large.
- Extra large.

The current CSS values for the spacing presets are:

| Preference | Increased | Maximum |
| --- | ---: | ---: |
| Line spacing (`line-height`) | `1.8` | `2` |
| Letter spacing | `.12em` | `.2em` |
| Word spacing | `.16em` | `.24em` |

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

The toolbar interface is isolated from template CSS using an open Shadow DOM attached to the `jadp-root` host. Its interface stylesheet is loaded inside the shadow root. Website display preferences are applied to the document outside the shadow root. This isolation should continue to be tested with the supported browsers and Content Security Policy configurations.

### 4.5 Reference Implementation

The following project is a design and implementation reference only:

https://github.com/ifrederico/accessible-web-widget

Useful ideas to evaluate include its floating activation button, isolated toolbar UI, preference state management, responsive panel and dedicated footer reset control.

JADP must remain much smaller and adhere to its own scope and explicit exclusions. Do not import features such as profiles, text-to-speech, dyslexia-specific fonts, auditing, automated remediation, cookie fallbacks or remote font services.

The reference repository is MIT licensed. Any direct reuse of code must retain appropriate licence and attribution notices. Prefer an independent implementation based on JADP requirements.

## 5. Proposed Joomla Extension Architecture

JADP is implemented as the Joomla system plugin `plg_system_jadp`.
The plugin should:

- Run on the site, administrator, or both clients, as selected in the plugin configuration. The default is Site (Frontend).
- Provide an **Enabled** selector with Site (Frontend), Administrator (Backend) and Both options; Site is the default.
- Register assets using Joomla WebAssetManager.
- Supply the toolbar configuration to JavaScript using Joomla's script-options API. JavaScript creates the toolbar host element and appends it to the document.
- Avoid loading JADP assets when disabled.
- On pages using Joomla's `tmpl=component` layout, load the preference CSS and early initialisation script but omit the toolbar UI. This allows saved preferences to apply to component content, including modal content that uses this layout, without rendering a duplicate toolbar.
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

The plugin currently subscribes to Joomla's `onBeforeCompileHead` event and registers its assets through the Web Asset Manager. The implementation should continue to be checked against the minimum supported Joomla version when core APIs change.

### 5.1 JavaScript Responsibilities

- jadp-init.js: read, validate and apply saved preferences as early as practical to reduce visual flicker.
- jadp.js: maintain preference state, apply changes, persist values and handle reset.
- jadp-host.js: read the configuration supplied through Joomla's script options, create the toolbar host element and append it to the document root.
- jadp-ui.js: find the host created by jadp-host.js and create and manage the toolbar UI and its interactions inside an open Shadow DOM.

All JavaScript must be written in **vanilla JavaScript**, using modern ECMAScript features and native browser APIs. Do not use jQuery, Bootstrap JavaScript, third-party libraries or JavaScript frameworks. The code uses features newer than ES2015 (including `Object.entries()`, object spread and optional chaining), so it should not be described as strictly ES6. Compatibility must be assessed against the browsers supported by the target Joomla release.

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

The toolbar host is appended outside `body`, as a child of `document.documentElement`. This is important to the positioning behaviour of fixed-position controls when CSS filters are applied. The current grayscale rule applies `filter: grayscale(1)` to the `html` element rather than to `body`. This avoids the fixed-position containing-block problem observed when the filter was applied to `body`, and also converts the page background to grayscale in cases where the body background is painted on the document canvas. Because the filter is applied to the root element, the toolbar is also displayed in grayscale; it is not kept in normal colour.

The implementation must avoid indiscriminate rules that unintentionally resize layout dimensions, icons, controls or other non-text UI. In particular, changing the root font size must not be assumed to be a safe way to scale website text because it also changes dimensions expressed in rem.

High contrast currently uses a black body background, white text, yellow links and focus indicators, and broad rules that make most page-element backgrounds transparent and borders white. This approach remains under review because it can remove meaningful visual distinctions. The toolbar is isolated in a Shadow DOM and is not directly restyled by the page's high-contrast selectors. Grayscale is applied to the document root, so the toolbar is also shown in grayscale.

The precise selectors and effects must be tested against Cassiopeia and representative third-party templates.


### 5.4 Toolbar Icons

The icons used by the controls inside the toolbar panel are implemented as inline SVG. These are decorative and hidden from assistive technology; each control has its own accessible name and title.

The floating trigger button is separately configurable in the plugin settings. It can use the built-in inline SVG, a CSS font icon supplied by the site, or a PNG image selected from the site's `images` folder. The trigger icon is decorative; the button itself retains its accessible name and keyboard operation regardless of the selected icon.

## 6. Initial Implementation Milestone

The original implementation milestone has been delivered. The current plugin includes:

- A Joomla system plugin manifest and service provider.
- Client-specific activation for Site, Administrator or Both, with Site as the default.
- Six configurable trigger-button positions, with Bottom Left as the default.
- An isolated, responsive Shadow DOM toolbar.
- Three text-size presets and the line-spacing, letter-spacing, word-spacing, high-contrast, grayscale and link-underlining preferences.
- Versioned localStorage persistence, graceful storage-failure handling and cross-tab updates.
- A dedicated footer reset button and close behaviour that preserves preferences.
- An administrator-facing note explaining the purpose and limitations of the toolbar.
- Joomla language strings for user-facing text.

The remaining work is validation, compatibility testing and resolution of the items listed in Section 10, rather than implementation of the original preference controls.

## 7. Quality and Compatibility Checks

At minimum, test:

- Keyboard operation, visible focus, accessible names and state announcements.
- Discovery and activation of the JADP skip link using keyboard and screen reader navigation.
- Opening, closing and focus restoration, including returning focus to the original opener.
- Tab and Shift+Tab behaviour while the toolbar is open, including the current focus-trapping behaviour.
- Escape handling while the toolbar is open.
- Resetting all preferences without reloading.
- Multiple preferences active at the same time.
- Persistence across navigation and reloads.
- Corrupt, unsupported and unavailable localStorage.
- Two open tabs receiving storage updates.
- Responsive and touch layouts.
- RTL pages, including Arabic and Hebrew.
- Cassiopeia and representative third-party templates.
- High contrast and grayscale interactions with fixed elements, modal dialogs, dropdowns and forms.
- Component-template pages, including modal content loaded using Joomla's `tmpl=component` layout.
- Content Security Policy compatibility and the chosen Shadow DOM styling approach.

The initial release must not claim that enabling JADP makes a website accessible or guarantees conformance with any accessibility standard.


## 8. Implementation Progress

The implementation is present under `plugins/system/jadp/`.

It provides the Joomla system plugin manifest and service provider, asset registration through Joomla's Web Asset Manager, a configurable activation control with six available positions and bottom-left as the default, an isolated Shadow DOM toolbar, three text-size presets, versioned localStorage persistence, cross-tab storage updates and reset behaviour. The plugin can be enabled for the Site, Administrator or Both clients; Site is the default.

The toolbar currently provides text size, line spacing, letter spacing, word spacing, high contrast, grayscale and link underlining controls. The administrator plugin configuration includes an explanatory note about the purpose and limitations of the toolbar, the clients where it is enabled, configurable trigger icon options and the trigger button position.

The current text-size rule adjusts the body base font size and deliberately does not change the document root font size or rem-based layout dimensions.

The toolbar host is created in JavaScript from Joomla script options and appended to `document.documentElement`, outside `body`. The grayscale preference applies `filter: grayscale(1)` to `html`, rather than `body`. This resolves the fixed-position behaviour associated with filtering the body and also applies grayscale to the document canvas and page background. The toolbar is affected by this root-level filter and therefore appears in grayscale when that preference is enabled.

On requests using Joomla's `tmpl=component` layout, the plugin still loads the page-preference stylesheet and early initialisation script so saved preferences continue to affect the component content. It does not create a second JADP toolbar on those pages. This also covers modal content when the Joomla modal loads that content using `tmpl=component`; it should not be read as a blanket rule for every possible modal implementation.

A separate, translated skip-link-style entry point is inserted as the first element in the page body. Its styling is registered as a normal Joomla Web Asset so it can be visible on keyboard focus without being affected by the toolbar's Shadow DOM. The link opens the toolbar and focus is restored to the original opener when the toolbar closes.

The plugin has been installed and basic runtime behaviour has been tested on Joomla 6.2 with the Cassiopeia template. The asset-loading implementation has also been corrected to use Joomla's `onBeforeCompileHead` event. Broader testing remains outstanding, including other Joomla versions, administrator use, third-party templates, Content Security Policy configurations, browser compatibility and assistive-technology behaviour.

## 9. Customisation

JADP separates the styles for the toolbar itself from the styles that apply visitor preferences to the website.

### 9.1 Toolbar Appearance

All CSS relating to the toolbar interface is contained in:

`media/css/jadp-ui.css`

This stylesheet controls the activation button, toolbar panel, headings, controls, icons and responsive layout. Site owners who want to change the appearance of the JADP toolbar should customise this stylesheet.

**Do not edit `jadp.css`.** That file contains the CSS used to apply the visitor's display preferences to the website, including text size, spacing, contrast, grayscale and link underlining. Changing it can alter the behaviour of the preferences rather than simply changing the appearance of the toolbar.

The toolbar is created inside a Shadow DOM. Consequently, CSS rules in the site template's normal stylesheet or `user.css` cannot directly style the toolbar contents. The JADP toolbar stylesheet itself must be replaced or customised. The trigger button's optional CSS icon stylesheet is also loaded inside the Shadow DOM when that trigger-icon option is selected.

The toolbar stylesheet is registered as the Web Asset `plg.system.jadp.ui`. JADP obtains its resolved URI from the Web Asset Manager and passes that URI to the toolbar, which links the stylesheet from inside its Shadow DOM. Joomla's template-aware media lookup locates a replacement file by its expected path and filename. You do not need to add an asset entry to the template's `joomla.asset.json`.

For an inheritable site template, place the replacement file at:

```text
media/templates/site/YOUR_TEMPLATE/css/plg_system_jadp/jadp-ui.css
```

For an inheritable administrator template, use:

```text
media/templates/administrator/YOUR_TEMPLATE/css/plg_system_jadp/jadp-ui.css
```

For a legacy template that is non-inheritable and has no parent, use:

```text
templates/YOUR_TEMPLATE/css/plg_system_jadp/jadp-ui.css
```

Replace `YOUR_TEMPLATE` with the relevant template directory. For an inheritable template with a parent, Joomla checks the active template first and then its parent. If no replacement is found, Joomla uses the stylesheet supplied by the JADP plugin. The replacement stylesheet is loaded inside the toolbar's Shadow DOM rather than in the page's light DOM. Keep it in sync with changes to the JADP toolbar styles when updating the plugin.

### 9.2 Website Preference Effects

The website preference rules are contained in `media/css/jadp.css` and are scoped to screen presentation using an outer `@media screen` block. There are no separate print-restoration rules; the preference rules simply do not apply when the page is printed.

The current values are:

| Preference | Setting | CSS value |
| --- | --- | --- |
| Text size | Large | `1.125em` on `body` |
| Text size | Extra large | `1.25em` on `body` |
| Line spacing | Increased | `1.8` |
| Line spacing | Maximum | `2` |
| Letter spacing | Increased | `.12em` |
| Letter spacing | Maximum | `.2em` |
| Word spacing | Increased | `.16em` |
| Word spacing | Maximum | `.24em` |

The spacing rules apply to selected text elements rather than every element on the page. Text in other elements may not be affected. The text-size preference changes the body's base font size and does not change the root font size, so content with explicitly assigned font sizes may not scale in the same way.

High contrast currently applies white text, a black body background, yellow links and focus indicators, and broad background and border overrides. This remains an area for further review. Grayscale applies a filter to the document root, which also affects the toolbar. Underline links applies underlining to links in the page body.

### 9.3 Keyboard and Screen Reader Discovery

JADP adds an **Open display preferences** link at the beginning of the page body. It is visually moved off-screen until it receives keyboard focus, at which point it becomes visible at the top of the viewport, in the same way as a conventional skip link.

The link is included in the normal document flow and is not hidden with `display: none` or `visibility: hidden`. This allows assistive technologies to encounter it when reading or navigating from the start of the page. It has its own translated language string.

Activating the link opens the JADP panel and moves focus into the panel. When the panel is closed, focus returns to the element that opened it. This works for both the skip link and the floating activation button.

The skip link is styled separately in `media/css/jadp-skip.css` and registered through Joomla Web Asset Manager. It is deliberately outside the toolbar's Shadow DOM because it is a page-level entry point rather than part of the toolbar interface.

### 9.4 Trigger Button Position

The trigger button position can be selected in the plugin configuration. The available positions are Top Left, Top Right, Middle Left, Middle Right, Bottom Left and Bottom Right. Bottom Left is the default. The toolbar panel is positioned alongside the trigger button.

### 9.5 Changing the Universal Access Icon

The universal access icon can be changed in the plugin configuration without overriding JADP's JavaScript. Select the desired option under **Universal Access Icon**.

- **Default JADP Icon** uses the built-in inline SVG.
- **CSS Font Icon** accepts one or more CSS classes, for example `fa-solid fa-universal-access`. The Icon Stylesheet URL is required and must point to the stylesheet that defines those classes and loads the required font. Enter either an HTTPS URL or a site-relative path. External stylesheet URLs must use HTTPS. Protocol-relative URLs beginning with `//` are not supported; enter the URL with an explicit `https://` scheme instead. The stylesheet is loaded inside the toolbar's Shadow DOM, so the site's ordinary template stylesheets are not automatically available there. Font files referenced by the stylesheet should use URLs that resolve correctly from that stylesheet.
- **PNG Image** lets you select a PNG from the site's `images` folder. The image is displayed within the floating button and scaled to fit.

The custom icon is decorative; the activation button continues to provide its accessible name and changes that name when the toolbar opens or closes. The same custom icon is used in both states.

For a CSS font icon, ensure that the stylesheet is publicly accessible and that its font files can be loaded by the browser. This can be a stylesheet from the site's own template or a locally hosted icon library. No external icon library is bundled with JADP.

For the PNG option, use a square image around 64 × 64 pixels, preferably with a transparent background. The image is scaled to fit the toolbar button. JADP only accepts a PNG file for this setting.

## 10. To Investigate

The following items remain under investigation. See the linked GitHub issues for the details and acceptance checks.

- [Review and refine high-contrast background handling (#23)](https://github.com/brianteeman/jadp/issues/23)
- [Consider visible text labels for toolbar controls (#24)](https://github.com/brianteeman/jadp/issues/24)
- [Review semantics of mutually exclusive preference controls (#25)](https://github.com/brianteeman/jadp/issues/25)
- [Review text-size preference coverage (#26)](https://github.com/brianteeman/jadp/issues/26)

### 10.5 Spacing Coverage

The line, letter and word spacing rules currently target a defined list of elements. Text in other elements, including spans and generic containers, may not be affected. Investigate whether the selectors should cover more text without unintentionally changing icons, controls or other non-text elements.
