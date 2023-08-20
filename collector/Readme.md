# LPiL document information collector

The `lpil-collector` tool walks through a collection of LPiL documents located
in a file-system and collates the associated information into a JSON structure
which the client side lpil-browser will use to allow the user to explore a
collection of LPiL documents.

The raw data for about each LPiL document will come from:

  - The output of the `lpil` tool (`lpilRefs.yaml`),
  - A YAML file describing each LPiL document (`lpilDesc.yaml`), 
  - One or more YAML files providing a Glossary for the overall collection of
    LPiL documents (`lpilGlos.yaml`),
  - One or more YAML mapping files (`lpilMap.yaml`).

Since there may be a number of different collections of LPiL documents, the
`lpil-collector` will "walk" through the file-system starting a one or more
"root" directories. During this walk, the `lpil-collector` will load information
from any files with the above listed names.


A `lpilDesc.yaml` file contains:

```yaml
ref: aVeryShortRefID
title: An example title
shortTitle: A short title
description: |
  this will be a long

  multi-line description
  in which we could use either `|` or `>`

parent: aParentRefID
```