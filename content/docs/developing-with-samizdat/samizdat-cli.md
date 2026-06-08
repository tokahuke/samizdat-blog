---
title: "Samizdat CLI"
date: 2021-10-29T00:02:00-03:00
type: docs
menu:
    docs:
        parent: "Developing with Samizdat"
        weight: 10
---

# The SAMIZDAT CLI

If you [installed SAMIZDAT node](/install) using the default installer, you also
have installed the SAMIZDAT CLI application alongside it. This application
allows you to interact with your node in more meaningful ways than only typing
URLs for it to serve. It also has utilities to help you to develop applications
for SAMIZDAT. In this article, we will cover the basic commands with which you
should interact most often during a typical development cycle. For a detailed
description of the available commands and their usage, just type
`samizdat --help` in your command line.

## The basics: upload a new object

To upload a new object, it is just as easy as typing:
```sh
samizdat upload path/to/your.file
```
This will upload a new object to your local node and will return the _hash_ of
the object in your standard output. From this point on, the object is part of
the content in the SAMIZDAT network.

However simple this procedure is, it does not scale even for a small personal
blog. For this, you will need to manage a _series_ and the content that goes in
each edition. This is better done with a _project_ and is normally the workflow
used by most Web development tools.

## Setting up a new project

To create a new SAMIZDAT project in an empty or existing project, type the
following command:
```sh
samizdat init
```
You can optionally pass `--nickname <name>` to set a node-local nickname for
the project's series owner. If omitted, the nickname defaults to the current
directory's name.

This will create two files in the current directory:
1. `Samizdat.toml`: a manifest indicating how to build the project for SAMIZDAT.
   Among other things, it will contain _two_ series tokens: one for release and
   one for build/debug.
2. `.Samizdat.priv`: this is also a TOML file, but it contains the private keys
   for the series described in the manifest. Treat these as credentials and
   _add them_ to your `.gitignore` file if you are working with Git. Keep this
   file somewhere _else_ safe.

If you open your `Samizdat.toml` file, you will see indicated by the comments a
key to define the output folder from where the built assets should be uploaded
to the network. This is, by default, `./dist`, which is also the default of
some popular tools, such as Webpack. If you are using any other name, just
override this key with the build folder you are using. For more information on
the manifest format, see [the section on the format](../samizdat-manifest).

## Importing an existing project

If you already have an existing project that uses SAMIZDAT (acquired via
`git clone`, for example), you will have to obtain the corresponding
`.Samizdat.priv` file, even if it just contains the development keys. After you
have both files in the same directory, you can import the series keys into your
local node by typing the following command:
```sh
samizdat import
```
After that, you will be able to build (and optionally deploy) the current
project on the network.

## Creating a new edition

A plain `samizdat commit` publishes to the `[debug]` series declared in your
manifest, not to the public one. This is on purpose: the public `[series]` is a
"sign once and it is out there" operation, and you almost never want that
firing every time you save a file. To push to the public series, you have to
opt in explicitly with `--release`.

After you have created your content and are happy with it, push a new edition
to your debug series with the command
```sh
samizdat commit
```
This will scan the folder specified in your `Samizdat.toml` file recursively
and upload all files to your node. It will then create a collection matching
the exact structure of the output folder and use this collection to create a
fresh-new edition for the series.

Once the commit lands, the content is reachable locally at:
```
http://series-<base32-of-public-key>.localhost:4510/path/
```
where `series-<base32-of-public-key>` is the `host_label` column of
`samizdat series ls`. `samizdat commit` prints the full URL in the
post-commit row. The same shape works for both debug and release series;
only the public key changes.

To share with friends, use the public proxy form (same typed-subdomain
shape, on the proxy's domain):
```
https://series-<base32-public-key>.hubfederation.com/path/
```

When you are 110% sure that you want to push to the _release_ series (commits
are irreversible!), just do
```sh
samizdat commit --release
```
instead.

## Develop-test cycle

For rapid iterative develop-test-learn cycle, the SAMIZDAT CLI has a `watch`
command that will look for changes in the current directory and will rebuild
the project after every change. This command will run indefinitely until the
process is killed. To watch a folder, just do
```sh
samizdat watch
```
Like `commit`, `watch` publishes to the `[debug]` series; there is no
`--release` variant of `watch`, because nobody wants to ship a release on every
keystroke.

Normally, to rebuild a project, some code needs to be run every time (e.g., to
compile SASS assets). For that, you will need to set a build script
appropriately in your `Samizdat.toml` manifest. See
[the section on the format](../samizdat-manifest) for more details on that.
