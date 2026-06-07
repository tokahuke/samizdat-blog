---
title: "Subscriptions"
date: 2021-10-29T00:12:00-03:00
type: docs
menu:
    docs:
        parent: "Architecture"
        weight: 50
---

# Subscriptions

A _subscription_ is a node-local registration that says "I care about
series X; please keep me up to date." It is what turns the pull-style
resolution machinery into something closer to a feed reader: instead
of polling, your node hears about new editions as they happen and
pulls them eagerly so they are warm in the local cache by the time
you actually open them.

## What is a subscription

A subscription is just a row in your node's database: a series public
key plus a few flags about how aggressively to fetch. Subscriptions
are node-local, like nicknames; the hub never sees the list of series
you subscribe to. What the hub _does_ see is a steady stream of riddle
queries which, in aggregate, would let a sufficiently-motivated
operator infer interest, but never the series identity in clear.

Subscribing to your own series is automatic on `samizdat init`; you
do not need to subscribe to a series you own.

## Announcement and broadcast

When a publishing node persists a new edition, it sends an
**announcement** RPC to every hub it is connected to. The
announcement carries the edition (signed by the series keypair) inside
an envelope encrypted with a key derived from the series public key.
The hub can route the envelope but cannot read it.

Each hub then **broadcasts** the opaque envelope to every connected
peer. A subscribed node recognises the envelope (because it knows the
key derivation), decrypts it, verifies the signature against the
series public key it expects, and then immediately kicks off the
normal edition-resolution flow to download the new collection's
objects.

The same mechanism crosses the hub federation: a hub that received an
announcement from a node turns around and forwards it to its partner
hubs as part of the broadcast, so a subscriber several hops away in
the graph still finds out.

## Managing subscriptions

The `samizdat` CLI exposes a `subscription` subcommand for managing
the list. The verbs are the familiar ones:

* `samizdat subscription ls` lists the series your node currently
  subscribes to, together with their node-local nicknames if any.
* `samizdat subscription new <series-public-key>` adds a new
  subscription. From this point on your node will eagerly fetch new
  editions for that series.
* `samizdat subscription rm <series-public-key-or-nickname>` removes a
  subscription. Already-cached editions stay around until vacuum gets
  to them, but no further announcements will be acted on.

Subscriptions interact with [autovacuum](../autovacuum/): objects
referenced by a subscribed series' latest edition are bookmarked
through the edition's `Reference` counter, so vacuum will not evict
them as long as the edition is current.
