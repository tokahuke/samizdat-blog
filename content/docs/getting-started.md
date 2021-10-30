---
title: "Getting Started"
date: 2021-10-22T22:58:39-03:00
menu:
    docs:
        weight: 2
---

# Getting started with SAMIZDAT

Once you [get Samizdat up and running](/install), it is time to get to know how
Samizdat works!

## Gateway to the network

Simply put, Samizdat Node works as a proxy between your browser
(Firefox, Chrome, Safari, etc...) and the Samizdat Network. It spawns a _local_
site in your own computer. According to the Rules of the Internet©, this site 
is called [http://localhost:4510](http://localhost:4510). 

Ok... it is not your run-off-the-mill site name, such as
[https://www.google.com](https://www.google.com) or
[https://web.whatsapp.com](https://web.whatsapp.com),
but it is as valid a name. `localhost` is a special name that means "the site
inthis computer" (since it is where Samizdat node is running, after all) and
`4510` is the number of a non-standard TCP port. I hope you have gotten
[the joke](https://en.wikipedia.org/wiki/Fahrenheit_451).

Let's try it then! In case you didn't notice, this very page is hosted in the 
Samizdat Network. If you can acess it without installing Samizdat Node,
chances are that you are accessing it via an _external_ proxy, such as 
[https://proxy.hubfederation.com](https://proxy.hubfederation.com). This is not
the _fun_ way to use Samizdat (and it _can_ be a vulnerability). If you have
Samizdat Node installed, you can access this very same page by going to this
page:

> <a class="samizdat-link">docs/getting-started</a>

Got here? To this _exact_ page? Congratulations! You were able to fetch this
Samizdat documentation page from the Samizdat Network itself. How meta is that!?

So... what is _actually_ going on here? 


## Content addressing: what's in a name?

If you pay close attention to any regular old URL in the regular Web, you will
see that it is comprised of at least two parts: a _server_ and a _route_. For
example, in [https://mail.google.com/mail](https://mail.google.com/mail),
`mail.google.com` is the server and `/mail` is the route. This means that there
is a _physical_ computer in some Google warehouse somewhere that answers to you
as `mail.google.com`. It its the _name_ of this computer. The _route_, `/mail`
is just the name of a resource (a _file_) in that computer. Everything a (valid)
URL is saying is: "there is a file in a computer". This is called _location_
addressing, because you reach the content via its location.

SAMIZDAT works with something called _content_ addressing, which is fundamentally
different from location addressing. In _content_ addressing, URLs point to the
_content_ directly, regardless of location. For _each_ file in the network, a
unique name is created that is based _solely_ on the content of the file. This
is called a [_hash_](https://en.wikipedia.org/wiki/Hash_function). For example,
this is a link of a picture whose hash is `-u3S2coR1vjKwLh6mJ8LOHMY3vnwgCrCsrmt_g`:

<a href="http://localhost:4510/_objects/-u3S2coR1vjKwLh6mJ8LOHMY3vnwgCrCsrmt_g">http://localhost:4510/_objects/-u3S2coR1vjKwLh6mJ8LOHMY3vnwgCrCsrmt_gw</a>

This name is _intrinsic_ to this picture and is guaranteed to be unique.

Now, the _key_ idea behind content addressing over location addressing is that
whereas the file [https://mail.google.com/mail](https://mail.google.com/mail)
_has_ to be in Google's computer and Google has complete control over it, the
above link is _not_ bound to any particular device and therefore _no one_
controls it. In fact, many nodes in the network may have copies of the
file and any of these nodes can serve it to you. Even better, now that _you_
have the file in your local node (if you have clicked the link above), you are
automatically serving it to others.

Don't worry, though! The underlying protocol makes sure that _only those_ who know the hash (because they have come about a link) can know the _contents_ of the file. Besides, all transactions are carried out anonymously (actually, [pseudonymously](https://en.wikipedia.org/wiki/Pseudonym)) so that your privacy is preserved. Of course, SAMIZDAT does not preclude the use of proxies, VPNs or, better still, things like [Tor](https://en.wikipedia.org/wiki/Tor_(network)).

## Ergonomics

Even though _content addressing_ using hashes is great, it is impossible to have a comfortable web experience using _only_ hashes. There are two reasons for this:

1. Hashes are just unintuitive blobs of letters; it is not possible to structure content systematically. More simply put, hashes are _ugly_.
2. You cannot have cyclic links! That is, if page A has a link to page B, page B cannot have a link to page A. Imagine not beign able to link back from your blog post to your homepage!
    * This is not easy to see at first, but has to do with the [cryptographic guarantees](https://en.wikipedia.org/wiki/Preimage_attack) of hash functions.

To solve this, SAMIZDAT has the concept of _collections_. Collections work just like folders in your computer: you can put your files into folders and subfolders so that your content is organized in trees. Incidentally, URL routes also work the same way. Collections work using these nice data structures called [Merkle trees](https://en.wikipedia.org/wiki/Merkle_tree). These trees allow us to verify that a given _hash_ corresponds to the right path inside a collection. After all, beign duped in the Internet can have harsh consequences. As an added bonus, each collection is uniquely identified by a single hash, just like objects, _no matter the size_. To accessing a collection item from your browser is very similar to accessing an object. For example, that picture I showed you can also be accessed by the link

<a href="http://localhost:4510/_collections/pKxHqTFD_Oezb3q7WKKJz6u2_NTwEdKSwAJH0w/example-object.png">http://localhost:4510/_collections/pKxHqTFD_Oezb3q7WKKJz6u2_NTwEdKSwAJH0w/example-object.png</a>

Now, the picture has a name: `example-object.png`, inside collection `pKxHqTFD_Oezb3q7WKKJz6u2_NTwEdKSwAJH0w`.

However, you will rarely see links to collections because _collections are immutable!_ Once they are built, they cannot be changed, not even a single bit. If you change the bit, the whole collection becomes another collection, with a completely and unpredictably different hash. Therefore, SAMIZDAT has also the concept of _series_.

A SAMIZDAT series is a sequence of collections, which can be advanced with a new element at any time. It works similarly to editions of a book: once the book is printed, it cannot be changed. The ink has dried and the orders have shipped. However, the author can always create a second, third and fourth version of the book, while removing old editions from print and completely disavowing them.

A series is just a cryptographically signed document containing a collection together with a timestamp, which is its publication date. There may be many signed collections floating around the SAMIZDAT network, but the SAMIZDAT node will try to use the most recent one it finds to give you the freshest content available. Please note that this is a _best-effort_ process and that you are not guaranteed to end up with the latest-and-greatest. You are also _not_ guaranteed that once you publish a new edition that the old ones will disappear from the network. It is easy to put content in the SAMIZDAT network, but it is quite a task to erase seomthing from it.

The page you accessing now is probably beign accessed using a series. If not, here is the link again as a refresher:

<a class="samizdat-link">docs/getting-started</a>

Note that the prefx now is `_series` instead of `_collections`. Now, the big blob of letters is a [public key](https://en.wikipedia.org/wiki/Public-key_cryptography) associated with the secret key used to sign new editions. This is (by now) the preferred way of retrieving content from the SAMIZDAT network and the one which will feel more familiar to most users.

You might be wondering if it is possible to remove that last blob of letters from the URL and substitute it for something small and memorable. It certainly is, but it depends on something called global consensus, something which is more in the realm of blockchains and cryptocurrencies. Don't fear: a solution is in the workings. However, big fat letters blobs will have to do, for now.

So, that's it! Happy surfing.

## TL; DR

Just go surf te Web as you normally do and SAMIZDAT will take care of the rest for you! But remember: things inside the network are referenced by _what_ they are (content addressing) and not by _where_ they are (location addressing). Even that is not a big of a deal, since the original Web experience was already created to give you this illusion. 
