---
title: "JavaScript and Web Apps"
date: 2021-10-29T00:05:00-03:00
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
<script src="/get-samizdat/samizdat.js"></script>
<!-- ... or ... -->
<script src="/_series/{{< get_samizdat_public_key >}}/samizdat.js"></script>
```
This script loads a class in you `window` object called `Samizdat`, which is the class of SAMIZDAT clients. To instantiate a client, you must call its constructor in one of the two following fashions:
```js
// For access to the public APIs only.
const sz = new Samizdat();
// For authenticated access to the private APIs (in this case, "ManageObjects").
const sz = new Samizdat(["ManageObjects"]);
```
In the next sessions, we will discuss about the public API, the private API as well as how to ask the user for consent to use the private API.

<div class="alert alert-success">
<code>SamizdatJS</code> is available for you to fiddle with in this page (if you are not sitting behind a SAMIZDAT proxy). Feel welcome to hit <code>Ctrl+Shift+I</code> and give it a go in your browser's console.
</div>

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

In order to access more private user data, such as series private keys, you need to authenticate your entity with the user's local SAMIZDAT node. Similarly to OAuth or SSO logins, this requires the user's input in a separate popup page. Fortunately, SamizdatJS already handles the whole authentication flow seamlessly for the programmer. If the page is note already authorized, it will do so automatically at the first private API call.

To ask for access to the private APIs, just pass the list of desired access rights to the `Samizdat` class constructor:
```js
const sz = new Samizdat(["ManageObjects", "GetObjectStats"]);
```
or, in TypeScript,
```typescript
const sz = new Samizdat([AccessRight.ManageObjects, AccessRight.GetObjectStats]);
```
This is the list that will be asked from the user in the popup page. By now, the user can only grant all rights or deny all. Therefore, be sparing when asking for permissions.

### Access rights

Here is the list of access rights that can be asked from the user:

- `ManageObjects`: Manage local objects, including uploading new objects and deleting existing ones.
- `GetObjectStats`: Get statistics on object use and user behavior.
- `ManageBookmarks`: Manage bookmarks.
- `ManageCollections`: Manage local objects, including uploading whole new collections.
- `ManageSeries`: Manage locally owned series, including reading private keys and uploading new editions.
- `ManageSubscriptions`: Manage subscriptions to series.
- `ManageIdentities`: Manage locally stored identities.

## Private APIs

This is a whirlwind tour of the SAMIZDAT private APIs. It follows a basic CRUD pattern, which should be intuitive enough to follow.

### Objects

Even though every time a page is loaded from the network into the SAMIZDAT node a local object is created, _uploading_ a brand new object is a private operation sitting behind the `ManageObjects` access right. This is done to avoid pages from spamming users with unwanted programmatic content. The same thing goes for deleting objects, just the other way around: it is done to avoid pages from competitively deleting each other's local copies, thus hindering content dissemination. 

Once you instantiate a `Samizdat` client with the `ManageObjects` access right, you can easily upload a new object as JavaScript `Blob` to the local node:
```typescript
const myObject = new Blob(["Hello, World"], {"content-type": "text/plain"});
const hash: string = await sz.postObject(myObject);
```
Similarly, you can delete an object by its hash (it it exists):
```typescript
await sz.deleteObject("W9SwR5fPfPNRP684PUPPBtWCZsr6djnOUWPgOg");
``` 
However, note that deleting an object does not necessarily purge the object from the network (SAMIZDAT was created to be resilient to _exactly that_). If somebody else somewhere still has the object, a simple call to `sz.getObject(hash)`, which is a public API call, will probably restore a local copy.

Objects also have a second access right, which is `GetObjectStats`. This access right allows the web application to get information on object usage statistics, among other things:
```typescript
const foo: object = await sz.getObjectStats("W9SwR5fPfPNRP684PUPPBtWCZsr6djnOUWPgOg");
```


### Collections

Just like with objects, collections can be created with the `ManageCollections` access right and the `postCollection` method:
```typescript
const hash: string = await sz.postCollection(
    [
        ["/foo.html", "W9SwR5fPfPNRP684PUPPBtWCZsr6djnOUWPgOg"],
        ["/bar.html", "WmpwXiBTrTPtDhtnmeRBqncXDGqwNzGzMfwSqA"],
        ["/baz/qux", "DVolSn8I4YdrAKfDb4gQcoflFp22__yuoX1hIg"],
    ],
)
```

Because of the way SAMIZDAT is implemented, there is no `deleteCollection` (by now).

### Series

Series (owners) are public cryptography keypairs that he local user has. With the `ManageSeries` access rights, you can create, read and delete these keypairs. This is a great responsibility, since the private part of the keypair is very sensible information!

To create a new series owner with label `mySeries`, just run
```typescript
const series = await sz.postSeriesOwner("mySeries");
```

To list, one or all local series owners, you can use
```typescript
// For a particular series owner:
const series = await sz.getSeriesOwner("mySeries");
// For all series owners:
const allSeries = await sz.getSeriesOwners();
```

And finally, to delete a series owner, there is also the appropriate method:
```typescript
const existed: boolean = await sz.deleteSeriesOwner("mySeries");
```
