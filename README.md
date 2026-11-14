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

The toolbar must include an easily discoverable explanation of its purpose.

The following statement should be displayed:

"This toolbar provides user preference controls only. It does not make this website accessible or guarantee compliance with accessibility standards."

This statement should remain available regardless of which display preferences are enabled.

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
