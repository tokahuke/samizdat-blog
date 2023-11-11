---
title: "Objects"
date: 2021-10-29T00:09:00-03:00
type: docs
menu:
    docs:
        parent: "Architecture"
        weight: 20
---


# Objects

Objects for the basis of how content is structure in the SAMIZDAT network. Simply speaking, an object corresponds to a file, a chunk of binary data, such as a web page, an image or a video. However, differently from the files in your computer, objects don't have names. Instead, an object is uniquely identifiable by a _hash_ value, a string of random data. Since we use a decent hashing algorithm (SHA3, 224 bits), it's impossible for someone to guess _anything_ about the nature of the object by its hash or purposefully create two objects with the same hash. In this page, we explain how objects are managed by SAMIZDAT.

## Object structure format

Objects are not the atomic unit of the SAMIZDAT network. Each object is further divided into smaller parts, called _chunks_. In fact, the object hash is not simply the hash of all the contents of the file, but the root hash of a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) made of all the chunks.

Dividing an object in chunks has some neat advantages:
1. Quicker transfer of data, just like Torrent does it. One does not even need to have the full object stored in order to serve it. Unfortunately, this is not yet implemented.
2. Reuse of the same information across very similar objects. This allows for slightly more efficient storage in some cases.

By default, each object chunk is sized at 256kB. However, chunks of arbitrary sizes are allowed in SAMIZDAT, even for the same object.

### Header



## Object resolution and transfer

Since objects are uniquely identified by their hash, you can request them directly by accessing the following URL:
```
http://localhost:4510/_objects/{{ hash }}
```
Just substitute `{{ hash }}` by the relevant object hash. When you access this URL, the local SAMIZDAT node will look for it in its local database. If it is there, then hooray! You will receive that object in just a jiffy.

However, if the object is not found, the node will have to query the hubs it is connected to, which will broadcast the request to _some_ selected nodes. Unfortunately, broadcasting which object you want to the whole network to hear is a very bad idea, especially if _someone_ thinks that the object's contents are _naughty_ and might give you a knock on your door. The sad reality is that object hashes, even if they _look_ like complete gibberish, are very easily to be indexed _en masse_ into a big fat database of very naughty things. To foil this _someone's_ devious plans, we need to be slightly smarter.

### Riddles

Enter riddles. Riddles in SAMIZDAT are the cryptographic equivalent of the kids game: instead of directly saying the object hash, we ask the question: "what is the piece of data that, combined with the random number X gives the hash Y?". If you know the piece of data (or happen to know it's in a small set of possibilities), it's easy to answer the riddle correctly. However, when you _don't_ have the riddle, you are left wondering.

So how does this defeat the hypothetical big fat database of very naughty things? In the database, looking for a given hash is "easy" (O(log N), where N is the number of hashes). However, with riddles this operation becomes _hard_: the only way to find the hash is by trying to answer the riddle by brute force, testing the riddle on each hash, one by one (O(N)). It's actually even worse if you consider that riddles can be randomized (because of the random number it contains). The whole tedious testing job has to be repeated not by object hash, but _by riddle_. 


## Methods on objects
