# A Cross-Reference/Glossary Ontology?

Should we invest the time in building a Cross-Reference/Glossary
[Ontology](https://en.wikipedia.org/wiki/Ontology)?

- **Question**: Should we use the [AMS classification
  system](https://msc2020.org/)? ([Browsable
  version](https://zbmath.org/classification/))

  **Answer** Unfortunately it is not detailed enough where we need to go,
  and it is too rigid for our needs.


- **Question** Should we use [OWL2](https://www.w3.org/TR/owl2-overview/)
  ([Web Ontology
  Language](https://en.wikipedia.org/wiki/Web_Ontology_Language)) or
  [RDFS](http://www.w3.org/RDF/) ([Resource Description
  Framework](https://en.wikipedia.org/wiki/Resource_Description_Framework))

  **Answer** Probably not internally, as these are both too rigid and
  rather verbose (depending upon the chosen storage format chosen).

  However, we *should* probably use some of these tools to express a
  rudimentary rendition of our ontology at the web/presentation level.

  Probably a simple YAML structure based loosely on the [OWL-ish
  "Manchester Syntax" frame
  structure](https://en.wikipedia.org/wiki/Web_Ontology_Language#Manchester_Syntax)
  would suffice for our needs in the near to medium term. ([W3C
  spec](https://www.w3.org/TR/owl2-manchester-syntax/))
s