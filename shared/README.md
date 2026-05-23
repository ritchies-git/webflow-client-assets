# Shared Webflow Assets

Reusable JavaScript and CSS utilities for Webflow projects.

This folder is for stable, reusable code that may be shared across multiple client and personal Webflow sites.

Use this folder carefully. Any file loaded by multiple live sites can affect multiple projects when updated.

## Purpose

Use the `shared/` folder for utilities that are:

- Generic
- Stable
- Reusable
- Not tied to one client
- Safe to use across multiple Webflow projects

Good examples:

- Current year helper
- Scroll lock helper
- Basic Webflow utility functions
- Small accessibility helpers
- Reusable CSS utility classes
- Common debugging helpers

Bad examples:

- Client-specific form logic
- One-off animation code
- Project-specific CMS behavior
- Brand-specific styles
- Anything experimental or unstable

## Folder Structure

```text
shared/
  README.md

  css/
    utilities.css

  js/
    webflow-utils.js
    current-year.js
```

## Files

### `css/utilities.css`

Reusable CSS utility classes that may be helpful across multiple Webflow projects.

Examples:

- Visually hidden helper
- No-scroll utility
- Basic layout helpers
- Small accessibility utilities

Loaded in Webflow:

```html
<link rel="stylesheet" href="https://YOUR-USERNAME.github.io/webflow-client-assets/shared/css/utilities.css?v=1.0.0">
```

Recommended location:

```text
Webflow → Site Settings → Custom Code → Head Code
```

### `js/webflow-utils.js`

Reusable JavaScript helpers for Webflow projects.

Examples:

- Safe DOM-ready function
- Element selector helpers
- Debug utilities
- Webflow-specific helper patterns

Loaded in Webflow:

```html
<script src="https://YOUR-USERNAME.github.io/webflow-client-assets/shared/js/webflow-utils.js?v=1.0.0"></script>
```

Recommended location:

```text
Webflow → Site Settings → Custom Code → Footer Code
```

### `js/current-year.js`

Reusable helper for automatically updating footer copyright years.

Example Webflow usage:

Add this custom attribute to a text element:

```text
data-current-year
```

Then load the script:

```html
<script src="https://YOUR-USERNAME.github.io/webflow-client-assets/shared/js/current-year.js?v=1.0.0"></script>
```

## Important Warning

Shared files can create hidden dependencies.

If multiple projects load the same shared file, changing that file can affect all of those projects.

Before editing a shared file, check which projects use it.

## Safer Client Workflow

For client projects, it is often safer to copy stable shared code into the project folder instead of loading the shared file directly.

For example:

```text
shared/js/current-year.js
```

Can be copied into:

```text
projects/safe-and-sound/js/main.js
```

This avoids accidentally breaking multiple client sites with one shared update.

## Versioning

Use version query strings to avoid caching issues.

Example:

```text
?v=1.0.0
?v=1.0.1
?v=1.1.0
```

For shared files, version carefully because multiple projects may depend on the same file.

## Rules

- Only add reusable, stable code to this folder.
- Do not add client-specific logic.
- Do not add experimental code.
- Do not store secrets, API keys, passwords, or private information.
- Document any project that depends on a shared file.
- Be cautious when editing shared files after they are used on live sites.

## Projects Using Shared Files

Track shared file usage here.

### `shared/css/utilities.css`

Used by:

```text
None yet.
```

### `shared/js/webflow-utils.js`

Used by:

```text
None yet.
```

### `shared/js/current-year.js`

Used by:

```text
None yet.
```

## Notes

The shared folder should stay small.

Most code should live inside the specific project folder unless it has proven reusable across multiple Webflow builds.