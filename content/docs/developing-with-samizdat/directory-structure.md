---
title: "Directory structure"
date: 2021-10-29T00:04:00-03:00
type: docs
menu:
    docs:
        parent: "Developing with Samizdat"
        weight: 30
---

<!-- Your markdown content goes here -->

# Directory structure

Each series lives at its own subdomain of `localhost`, so the rules of the "link game" inside a series match the rules of the open Web. The route `/style.css` resolves against the series' own root; a page at `/blog/my-first-article` linking to `/style.css` works the same way it would on any regular website. Relative paths (`./style.css`, `../style.css`) resolve relative to the current page in the usual way.


## Changes applied by the SAMIZDAT CLI

This is something that is also related to directory structure, which is worth mentioning. The SAMIZDAT CLI does not mount collections as an _exact_ copy of the build directory. Here is what is meddled with:

1. A folder `foo/bar` containing a file `index.html` will also have a path `foo/bar` with the same content as `index.html`. This is standard in many web servers and helps to create shorter, more memorable URLs.
2. A _sitemap_ file called `~/_inventory` is added to the collection. This is a JSON file containing all paths in the collection, associated to their respective object hashes.

Please be aware of these transformations when developing your series. 
