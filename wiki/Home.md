
<img src="./assets/icon-flat.png" width="200" />

## Overview

Welcome to the PreTTY wiki!

This section traces the management relevant documents, which are used as a guide for team members of this project.


## Content List

The document of this ptoject including the following components:

* [x] Project Charter
* [x] Project Management Plan
* [x] Scope Statement (Requirement Specification)
* [ ] Preliminary Design Specification
* [ ] Specific Design Specification
* [ ] Data Model & Storage Design
* [x] Work Breakdown Structure
* [ ] Testing Plan & Report
* [ ] Project Review

## Update the wiki

To update the content is this wiki, we recommend to clone the wiki repo to local and update relevant pages.

```bash
git clone git@github.com:Jack-Q/PreTTY.wiki.git
```

## Export wiki

To export wiki page to other format, the `pandoc` toolkit will be greatly helpful.
The following command export a markdown page to Microsoft Word format:

```bash
pandoc "Initial Version/Project Charter.md" \
    -f markdown -t docx -s -o project-charter.docx
```
