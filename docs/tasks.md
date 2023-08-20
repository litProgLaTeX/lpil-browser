# Browser tasks

## Tasks

1. simple YAML files as examples of each type

2. simple Starlette/uvicorn/jinja2 wwebsite

3. tool to consolidate YAML data into an SQLite database

4. show that we can query the database and produce HTML output.

## Notes

- Consider doing search (and display) completely inside the browser using
  [Lunr](https://lunrjs.com/) and [Mithril](https://mithril.js.org/) usings
  data sent in one go as a gzipped JSON structure. (Our total data will
  almost certainly NOT be as large as an average image)...

- The suggestion that we *need* AJAX lookup (see below), suggests that we
  do not want to use Jinja2 but rather need a JS/TS frontend such as
  [Mithril](https://mithril.js.org/) and a
  [Starlette](https://www.starlette.io/) based JSON backend.

- IF we do not use AJAX, then jinja2 and html might be easier...

- Do we need a CSS framework? Yes... which?
  - consider [Bulma](https://bulma.io/)

- We will use [Starlette](https://www.starlette.io/) on top of
  [uvicorn](https://www.uvicorn.org/)

## Primary data sources

1. lpil-tool as it parses a LPiL document
  - cross references, structure labels, table/figure labels, ...

2. YAML document description files

3. Label description files
  - descriptions
  - label parents

4. Glossary description files
  - descriptions

5. Mapping files

## Production Tasks (static only?)

- search for known documents
  - free text

- search for existing labels
  - free text search of description and labels

- list existing documents
  - with description (markdown + MathJax)
  - with links to other documents
  - with list of reference lables

- list existing reference labels
  - with description (markdown + MathJax)
  - with links to other labels
  - with links to other websites (Wikipedia, nCatLab)
  - with links to documents

## Development Tasks (interactive for my use)

- search/list existing documents (as above)

- search/list existing reference labels (as above)

- add new labels with description
  - python/JSON/multi-lineQuots script ?
  - OR YAML multi-line strings?

- add new links (need AJAX label lookup?)
  - OR via YAML from lpil-tool? (in which case AJAX is not needed)
  - other labels
  - other websites
  - documents

## SQL database

We will use [SQLAlchemy](https://www.sqlalchemy.org/)

- Document Table
  - Document name (is this "just" another Label?)
  - Draft version
  - Draft date
  - description

- Document2Document Table
  - from Document ref
  - to Document ref
  - reason/description
  	- see also
  	- new-version
  	- ???

- Glossary
  - name
  - description

- Glossary2Label
  - Glossary ref
  - Label ref
  - reason/description
    - uses?

- Label Table
  - label
  - type
    - document
    - reference
    - ???
  - description
  - parent label
  - child lables

- Label2Label Table
	- from label ref
	- to label ref

- Links2Websites Table
	- label ref
  - reason/description
  	- see also
  	- ???

- Links2Documents Table
	- label ref

