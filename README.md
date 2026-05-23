# Webflow Client Assets

A shared asset library for managing custom JavaScript and CSS files used across Webflow projects.

This repo is used to host project-specific and shared front-end assets through GitHub Pages so they can be loaded into Webflow using `<script>` and `<link>` tags.

## Purpose

Webflow is used for visual site building, CMS, layout, and native interactions.

This repo is used for:

- Project-specific JavaScript
- Project-specific custom CSS
- Shared utility scripts
- Shared helper styles
- Version-controlled custom code
- Cleaner development outside of Webflow’s custom code panels

## Folder Structure

```text
webflow-client-assets/
  index.html
  README.md

  projects/
    safe-and-sound/
      README.md
      css/
        main.css
      js/
        main.js

    ritchie-design/
      README.md
      css/
        main.css
      js/
        main.js

  shared/
    README.md
    css/
      utilities.css
    js/
      webflow-utils.js