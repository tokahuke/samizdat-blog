---
title: "Security Considerations"
date: 2021-10-29T00:06:00-03:00
type: docs
menu:
    docs:
        parent: "Developing with Samizdat"
        weight: 40
---


# Security considerations

This is a small, but important collection of caveats and potential pitfalls that you will have to keep in mind when developing Web applications for SAMIZDAT. These apply mostly to rich statefull applications; if all you want is to deploy is your personal blog, just don't accidentally commit your bank details to the network and you should be fine. 

## JavaScript context sharing

<div class="alert alert-primary">
Careful when storing data in the user's browser when using SAMIZDAT! Other pages in the network will have access to it if stored as plaintext. This is a known issue.
</div>

Browsers are very good at keeping data belonging to different sites separate in your computer. However, they operate using the standard rules of the Web, which are all based on location addressing. For them, a SAMIZDAT node appears as a single website and will therefore receive a _single_ context, independent of series, collection or object hash. This means that cookies, `localStorage` and even `sessionStorage` (any kind of storage, for that matter!) might be observed by other, potentially evil, people which are able to convince the poor user to load their page. Therefore, be mindful when storing sensitive information, such as passwords in the user's browser when using SAMIZDAT.

## SAMIZDAT is public by default

Even though, only those who have access to a certain SAMIZDAT link are able to access that link, there is no such thing as a _private_ or members only area. Other than discretion and obscruty (i.e., _not_ sharng the link), there are no other access control mechanisms in place. If you want a private area, you will have to roll out your own. You might even use standard Web architecture for this (i.e., create an authentication server). SAMIZDAT is not the best solution for all usecases, far from that.
