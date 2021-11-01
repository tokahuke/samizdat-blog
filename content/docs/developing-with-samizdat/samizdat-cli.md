---
title: "Samizdat CLI"
date: 2021-10-29T21:52:27-03:00
type: docs
menu:
    docs:
        parent: "Developing with Samizdat"
        weight: 10
---

# The SAMIZDAT CLI

If you [installed SAMIZDAT node](/install) using the default script, you also have installed the SAMIZDAT CLI application alongside it. This application allows you to interact with your node in more meaningful ways than only typing URLs for it serve. It also has utilities to help you to develop applications for SAMIZDAT. In this article, we will cover the basic comands with which you should interact most often during a typical development cycle. For a detailed description of the avaliable commands and their usage, just type `samizdat --help` in your command line.

## The basics: upload a new object

To upload a new object, it is just as easy as typing:
```sh
samizdat upload path/to/your.file
```
This will upload a new object to your local node and will return the _hash_ of the object in your standard output. From this point on, the object is part of the content in the SAMIZDAT network.

However simple this procedure is, it does not scale even for a small personal blog. For this, you will need to manage a _series_ and the content that goes in each edition. This is better done with a _project_ and is normally the workflow used by most Web development tools. 

## Setting up a new project

To create a new SAMIZDAT project in an empty or existing project, type the following command:
```sh
samizdat init
```
This will create two files in the current directory:
1. `Samizdat.toml`: a manifest indicating how to build the project for SAMIZDAT. Among other things, it will contain _two_ series tokens: one for release and one for build/debug.
2. `.Samizdat.priv`: this is also a TOML file, but it contains the private keys for the series described in the manifest. Treat these as credentials and _exclude them_ from your `.gitignore` file if you are working with Git. Keep this file somewhere _else_ safe.

If you open your `Samizdat.toml` file, you will see indicated by the comments a key to define the output folder from where the built assets should be uploaded to the network. This is, by default, `./dist`, which is also the default of some popular tools, such as Webpack. If you are using any other name, just override this key with the build folder you are using. For more information on the manifest format, see [the section on the format](../samizdat-manifest). 

## Importing an existing project

If you already have an existing project that uses SAMIZDAT (acquired via `git clone`, for example), you will have to obtain the corresponding `.Samizdat.priv` file, even if it just contains the development keys. After you have both files in the same directory, you can import the series keys into you local node by typing the following command:
```sh
samizdat import
```
After that, you will be able to build (and optionally deploy) the current project on the network.

## Creating a new edition

After you have created your content and are happy with it, you can push a new edition to your series with the command
```sh
samizdat commit
```
This will scan the folder specified in your `Samizdat.toml` file recusrively and upload all files to your node. It will then create a collection matching the exact structure of the output folder and use this collection to create a fresh-new edition for the series. 

Please note that this, like _all_ other build commands in the SAMIZDAT CLI refer to the _build_ series and **not** to the _release_ series. To commit to the _release_ series (if you are 110% that that is what you want; commits are irreversible!), just do
```sh
samizdat commit --release
```
instead.

## Develop-test cycle

For rapid iterative develop-test-learn cycle, the SAMIZDAT CLI has a `watch` command that will look for changes in the current directory and will rebuild the project after every change. This command will run indefinitely unitil the process is killed. To watch a folder, just do
```sh
samizdat watch
```
Normally, to rebuild a project, some code needs to be run every time (e.g., to compile SASS assets). For that, you will need to set a build script apropriately in your `Samizdat.toml` manifest. See [the section on the format](../samizdat-manifest) for more details on that.

