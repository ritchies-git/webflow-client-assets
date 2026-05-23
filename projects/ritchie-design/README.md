# Ritchie Design Webflow Assets

Custom JavaScript and CSS files for ritchie.design.

This folder contains project-specific front-end assets for the personal portfolio, thought platform, and creative lab.

## Purpose

Use this folder for custom code specific to ritchie.design.

This may include:

- Portfolio interactions
- Case study enhancements
- Lab experiments
- Custom animations
- CMS display logic
- Page-specific JavaScript
- Small creative technology experiments
- Custom CSS that is easier to manage outside Webflow

## Folder Structure

```text
ritchie-design/
  README.md

  css/
    main.css

  js/
    main.js
```

As the site grows, this folder may expand to:

```text
ritchie-design/
  css/
    main.css
    lab.css

  js/
    main.js
    home.js
    case-studies.js
    lab.js
```

## Files

### `css/main.css`

Primary custom stylesheet for ritchie.design.

Use this for site-wide CSS that is difficult to manage directly inside Webflow.

Examples:

- Small visual overrides
- Utility classes
- Experimental layout helpers
- Lab-specific styling foundations
- CSS variables, if needed

Loaded in Webflow:

```html
<link rel="stylesheet" href="https://YOUR-USERNAME.github.io/webflow-client-assets/projects/ritchie-design/css/main.css?v=1.0.0">
```

Recommended location:

```text
Webflow → Site Settings → Custom Code → Head Code
```

### `js/main.js`

Primary JavaScript file for ritchie.design.

Use this for site-wide JavaScript.

Examples:

- Footer year
- Navigation helpers
- Global interaction setup
- Site-wide animation helpers
- Reusable Webflow behavior fixes

Loaded in Webflow:

```html
<script src="https://YOUR-USERNAME.github.io/webflow-client-assets/projects/ritchie-design/js/main.js?v=1.0.0"></script>
```

Recommended location:

```text
Webflow → Site Settings → Custom Code → Footer Code
```

## Future Files

Use page-specific files only when the code becomes too specific or too large for `main.js`.

Recommended future structure:

### `js/home.js`

Homepage-specific interactions.

Use for:

- Hero interactions
- Intro animations
- Featured work behavior
- Homepage-only experiments

### `js/case-studies.js`

Case study and project detail behavior.

Use for:

- Reading progress
- Sticky nav enhancements
- Scroll-based section states
- Project-specific UI behavior

### `js/lab.js`

Creative lab and experiment behavior.

Use for:

- Interactive demos
- Prototype logic
- AI/XD experiments
- Generative or experimental UI behavior

## Versioning

Use a version query string to avoid caching issues.

Example:

```text
?v=1.0.0
?v=1.0.1
?v=1.1.0
```

When updating a file, push the change to GitHub, then update the version number in Webflow if needed.

## Rules

- Keep ritchie.design-specific code in this folder.
- Do not place client code here.
- Do not let client projects depend on files in this folder.
- Keep experiments isolated and clearly named.
- Use `/shared/` only for stable utilities that are safe across multiple projects.
- Do not store API keys, secrets, passwords, or private information.

## Current Webflow Usage

Site-wide files:

```html
<link rel="stylesheet" href="https://YOUR-USERNAME.github.io/webflow-client-assets/projects/ritchie-design/css/main.css?v=1.0.0">
<script src="https://YOUR-USERNAME.github.io/webflow-client-assets/projects/ritchie-design/js/main.js?v=1.0.0"></script>
```

Page-specific files:

```text
None yet.
```

## Notes

This folder supports the next version of ritchie.design as a portfolio, thought platform, and creative lab.

The goal is to keep the Webflow site clean while giving custom code a more professional, version-controlled home.