---
title: "Directory structure"
date: 2021-11-04T23:01:19-03:00
type: docs
menu:
    docs:
        parent: "Developing with Samizdat"
        weight: 30
---

<!-- Your markdown content goes here -->

# Directory strucutre

Since when you are developing for SAMIZDAT, you are actually creating only a _section_ of a huge site and not a proper site, some rules  of the "link game" change. For example, if you wanted to refer to a static global sylesheet in your site, you would simply put it in `/style.css` and call it a day. Not so with SAMIZDAT. After all, the route `/style.css` is invalid. You want `/_series/<your public key>/style.css`. How can we manage that?


## The `~` route

Imagine that you are developing a blog post page in `/_series/<your public key>/blog/my-first-article` and you need to load our stylesheet in `/_series/<your public key>/style.css`. You _could_ hardcode the full link, but that can be troublesome to change. However, imagine that your user wants to access your content via a _collection_ instead. Each edition is a consistent whole, but accessing _that_ styleheet from possibly another edition (a more recent one) can mix up things, with unpredictable results. We need a way to consistently reference "the root of the directory I am accessing".

Linux terminals gives an inspiration to the solution. In case you are not familiar with Linux command lines (or MacOS, for that matter), the symbol `~` means "the home directory of the current user". For example, if we ask for the file `~/Documents/Resumè.docx`, what we actually mean is `/home/<your user name>/Documents/Resumé.docx`. The `~` symbol in the route of a SAMIZDAT URL has the same meaning. Here is how it works: 

1. You reference the stylesheet from your blog page as `~/style.css`.
2. Since this is a _relative_ URL, the user's browser interprets this link as `/_series/<your public key>/blog/my-first-article/~/style.css` and asks the node for it.
3. The node interprets the route and finds a `~`. It then _rewrites_ the corret link, `/_series/<your public key>/style.css`, and sends this link as a 301 redirect to the browser.
4. The browsers follows the redirect and asks for the correct link.

Yes, this includes an extra redirect, which was not there before, but remember: the node operates locally as a proxy, so there is no real network latency.

You can use `~` in your code as the _base URL_ for your whole series and have the guarantee that acess will be uniform, no matter the access method used by the user. 


## Changes applied by the SAMIZDAT CLI

This is something that is also related to directory structure, which is worth mentioning. The SAMIZDAT CLI does not mount collections as an _exact_ copy of the build directory. Here is what is meddled with:

1. A folder `foo/bar` containing a file `index.html` will also have a path `foo/bar` with the same content as `index.html`. This is standard of many web servers and helps to create shorter, more memorable URLs.
2. A _sitemap_ file called `~/_inventory` is added to the collection. This is a JSON file containing all paths in the collection, associates to their respective object hashes.

Please be aware of these transformations when developing your series. 
