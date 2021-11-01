---
title: "Install"
date: 2021-10-20T09:54:58-03:00
type: bare
---

<div class="d-flex align-items-center mb-5" style="flex-direction:column;">

<section id="hero" class="d-flex w-50 py-5" style="flex-direction: column; align-items: center;">
  <div class="pt-3"></div>

  {{< star >}}

  <h1 class="text-monospace font-weight-bold pt-4">
    Get SAMIZDAT Today
  </h1>
  <p class="pt-3 h4 w-75 text-center">
    Download and install your own Samizdat node in you computer, be it Windows, MacOS or Linux.
  </p>
  <div class="alert alert-info mt-4">
    All code under the Samizdat Project is Free Software and is licensed to any individal or
    organization under the AGPLv3 license. You are free to run, study, alter and redistribute
    the software as you wish, as long as you abide by the terms of the aforementioned license.
  </div>
</section>

<main id="content" class="w-50">
  <h2 class="text-monospace">Samizdat Node</h2>
  <p>
    Samizdat Node allows you to view and also publish content in the Samizdat Network. If you are an
    end user or publisher, this is the program for you! Follow the instructinons below to install.
  </p>

  <div id="installation-tab" class="mt-3 mb-2">
  <ul class="nav nav-pills mb-2">
    <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#install-node-linux">Linux</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#install-node-windows">Windows</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#install-node-macos">MacOs</a>
    </li>
  </ul>
  <div class="tab-content">
  <div class="tab-pane show active" id="install-node-linux" role="tabpanel">
      <p>
        To install Samizdat Node (and the Samizdat CLI) in your preferred linux distribution, you
        can use our one-line installation script by copying and pasting the following code in your
        command line:
      </p>

<pre class="template-origin"><code>curl -Ls ${origin}/_series/{{< samizdat_public_key >}}/install-latest.sh | sudo sh</code></pre>

  </div>

  <div class="tab-pane" id="install-node-windows" role="tabpanel">
    <p>Click on the big friendly button:</p>
    <div class="text-center">
      <a href="#" class="btn btn-primary btn-lg" role="button">Download Samizdat Node for Windows (x64)</a>
    </div>
  </div>

  <div class="tab-pane" id="install-node-macos" role="tabpanel">
    <p>Click on the big friendly button:</p>
    <div class="text-center">
      <a href="#" class="btn btn-primary btn-lg" role="button">Download Samizdat Node for MacOS</a>
    </div>
  </div>

  </div>
  </div>

<p>After you finish the installation, you may want to visit our <a href="/docs/getting-started">getting started</a> page to get up-to-speed with SAMIZDAT.</p>

<div class="alert alert-dark my-3">
<h3 class="font-weight-bold h4">Note</h3>
<p>Please note that this is still a proof of concept implementation. So three caveats are in place:</p>
<ul>
  <li>Don't rely on the availability of the network or of your content; have alternatives in place.</li>
  <li>Expect frequent breaking changes.</li>
  <li>Expect vulnerabilities. Do not use the network for sensitive content yet.</li>
</ul>
</div>

  <h2 class="text-monospace">Samizdat Hub</h2>

  <p>
    If you want to work for the cause, welcome aboard! To serve a Samizdat Hub, you will need to
    have
  </p>

  <ul>
    <li>
      Access to some computing resource that can be up 24/7, such as a Desktop server or a VM
      provisioned by a cloud platform. You can have your own for as little as US$5 per month.
    </li>
    <li>
      A public IPv6 address associated to your machine. If you use a cloud platform, this is as
      simple as checkig a box, if at all.
    </li>
    <li>A Linux distribution installed in your machine.</li>
  </ul>

  <p>If you have checked all the boxes, just run the following code (as root!):</p>
  <pre class="template-origin"><code>curl ${origin}/_series/{{< samizdat_public_key >}}/hub-install-latest.sh \
    | sudo sh</code></pre>

</main>
</div>


<script>
  let currentButton = document.querySelector(".nav-link.active");
  let currentActive = document.querySelector(".tab-pane.show.active");
  document.querySelectorAll(".nav-link").forEach(el => {
    el.addEventListener("click", (e) => {
      currentActive.classList.remove("show");
      currentActive.classList.remove("active");
      currentButton.classList.remove("active");

      currentButton = el;
      currentActive = document.querySelector(el.getAttribute("href"));
      
      currentActive.classList.add("show");
      currentActive.classList.add("active");
      currentButton.classList.add("active");

      e.preventDefault();
      return false;
    })
  });
</script>
