---
title: "JavaScript and Web Apps"
date: 2021-12-04T17:30:43-03:00
type: docs
menu:
    docs:
        parent: "Developing with Samizdat"
        weight: 30
---

# JavaScript and Web Apps

SAMIZDAT allows you to create not only static pages, but also full-blown web applications, including Single Page Applications (SPAs). Not only that, but your applications can also interact with the local user's SAMIZDAT node in a controlled and secure way. However, there are also some limitations to what you can do in SAMIZDAT. The main culprit is that the whole network is shoved into a single _origin_, which has far-reaching consequences to how regular browsers deal with information and security scopes. Let's first discuss the main _caveats_ before jumping into the features.


## JavaScript context sharing

<div class="alert alert-primary">
Careful when storing data in the user's browser when using SAMIZDAT! Other pages in the network will have access to it if stored as plaintext. This is a known issue. Local information storages might be totaly disabled in the future.
</div>

Browsers are very good at keeping data belonging to different sites separate in your computer. However, they operate using the standard rules of the Web, which are all based on location addressing. For them, a SAMIZDAT node appears as a single website and will therefore receive a _single_ context, independent of series, collection or object hash. This means that cookies, `localStorage` and even `sessionStorage` (any kind of storage, for that matter!) might be observed by other, potentially evil, people which are able to convince the poor user to load their page. Therefore, avoid storing _any kind_ of sensitive information on _any kind_ of browser storage when using SAMIZDAT. Everybody will be able to see it.

But fear not! This does not mean that you are limited only to _stateless_ pages when developing for SAMIZDAT. In fact, SAMIZDAT offers its very own KVStore API, which is available on all pages and works almost exactly like `localStorage` (except its API is `async`). This API, unlike browser storages, does understand how SAMIZDAT works and is able to keep contexts separate. See the [KVStore](#kvstore) session below for a primer on this API.


## `SamizdatJS`

## Public APIs

### KVStore

## Authenticating with the SAMIZDAT node

## Private APIs

### Objects and collections

### Series

### Subscriptions
