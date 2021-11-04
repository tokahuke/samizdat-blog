---
title: "The Samizdat manifest"
date: 2021-10-29T21:53:21-03:00
type: docs
menu:
    docs:
        parent: "Developing with Samizdat"
        weight: 20
---


# The `Samizdat.toml` manifest

When you create a new SAMIZDAT project with `samizdat init`, you automatically get a file in your directory called `Samizdat.toml`. This file controls how the SAMIZDAT CLI will manage the series associated with your project. This article is an overview on the file an how you can use it in your workflow.


## Profiles

The SAMIZDAT works on two profiles (i.e., modes): _build_ and _release_. This is drectly reflected in the structure of `Samizdat.toml`: there is a `series` section for release settings and a `debug` section for debug settings. SAMIZDAT isolates both kinds of builds in different series, each with its own keypair. As the name implies, `debug` builds are meant for local development only and are not for public consumption. Objects generated from the debug build are marked as `draft` and therefore are not accessible to the SAMIZDAT network. Editions are also not anounced to the public. On the other hand, `release` builds are the real-deal you expect: they _are_ open to the world and new editions are anounced (unless _explicitely_ silenced with the `--no-annouce` flag on commit).


## Profile sections: `series` and `debug`

 Both sections admit the same keys, which are:
1. The name of the _series owner_ (i.e., the public **and** private keypair).
2. The _public key_ corresponding to the target series.
3. A _time to leave_: a _suggestion_ of how much time a node should wait to poll again the network for new editions. This field is optional and defaults to the value `"1 hour"`.
    * In `debug` mode, you _can_ set this value, but it has no effect.


## The `build` section

The `build` section defines how a new edition should be built. For this, you need to specify two keys:

1. A folder containing the final structure of the contents that will form this edition under the key `"base"`.
2. An optional _build script_, which can be used to mount the output folder (e.g., running webpack or `npm run something`) under the key `"run"`. For the build script, the following environment variables are set:
    * `SAMIZDAT_RELEASE`: is set to something not empty if in `release` mode and to empty if in `debug` node.


## The `.Samizdat.priv` private manifest

Finally, together with the `Samizdat.toml`, a _second_ file is generated when you call `samizdat init`: `.Samizdat.priv`. This file contains the **private** keys corresponding to both release and debug series. Since it contains only private information, it cannot be put in the main manifest and should be kept away from version control systems such as Git (we strongly recommend you to add it to your `.gitignore`). Be careful with whom you share this file! Every person with access to its contents can create new editions of your series, essentially taking control of it irreversibly.

We will not ellaborate on the structure of the private manifest here, as there is no need to customize it. Since all it contains are the private keys, you may use it and pass it around _as is_.