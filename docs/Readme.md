# The architecture of the LPiL-Browser

(Initially) we develop the browser in Typed-Python.

The *only* user input will be a search function as well as an externally
moderated comment function.

This means that the LPiL-Browser's underlying website will be entirely
data-driven, and more importantly the *only* changes to the data-sources
will come from off-line document creation and moderation processes.

This means that there are only two sources of potential **security breaches**,
in the search function and in the comment submission.

### Backend storage

The LPiL-browser website will be fully data-drive using a single SQLite3
database pushed to website whenever a new document or a batch of comments are
added.

This single SQLite3 database will be formed by combining multiple SQLite3
databases, one from each *draft* of a LPiL document in the collection.

The Glosary definitions will be stored in individual Markdown files (one per
defintion).

The accepted comments will be stored in individual Markdown files (one per
comment?).

The inter-draft mapping will be provided by a yaml file for each draft->draft
mapping.

The LPiL-browser project will provide a tool which assembles the (transient)
master database from the individual parts.

### Server Language

Probably initially as simple a Python app as possible (fewest packages
used means fewer bugs : KISS)

IF and when it gets heavily used by outside users (I hope)... we can
reconsider redeveloping in say, GoLang

**Consider** 

  - FastAPI/Starlette
    - with FastAPI I would need a JS/TS frontend
    - with Starlette I could use jinja2 for simple HTML
    - Starlette has very few dependencies...
  - Quart (aka AsyncFlask)
  - Sanic 

### Questions

1. **Q** Should/can this be crawled by Google/DuckDuckGo?

   **A** yes if at all possible... how?

2. **Q** How to link Glossary to NCatLab and Wikipedia?

   **A** using yaml headers in each Glossary definition

3. **Q** How to simply add this "extra" (backend) data:
     - draft->draft mapping,
     - glossary links,
     - comment linking,
     - ...

   **A** using YAML snipets in either the Markdown files or in a mapping YAML
   document.
