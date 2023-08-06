# The architecture of the LPiL-Browser

(Initially) we develop the browser in Python.

The *only* user input will be a search function as well as an externally
moderated comment function.

This means that the LPiL-Browser's underlying website will be entirely
data-driven, and more importantly the *only* changes to the data-sources
will come from off-line document creation and moderation processes.

This means that there are only two sources of potential security breaches,
in the search function and in the comment submission.

## Glossary, Cross-references, Index, Drafts, comments

Keep this as simple and data-driven as possible, with minimal user
input!!!

Initially just get "something" running to see how *I* use it...

I need an (initially) simple infrastructure to create a web-based:

	- one app/front-end:
	  - Glossary
  	- Cross-references
  	- Index

	- other app/front-end :
   	- Drafts structure manager

  - other app/front-end :
  	- comments (linked to drafts structure manager)

  - other app/front-end:
    - bibliographic references

### Drafts Structure Manager

The drafts structure manager should be driven by the
(supra)(latex)document structure. (Using LPiL-tool)

However, I may need to add information about how the document structure
maps from one draft to the next.

### Index, cross-references, Glossary

The index, cross-references should be extracted from the LaTeX document's
cross-references, and indexing tools. (Using LPiL-tool)

Again, I may need to add (a small amount of) information to link from one
draft to another.

### Backend storage

Probably SQLite3 single file pushed to website.

### Server Language

Probably initially as simple a Python app as possible (fewest packages
used means fewer bugs : KISS)

IF and when it gets heavily used by outside users (I hope)... we can
reconsider redeveloping in say, GoLang

### Questions

1. Should/can this be crawled by Google/DuckDuckGo?

2. How to link Glossary to NCatLab and Wikipedia?

3. How to simply add this "extra" (backend) data?
