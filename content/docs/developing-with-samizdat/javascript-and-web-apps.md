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
Careful when storing data in the user's browser when using SAMIZDAT! Other pages in the network will have access to it if stored as plaintext. This is a known issue. Local information storages might be totally disabled in the future.
</div>

Browsers are very good at keeping data belonging to different sites separate in your computer. However, they operate using the standard rules of the Web, which are all based on location addressing. For them, a SAMIZDAT node appears as a single website and will therefore receive a _single_ context, independent of series, collection or object hash. This means that cookies, `localStorage` and even `sessionStorage` (any kind of storage, for that matter!) might be observed by other, potentially evil, people which are able to convince the poor user to load their page. Therefore, avoid storing _any kind_ of sensitive information on _any kind_ of browser storage when using SAMIZDAT. Everybody will be able to see it.

But fear not! This does not mean that you are limited only to _stateless_ pages when developing for SAMIZDAT. In fact, SAMIZDAT offers its very own KVStore API, which is available on all pages and works almost exactly like `localStorage` (except its API is `async`). This API, unlike browser storages, does understand how SAMIZDAT works and is able to keep contexts separate. See the [KVStore](#kvstore) session below for a primer on this API.


## SamizdatJS

SamizdatJS is a JavaScript library for interacting with a (local) SAMIZDAT node. It is a basic wrapper around the underlying REST API of the SAMIZDAT node. You can either install it in your NPM project using 
```bash
npm install samizdat-js
```
(coming soon!) or you can import it in your webpage directly using a script tag, like so:
```html
<script src="/samizdat/samizdat.js"></script>
<!-- ... or ... -->
<script src="/_series/fGfgc7ibvwy26U7nHjcaAhYmyLvXl84Ld-qab_0PPJc/samizdat.js"></script>
```
This script loads a class in you `window` object called `Samizdat`, which is the class of SAMIZDAT clients. To instantiate a client, you must call its constructor in one of the two following fashions:
```js
// For access to the public APIs only.
const sz = new Samizdat();
// For authenticated access to the private APIs (in this case, "ManageObjects").
const sz = new Samizdat(["ManageObjects"]);
```
In the next sessions, we will discuss about the public API, the private API as well as how to ask the user for consent to use the private API.

## Public APIs

### KVStore

Since all SAMIZDAT pages share the same browser origin, use of any persistence web API (`localStorage`, `sessionStorage`, `cookie`, etc...) is strongly discouraged. Instead, SAMIZDAT offers a simple key-value storage which works much in the same way as `localStorage`, except for the fact that it is async. Once you have instantiated a SamizdatJS client, you can start using this storage right away:
```js
const sz = new Samizdat();

// Insert a key:
await sz.kvstore.put("foo", "bar");
// Read a key:
const foo = await sz.kvstore.get("foo");
// Clear a key:
await sz.kvstore.delete("foo");
// Clear the whole storage:
await sz.kvstore.clear();
``` 
In the case of `put`, `delete` and `clear`, the `await` may be dropped in order to let the operation happen in the background. However, note that the storage will work as _eventually consistent_ in this case.

The advantage of the SAMIZDAT key-value storage, as noted before, is that it is controlled by the node. Therefore, context isolation works as expected. So, for example,
```js
// If in page /_series/PUBLIC_KEY_A/foo.html one does ...
sz.kvstore.put("foo", "bar");
// ... in page /_series/PUBLIC_KEY_B/foo.html one still gets:
const equalsNull = await sz.kvstore.get("foo"); // null!
```
The SAMIZDAT context is defined by entity (series, collection or object) and each context is its own thing. For example, event if series A has an edition hash A<sub>n</sub>, pages `/_series/A/foo.html` and `/_collections/A_n/foo.html` do not share each others values. It is as if they were seen as different sites (origins) by the browser. 

### Fetching data

The other thing an unauthenticated client can do is to fetch documents from the SAMIZDAT network. Below are some examples of how to fetch data using the SAMIZDAT client:
```typescript
// Fetching by object hash:
const anObject: Blob = await sz.getObject("W9SwR5fPfPNRP684PUPPBtWCZsr6djnOUWPgOg");
// Fetching by collection and item:
const anItem: Blob = await sz.getItem("BV8VnECw7OEeS6g5JtQtbFeMqnd6WuhT66pXqg", "/foo.html");
// Fetching by series and item:
const aSeriesItem: Blob = await sz.getSeriesItem("fGfgc7ibvwy26U7nHjcaAhYmyLvXl84Ld-qab_0PPJc", "/samizdat.js");
// Fetching by collection and item:
const anIdentityItem: Blob = await sz.getIdentityItem("samizdat", "/samizdat.js");
```
Any page that can be accessed by any means using the browser navigation tab can also be fetched by a SAMIZDAT client, even if they come from radically different contexts. Remember that everything in SAMIZDAT is public by default.

## Authenticating with the SAMIZDAT node

## Private APIs

### Objects and collections

### Series

### Subscriptions
