# Safe and Sound Webflow Assets

Custom JavaScript and CSS files for the Safe and Sound Webflow project.

This folder contains project-specific front-end assets that are loaded into the Safe and Sound Webflow site through custom code.

## Purpose

Use this folder for Safe and Sound-specific code only.

This may include:

- Site-wide JavaScript
- Site-wide custom CSS
- Form enhancements
- Webflow interaction helpers
- CMS display logic
- Small animation helpers
- Page-specific scripts

Do not place shared utilities or another client’s code in this folder.

## Folder Structure

```text
safe-and-sound/
  README.md

  css/
    main.css

  js/
    main.js
```

## Files

### `css/main.css`

Primary custom stylesheet for Safe and Sound.

Use this for CSS that cannot be handled cleanly in Webflow’s Designer.

Examples:

- Small global overrides
- Utility classes
- CSS-only enhancements
- Styling fixes that are easier outside Webflow

Loaded in Webflow:

```html
<link rel="stylesheet" href="https://YOUR-USERNAME.github.io/webflow-client-assets/projects/safe-and-sound/css/main.css?v=1.0.0">
```

Recommended location:

```text
Webflow → Site Settings → Custom Code → Head Code
```

### `js/main.js`

Primary JavaScript file for Safe and Sound.

Use this for site-wide JavaScript.

Examples:

- Current year in footer
- Small interaction helpers
- Form behavior
- Custom navigation behavior
- Page initialization logic

Loaded in Webflow:

```html
<script src="https://YOUR-USERNAME.github.io/webflow-client-assets/projects/safe-and-sound/js/main.js?v=1.0.0"></script>
```

Recommended location:

```text
Webflow → Site Settings → Custom Code → Footer Code
```

## Versioning

Use a version query string to avoid browser caching issues.

Example:

```text
?v=1.0.0
?v=1.0.1
?v=1.1.0
```

When updating a file, push the change to GitHub, then update the version number in Webflow if the old file is still cached.

## Rules

- Keep Safe and Sound code inside this folder.
- Do not store passwords, API keys, secrets, or private client information.
- Do not use this folder for unrelated projects.
- Keep scripts small, readable, and documented.
- If a utility could apply to multiple projects, consider moving it to `/shared/`.
- If a change affects the live Webflow site, commit it clearly.

## Current Webflow Usage

Site-wide files:

```html
<link rel="stylesheet" href="https://YOUR-USERNAME.github.io/webflow-client-assets/projects/safe-and-sound/css/main.css?v=1.0.0">
<script src="https://YOUR-USERNAME.github.io/webflow-client-assets/projects/safe-and-sound/js/main.js?v=1.0.0"></script>
```

Page-specific files:

```text
None yet.
```

## Notes

This is the first client project using the shared Webflow asset workflow.

Keep this setup simple until the project needs additional files.