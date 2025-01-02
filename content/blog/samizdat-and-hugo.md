---
title: "Tutorial: make a website with Samizdat and Hugo"
date: 2021-10-29T21:34:22-03:00
type: article
description: Learn how to deploy a static website to the Samizdat Network
---

So, let's build a site with Samizdat. Yes, Samizdat already lets you do that! Now, it will not be an e-commerce website, with customer login, big databases and the like. No, no, no, no! For that, you will still need to go through the [usual boring route](https://www.google.com/search?q=cloud+computing+providers). Here, we will build a simple _static_ website, like a blog. These are just like files in a folder that you have in your local computer. In fact, most modern browsers let you serve a site that way, directly from disk.

To help us in our journey, we will use a nifty little tool called [Hugo](https://gohugo.io/), a static website generator (actually, one of the most popular ones). So, if you don't have Hugo yet, [go get Hugo](https://gohugo.io/installation/) now and then come back here! Hugo, when you boil it down to the basics, is a program that takes a bunch of [Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) files and builds all the pages of your blog from them, adding style and structure along the way. The result is, unfortunately, just a folder full of HTML files.

To create an actual website out of this, you would upload this file to [_someone_](https://netlify.com) and this _someone_ would run a program that distributes your HTML pages to whole world via a _protocol_, called HTTP. This is the usual way we do it nowadays, at least. With SAMIZDAT, things are different. You just _export_ your files to your local Samizdat client and the Samizdat network does the rest for you. Of course, there is no magic trick here. If _nobody_ is actively waiting for your files and you just shut down your computer, your content will be utterly unavailable. But this is a story for another time; we are getting way ahead of ourselves here!

First, the basics.


## Setting up a new project

Create a new folder in your computer in your favorite spot. Call it `singalong_blog`. Then, use your preferred command line interface and navigate to that folder. We are now ready to start.

First, let's create a new Hugo project in this folder. That can be accomplished by the following command:
```sh
hugo new site .
```
If you now list the contents of the folder, you will see that some new files and subfolders appeared. This is the structure of a fresh new, clean slate Hugo project.

Now, for the Samizdat part. Just as we have created a Hugo project, we need to create a Samizdat project on top of that:
```sh
samizdat init
```
This creates _two_ important new files: `Samizdat.toml` and `.Samizdat.priv` (this second file starts with a dot, so it's "hidden". You might not see it without `ls -a` on Linux or Mac). We will spend more time on these files later on. You will also be greeted by the following perturbing message:
```
NOTE: Your private key for this project is 

        jWb7KO8J_tIdOwSgV2AYIl90zma3QreB-Lo3aDR3rjk
        

Store it somewhere safe! (you were warned)
```
As it states, this is the private key for your project. It is stored in `.Samizdat.priv` if you don't want to store it "somewhere safe" right away. However, it is the secret that will be used to _deploy_ your content to Samizdat. Lose the key and you will not be able to update your website ever again. It will be frozen in its final state from the time you lose your keys. And no, there is no "recover password" button for you to click in desperation. It's just gone. So please, by all means, store it somewhere safe (a password manager is a good candidate).


## Adding some content

Hugo deserves a tutorial on its own and indeed there is [one](https://gohugo.io/getting-started/quick-start/) readily available with much more detail that I can provide here. Since the objective of this tutorial is not to create a beatiful new Hugo site, let's do it the quick-and-dirty way, skipping all the fancy bells and whistles and keeping to the bare minimum.

First, we need to get a _theme_ for Hugo to work. There are plenty of flashy and fancy themes out there, but we will use Archie for our project. To get Archie, just run the following code:
```sh
cd themes
git clone https://github.com/athul/archie.git
```

Then, we need to configure Hugo's `config.toml`. Just substitute whatever is there with this:
```toml
baseURL = '~'
languageCode = 'en-us'
title = 'My New Hugo Site'
theme = "archie"
```

<div class="alert alert-info mt-4">
    The <code>baseURL</code> property for a Samizdat site should always be <code>~</code>. For more information on what that means, see <a href="~/docs/developing-with-samizdat/directory-structure/">here</a>.
</div>

Now, we are ready to _actually_ add some content. In hugo, content goes into the `content` folder. Let's create a blog post, then! Copy the following (rather terse) blog to `content/posts/my-post.md`:
```markdown
---
title: Sample post
description: My first post
date: 2024-10-01
---

We all love dear leader [Pooh][1]! May his pot be ever full of "hunny".

[1]: https://en.wikipedia.org/wiki/Censorship_of_Winnie-the-Pooh_in_China
```

To see that everything is working as expected, run `hugo serve` and check if you see a barebones homepage with link to our post.

## Interactive build with `samizdat watch`

Samizdat can deploy your content in your local client for you to play around before commiting your content to the network. As seen above, Hugo also has such capability with `hugo serve`, but it will serve via vanilla HTTP; it has no knowledge of all this Samizdat thingamajig. Since we need to know how our content will work as part of the Samizdat network (which is ever so slightly different from vanilla HTTP), it's no good to us. Therefore, we need to use the subcommand `samizdat watch`.

This subcommand runs continuously waiting for changes in the project folder and, when it finds one, triggers a build command that will create a new version of the website. The source folder for the rendered pages as well as the build command are configured in `Samizdat.toml`, in the `[build]` section. Since Hugo by default outputs all pages and files to a folder called `public`, our `[build]` section should look something like this:
```toml
[build]

# the folder that contains all the data for the website
base = "public"
# the build command
run = "rm -rf public && hugo"
```

You may go ahead and substitute the default `[build]` section that was created by `samizdat init` and copy the one above in its place. 