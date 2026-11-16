# Joomla Accessibility Display Preferences (JADP)

Joomla Accessibility Display Preferences (JADP) adds a small display-preferences toolbar to a Joomla website. It lets visitors adjust how page content is presented to suit their reading preferences.

**JADP provides optional display adjustments. It is not an accessibility overlay, does not repair accessibility problems and does not make a website accessible or guarantee compliance with WCAG or any other accessibility standard. A well-built, accessible website is still essential.**

<img width="601" height="637" alt="JADP panel" src="https://github.com/user-attachments/assets/98007c20-540c-42a2-b2ba-b0fd85c1d527" />


## What visitors can change

Visitors open the toolbar using the floating display-preferences button. Keyboard users can also reach it using the **Open display preferences** link at the beginning of the page; the link becomes visible when it receives keyboard focus.

The toolbar provides these controls:

| Preference | Available settings |
| --- | --- |
| Text size | Normal, Large, Extra large |
| Line spacing | Normal, Increased, Maximum |
| Letter spacing | Normal, Increased, Maximum |
| Word spacing | Normal, Increased, Maximum |
| Contrast | Normal contrast, High contrast |
| Colour | Normal colour, Grayscale |
| Links | Normal link style, Underline links |

Changes take effect immediately. Visitors can combine preferences, close the toolbar without losing their choices, and use **Reset Preferences** to restore all settings to their defaults.

Preferences are saved in the visitor's browser and are reapplied on later pages and visits to the same website. They are stored locally, not in a Joomla user account, and are not transferred between different website origins (for example, between HTTP and HTTPS or between different hostnames). If browser storage is unavailable, preferences can still be changed for the current page, but may not persist.

## Requirements

Joomla 5.4 or later (including Joomla 6). The plugin uses Joomla APIs introduced in Joomla 5.4.

## Installing and enabling JADP

Install the JADP package using Joomla's normal extension installer. Then open **System → Manage → Plugins**, find **System - JADP**, and enable it.

The plugin configuration includes an important notice explaining that JADP provides display preferences only. Enabling it does not make the site accessible.

### Where the toolbar is enabled

The **Enabled** setting controls which Joomla application displays the toolbar:

- **Site (Frontend)** – display it on the public website. This is the default.
- **Administrator (Backend)** – display it in the Joomla administrator.
- **Both** – display it on both the public website and administrator.

The toolbar is only added to HTML pages.

### Trigger button position

The **Trigger Button Position** setting controls where the floating button appears:

- Top Left
- Top Right
- Middle Left
- Middle Right
- Bottom Left
- Bottom Right

The default position is **Bottom Left**. The toolbar panel opens alongside the button. These are physical screen positions and do not automatically swap for right-to-left languages.

### Choosing the trigger icon

The **Universal Access Icon** setting controls the icon shown on the floating button. Choose one of the following:

- **Default JADP Icon** – use the icon supplied with JADP.
- **CSS Font Icon** – use an icon provided by a CSS icon font.
- **PNG Image** – use a PNG image from the site's `images` folder.

When using **CSS Font Icon**, enter the CSS classes for the icon, such as `fa-solid fa-universal-access`, and provide the **Icon Stylesheet URL**. The stylesheet must be publicly accessible and must define those classes and load the font. JADP loads it inside the toolbar, so stylesheets loaded by the template are not automatically available there. Check that any font-file URLs referenced by the stylesheet resolve correctly.

When using **PNG Image**, select a PNG from the site's images folder. A square image around 64 × 64 pixels with a transparent background is recommended. The image is scaled to fit the button. Other image formats are not accepted by this setting.

The icon is decorative; the button retains its accessible name and keyboard operation regardless of the icon selected.

## Customising the CSS

JADP uses separate stylesheets for the toolbar, the visitor's page preferences and the keyboard entry link. The distinction matters: changing the toolbar's appearance is different from changing what a visitor preference does.

The installed files are located in:

```text
media/plg_system_jadp/css/
├── jadp-ui.css
├── jadp.css
└── jadp-skip.css
```
### A note about CSS customisation

The toolbar stylesheet and the visitor-preference stylesheet serve different purposes. How you customise them depends on what you want to change - **this section is not complete yet**.


### Toolbar appearance — `jadp-ui.css`

This stylesheet controls the floating button and the toolbar panel, including its layout, colours, borders, buttons, focus indicators and responsive behaviour.

The toolbar is rendered inside a Shadow DOM. This isolates it from the site's template CSS, so adding rules to the template's `user.css` or other ordinary stylesheets will not directly change the toolbar's contents.

The toolbar stylesheet is registered with Joomla's Web Asset Manager as `plg.system.jadp.ui`. Joomla resolves the stylesheet using its template-aware media lookup. You do not need to add an entry to the template's `joomla.asset.json`; the replacement file is found by its expected path and filename.

For an inheritable site template, place your replacement stylesheet at:

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

Replace `YOUR_TEMPLATE` with the relevant template directory. For an inheritable template with a parent, Joomla checks the active template first and then its parent. If no replacement is found, Joomla uses the stylesheet supplied by the JADP plugin. Keep the replacement in step with changes to JADP's toolbar stylesheet when updating the plugin, and retain visible focus, readable contrast, usable control sizes and responsive behaviour.

The replacement is loaded inside the toolbar's Shadow DOM, so its rules remain isolated from the rest of the page.

### Visitor preference effects — `jadp.css`

This stylesheet controls how the selected preferences affect the website itself:

- Text size changes the body's base font size; it does not change the root font size.
- Line spacing changes the line height of selected text elements.
- Letter spacing changes the spacing between characters in selected text elements.
- Word spacing changes the spacing between words in selected text elements.
- High contrast uses a black page background, white text and yellow links, with adjustments to borders and form controls.
- Grayscale applies a grayscale filter to the page body.
- Underline links adds underlining to links.

This file is registered through Joomla's Web Asset Manager as the `plg.system.jadp` stylesheet. It is the file to review if you want to change the actual effects of a preference, rather than the appearance of the toolbar.

Be careful when changing selectors. Broad rules can affect icons, buttons, form controls and other interface elements as well as text. In particular, changing the document root font size can also resize layout dimensions that use `rem` units. Test changes with different templates and with several preferences enabled together.

### Keyboard entry link — `jadp-skip.css`

This stylesheet controls the **Open display preferences** link at the beginning of the page. The link is positioned off-screen until it receives keyboard focus, when it becomes visible. Keep it discoverable to keyboard and screen reader users; do not hide it using `display: none` or `visibility: hidden`.

## Accessibility and responsibility

JADP gives visitors some control over visual presentation, but it cannot fix inaccessible content or interactions. It does not provide alternative text, correct document structure, accessible forms, keyboard support for the rest of the website, or other accessibility improvements.

Site owners remain responsible for designing, building and maintaining an accessible website. Do not describe a site as accessible simply because JADP is installed or enabled.
