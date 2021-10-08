+++
title = "Get Samizdat Today"
description = "Download and install your own Samizdat node in you computer, be it Windows, MacOS or Linux."
date = 2021-08-29T13:43:38-03:00
weight = 20
draft = false
bref = ""
toc = true
+++

{{< rawhtml >}}

<div class="message focus" data-component="message">
  All code under the Samizdat Project is Free Software and is licensed to any individal or organization under the AGPLv3 license. You are free to run, study, alter and redistribute the software as you wish, as long as you abide by the terms of the aforementioned license. 
  <span class="close small"></span>
</div> 

<h3 class="section-head">Samizdat Node</h3>


<p>Samizdat Node allows you to view and also publish content in the Samizdat Network. If you are an end user or publisher, this is the program for you! Follow the instructinons below to install 
</p>

<nav class="tabs" data-component="tabs">
  <ul>
    <li class="active"><a href="#install-node-linux">Linux</a></li>
    <li><a href="#install-node-windows">Windows</a></li>
    <li><a href="#install-node-macos">MacOS</a></li>
  </ul>
</nav>

<div id="install-node-linux">
  <p>To install Samizdat Node (and the Samizdat CLI) in your preferred linux distribution, you can use our one-line installation script by copying and pasting the following code in your command line:</p>

<pre class="template-origin">
curl -Ls ${origin}/_series/{{< samizdat_public_key >}}/install-latest.sh | sudo sh
</pre>
</div>

<div id="install-node-windows">
  <p>Click on the big friendly button:</p>
  <div style="text-align: center">
    <a href="#" class="button big" role="button">Download Samizdat Node for Windows (x64)</a>
  </div>
</div>

<div id="install-node-macos">
  <p>Click on the big friendly button:</p>
  <div style="text-align: center">
    <a href="#" class="button big" role="button">Download Samizdat Node for MacOS</a>
  </div>
</div>

<div style="padding: 1em"></div>


<div class="message" data-component="message">
  <h5>Note</h5>
  Please note that this is still a proof of concept implementation. So three caveats are in place:

  <ol style="padding-top: 0.5em">
    <li>Don't rely on the availability of the network or of your content; have alternatives in place.</li>
    <li>Expect frequent breaking changes.</li>
    <li>Expect vulnerabilities. Do not use the network for sensitive content yet.</li>
  </ol>

  <span class="close small"></span>
</div>

<div style="padding: 1em"></div>


<h3 class="section-head">Samizdat Hub</h3>

If you want to work for the cause, welcome aboard! To serve a Samizdat Hub, you will need to have

<ul>
  <li>Access to some computing resource that can be up 24/7, such as a Desktop server or a VM provisioned by a cloud platform. You can have your own for as little as US$5 per month. </li>
  <li>A public IPv6 address associated to your machine. If you use a cloud platform, this is as simple as checkig a box, if at all.</li>
  <li>A Linux distribution installed in your machine.</li>
</ul>

<p>If you have checked all the boxes, just run the following code (as root!):</p>

<pre class="template-origin">
curl ${origin}/_series/{{< samizdat_public_key >}}/hub-install-latest.sh | sudo sh
</pre>

And that is it! It should be up and running. You can learn how to maintain your hub <a href="#">in the documentation</a>.


<script>
  document.querySelectorAll(".template-origin").forEach(el => {
    el.textContent = el.textContent.replace('${origin}', window.origin)
  });
</script>

{{< /rawhtml >}}
