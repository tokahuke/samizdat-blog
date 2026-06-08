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

This is a small, but important collection of caveats and potential pitfalls that you will have to keep in mind when developing Web applications for SAMIZDAT. These apply mostly to rich stateful applications; if all you want is to deploy is your personal blog, just don't accidentally commit your bank details to the network and you should be fine. 

## JavaScript context sharing

<aside class="note">
Careful when storing data in the user's browser when using SAMIZDAT! Other pages in the network will have access to it if stored as plaintext. This is a known issue.
</aside>

Browsers are very good at keeping data belonging to different sites separate in your computer. However, they operate using the standard rules of the Web, which are all based on location addressing. For them, a SAMIZDAT node appears as a single website and will therefore receive a _single_ context, independent of series, collection or object hash. This means that cookies, `localStorage` and even `sessionStorage` (any kind of storage, for that matter!) might be observed by other, potentially evil, people which are able to convince the poor user to load their page. Therefore, be mindful when storing sensitive information, such as passwords in the user's browser when using SAMIZDAT.

## SAMIZDAT is public by default

Even though, only those who have access to a certain SAMIZDAT link are able to access that link, there is no such thing as a _private_ or members-only area. Other than discretion and obscurity (i.e., _not_ sharing the link), there are no other access control mechanisms in place. If you want a private area, you will have to roll out your own. You might even use standard Web architecture for this (i.e., create an authentication server). SAMIZDAT is not the best solution for all usecases, far from that.

## Outbound `Referer` is stripped

The node ships a default `Referrer-Policy: same-origin` header. Same-origin requests (inside your series subdomain, or to admin endpoints on the bare loopback host) still carry a `Referer`; cross-origin requests (a link from your page to anywhere on the open Web) carry no `Referer` at all. This keeps third-party sites from logging "user came from `series-<base32-key>.localhost:4510/some/path`" and learning the user is a SAMIZDAT user on that series.

If your page genuinely needs to send a `Referer` to an external destination (analytics opt-in, a partner site that requires it, etc.), override per-document or per-element. Both are standard HTML; nothing samizdat-specific.

Per-document, in `<head>`:

```html
<meta name="referrer" content="no-referrer-when-downgrade">
```

Per-element, on the link or fetch that needs it:

```html
<a href="https://news.example.com" referrerpolicy="unsafe-url">read more</a>
```

The element-level attribute wins over the document `<meta>`, which wins over the response header. Use the most specific scope you need.
