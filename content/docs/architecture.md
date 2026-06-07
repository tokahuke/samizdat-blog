---
title: "Architecture"
date: 2021-10-29T00:07:00-03:00
type: docs
menu:
    docs:
        weight: 4
---

# The Architecture of SAMIZDAT

The 30-second mental model: a publisher's CLI hands content to their
local `samizdat-node`, which announces it through one or more
`samizdat-hub` matchmakers; a consumer's local `samizdat-node` hears
about the new content from its hubs and pulls the bytes directly from
whichever node still holds them. So:

```
publisher -> node -> hub -> ... -> hub -> node -> consumer
```

The hubs do routing, discovery, and NAT-traversal. They never see the
actual content; every payload they forward is opaque-encrypted with a
key derived from a hash the hub does not have.

The pages in this section walk through the layers of the data model,
bottom-up:

* [Objects](./architecture/objects/) -- the atomic content-addressed
  unit. A file, split into 256kB chunks, organised as a Merkle tree
  whose root hash _is_ the object's identity.
* [Collections](./architecture/collections/) -- an immutable Patricia
  tree of `path -> object` mappings. The root hash is the collection's
  identity.
* [Series](./architecture/series/) -- an Ed25519 keypair that lets a
  publisher issue signed pointers (editions) to successive
  collections over time.
* [Subscriptions](./architecture/subscriptions/) -- the per-node
  registration that turns "I care about this series" into eager
  fetches of new editions.
* [Autovacuum](./architecture/autovacuum/) -- how the node keeps its
  local cache bounded.

The matchmaking primitive that lets the hub broker queries without
learning the content is the **riddle**; it is introduced in the
[objects page](./architecture/objects/#riddles).

The network of hubs is itself a graph rather than a tree: any hub can
federate with any other hub by acting as if it were a node on the other
hub's network. A single query naturally terminates at a default hop
depth of 6 because each hop consumes one of the riddles in the query.
See [the network page](./architecture/network/) for the transport
details.
