---
title: "Autovacuum"
date: 2021-10-29T00:13:00-03:00
type: docs
menu:
    docs:
        parent: "Architecture"
        weight: 60
---

# The autovacuum system

A SAMIZDAT node is, among other things, a participating cache for the
rest of the network. Every object you fetch sticks around on your
disk and is served back out to anyone who asks for it, which is great
for the network and slightly less great for your free space. The
**vacuum** subsystem is what keeps that cache bounded.

## Why the node needs vacuum

Every node has a storage budget set by the `max_storage` field in
`node.toml`, expressed in megabytes. Two kinds of content count
against the budget very differently:

* **Bookmarked content** is content the node operator has decided is
  valuable: your own series' editions, content you have explicitly
  pinned, objects referenced by series you subscribe to. Vacuum will
  never evict bookmarked content. If your bookmarks already exceed
  `max_storage`, you will simply run over budget.
* **Disposable cached content** is everything else: bytes that
  happened to flow through your node because you visited a page or
  helped serve a request. Vacuum is free to evict any of this when
  the total storage gets near the budget.

The distinction is tracked per-object in a refcount-style table; see
`node/src/models/bookmark.rs` for the on-disk encoding.

## What vacuum does

Vacuum runs in two passes.

The eviction pass walks the object-statistics table, ranks each object
by a usefulness score, and removes the least-useful disposable
objects (heap-ordered, smallest usefulness popped first) until total
storage is back under `max_storage`. Anything bookmarked is skipped
in this loop; if vacuum runs out of disposable objects before getting
under budget, it reports `Insufficient` and leaves the rest alone.
See `node/src/vacuum.rs` for the exact eviction policy.

The garbage-collection pass cleans up the chunk layer underneath the
object layer. Orphan chunks (chunks whose refcount has dropped to
zero) get deleted, and dangling collection items whose backing object
no longer exists get pruned. There is also a startup-only sweep that
deletes chunks left behind by imports that crashed mid-flight; the
refcount machinery that backs this lives in the
`CreateChunkRefCount` migration in `node/src/db/migrations.rs`.

A daemon loop in `run_vacuum_daemon` paces the passes adaptively so
vacuum never takes more than a configurable share (currently 5%) of
the node's wall-clock time.

## Manual vacuum

If you do not want to wait for the daemon's next pass, the CLI
exposes a one-shot trigger:

```sh
samizdat vacuum
```

This runs a single round of the same eviction-plus-GC logic the
daemon uses and prints whether it succeeded in getting under budget,
failed to (because too much is bookmarked), or did not need to do
anything in the first place.
