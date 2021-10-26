---
title: "Getting Started"
date: 2021-10-22T22:58:39-03:00
menu: docs
---

# Getting started with SAMIZDAT

Once you [get Samizdat up and running](/install), it is time to get to know how
Samizdat works. Simply put, Samizdat Node works as a proxy between your browser
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

<a class="samizdat-link">docs/getting-started</a>

Got here? To this _exact_ page? Congratulations! You were able to fetch this
Samizdat documentation page from the Samizdat Network itself. How meta is that!?

So... what is _actually_ going on here? 