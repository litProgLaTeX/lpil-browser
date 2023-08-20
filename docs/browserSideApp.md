# Browser Side Application

Use:

- send glossary database as a gzip compressed JSON structure with
  associated Lunr seach index all computed on the server side and sent as
  a static artifact.

- [Lunr](https://lunrjs.com/) for the server side index creation and the
  browser side search implementation.

- [Mithril](https://mithril.js.org/) for the page rendering.

## Architecture

### Server Side

- **collector** to collect the document data into a single JSON structure.
  - Written in TypeScript

- **indexer** to use Lunr to index the JSON structure from above
  - Written in TypeScript / Lunr

- **webserver** to serve the (mostly/only) static resources
  - gzipped JSON structure
  - Mithril/Lunr/local Javascript
	- Written in use Vite for development and NGinx/lighttpd for production.

  - for static ONLY we will use
    [lighttpd](https://redmine.lighttpd.net/projects/lighttpd/wiki/TutorialConfiguration)

  - for a dynamic website we will use Python/Starlette

### Browser Side

- **application** to search and render the JSON structure.

## Tools

We will use [Vite](https://vitejs.dev/) and
[Rollup](https://rollupjs.org/) to develop and then bundle (for production
use).

We will use [Mithril](https://mithril.js.org/) and
[Lunr](https://lunrjs.com/) for the front end frameworks.

We will use [Lunr](https://lunrjs.com/), TypeScript and various NodeJS
modules for the backend frameworks.
