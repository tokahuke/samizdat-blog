---
title: "Collections"
date: 2021-10-29T00:10:00-03:00
type: docs
menu:
    docs:
        parent: "Architecture"
        weight: 30
---

# Collections

A _collection_ is the SAMIZDAT analogue of a directory: a named bundle of
objects, addressed by content rather than location. Where an object is
just a blob of bytes, a collection wires a set of objects together under
human-meaningful paths like `index.html`, `posts/hello/index.html`,
`assets/logo.png`.

## Collection structure

Internally, a collection is a Patricia tree (a bit-trie) keyed by the
hash of each item's path, with the object hash as the value:

```
PatriciaMap<Hash(path), Hash(object)>
```

The root hash of this tree is itself the collection's identity. Two
collections with the same set of `(path, object)` pairs land at the
same root hash; change a single byte in any object, or rename a single
file, and the root hash shifts entirely. The collection identity is
therefore a Merkle root: it commits to the whole tree at once, and any
single `(path, object)` pair can be proven to belong with a small
inclusion proof.

Storing the path as `Hash(path)` rather than as the literal string is
deliberate. The hub never needs to learn that you have a file called
`drafts/secret.md`; it only ever sees opaque hashes derived from it.

## Item resolution and transfer

When a node asks for a path inside a collection, it computes a
_locator_:

```
Locator = Hash(collection_hash || item_path)
```

The locator is the unit of matchmaking on the hub side. A node that
holds the collection can answer "I have locator L" without ever
revealing _which_ path inside _which_ collection L corresponds to;
likewise the asker learns nothing the hub did not already know. The
inclusion proof that travels alongside the object lets the asker
verify, against the collection root, that the bytes it received really
do belong at that path in that collection.

The actual file transfer happens directly between the two nodes, over
QUIC, with no hub in the loop. The hub only ever brokered the
introduction; it has not seen the path, the object, or even which
collection was in play.

## Methods on collections

Collections are **immutable**. There is no in-place edit, no rename, no
append. To publish a new version of a site, the publisher builds a new
collection (with a new root hash) and points an _edition_ on its
series at it. The old collection is still resolvable by hash if any
node holds it, but no one looking up the series will find it through
normal channels. See [series](../series/) for how editions point at
collections and how supersession works.
