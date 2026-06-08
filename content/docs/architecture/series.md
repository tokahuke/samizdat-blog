---
title: "Series"
date: 2021-10-29T00:11:00-03:00
type: docs
menu:
    docs:
        parent: "Architecture"
        weight: 40
---

# Series

A _series_ is a stable, signable identity on the SAMIZDAT network. If
collections are immutable snapshots, series are the mutable pointer
that lets a publisher say "here is my latest version" without having
to convince everyone to update a link.

## Keypairs and series owners

A series is an Ed25519 keypair. The **public key** is the network
identity of the series; it is what consumers subscribe to and what the
node hosts at `http://<base32-of-public-key>.localhost:4510/` (its own
browser origin). Anyone who can sign with the matching private key can
publish new editions; that is the entire authentication story for the
network layer.

Your own node keeps a node-local _nickname_ for each series it owns or
subscribes to (the `nickname` field in `Samizdat.toml`, or whatever
you passed to `samizdat init --nickname <x>`). The nickname is a label
your CLI uses to talk to your node; it is not visible to anyone else
and it carries no meaning across nodes. Only the public key travels on
the wire.

The private key lives in `.Samizdat.priv` on disk, mode `0o600`. Lose
it and the series is frozen forever; no recovery mechanism exists by
design.

## Editions

An _edition_ is a signed pointer from the series public key to one
specific collection at one specific moment. Concretely:

```rust
struct EditionContent {
    kind: EditionKind,   // Base or Layer
    collection: Hash,    // root of the collection
    timestamp: ...,      // when the publisher signed it
    ttl: Duration,       // suggested re-check interval
}
```

This `EditionContent` is bincode-serialised, hashed, and signed with
the series keypair, producing a `Signed<EditionContent>` that any
holder of the public key can verify.

There are two flavours:

* **Base.** A complete replacement. Looking up a path on the series
  resolves entirely through this edition's collection. New base
  editions retire the previous base.
* **Layer.** An overlay on top of the previous edition. If the path
  is present in the layer, the layer's object wins; if not, resolution
  falls through to the edition underneath. Layers are useful for
  small frequent updates that should not require re-uploading every
  asset.

## Edition item resolution and transfer

When a consumer's browser hits
`http://<base32-key>.localhost:4510/some/path/`, the local node:

1. Looks up the latest known edition for `<key>` it has cached, and
   optionally polls the hubs for a fresher one if the cached
   edition's TTL has expired.
2. Computes the locator `Hash(collection_root || some/path)` for the
   edition's collection.
3. If the underlying object is already on disk, serves it directly.
4. Otherwise, sends the locator (as a riddle, not in clear) to every
   connected hub. The hubs forward to peers; a peer that holds the
   object answers with an encrypted candidate; the asking node opens
   a QUIC connection straight to the responder and pulls the chunks.

The hub sees a riddle and a `ChannelId`. It does not see the series
public key, the path, the object hash, or the bytes. See
[objects](../objects/) for the riddle mechanics in detail.

## Announcements and subscriptions

Publication is push-style, on top of the same pull-style resolution
above. When the publishing node persists a new edition, it
**announces** it to every hub it is connected to. The announcement is
opaque-encrypted with a key derived from the series public key, so
the hub cannot learn which series just advanced.

Each hub broadcasts the announcement to its connected peers (other
nodes and partner hubs). Any node that holds a _subscription_ for
that series picks the announcement up, decrypts it, and eager-fetches
the new edition so it is ready when the user next navigates to it.
Subscriptions are entirely node-local registrations; see
[subscriptions](../subscriptions/) for the management commands.
