# Document collector

We need a "collector" to collect all of the disparate information we have
about an evolving collection of LPiL documents.

On the "server side" will *index* this information using
[Lunr](https://lunrjs.com/).

On the browser side the application will be built using both
[Lunr](https://lunrjs.com/) and [Mithril](https://mithril.js.org/).

However we need to first collect the information by walking over an
extended file-system reading in YAML and JSON files. The resulting
information will be captured in a JSON structure, and then indexed using
Lunr.index.

