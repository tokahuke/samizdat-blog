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
      <a class="nav-link" id="btn-linux" data-toggle="tab" href="#install-node-linux">Linux</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="btn-macos" data-toggle="tab" href="#install-node-macos">MacOS</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="btn-windows" data-toggle="tab" href="#install-node-windows">Windows</a>
    </li>
  </ul>
  <div class="tab-content">
  <div class="tab-pane" id="install-node-linux" role="tabpanel">
      <p>
        To install Samizdat Node (and the Samizdat CLI) in your preferred linux distribution, you
        can use our one-line installation script by copying and pasting the following code in your
        command line:
      </p>

<<<<<<< HEAD
  <div class="pre-container">
  <button type="button" class="btn btn-primary pre-overlay" style="">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
</svg>
  </button>
  <pre class="template-origin"><code>curl -Ls ${origin}/_series/{{< samizdat_public_key >}}/install-latest.sh | sudo bash</code></pre>
  </div>
=======
<pre class="template-origin"><code>curl -Ls ${origin}/_series/{{< get_samizdat_public_key >}}/node/x86_64-unknown-linux-gnu/install.sh | sudo bash</code></pre>

  </div>

  <div class="tab-pane" id="install-node-macos" role="tabpanel">
      <p>
        To install Samizdat Node (and the Samizdat CLI) in your fancy MacOS, we offer you our very own <code>homebrew</code> package (a.k.a formula):
      </p>

<pre class="template-origin"><code>brew tap tokahuke/samizdat         # add our tap
brew install samizdat              # install samizdat
sudo brew services start samizdat  # make sure you have Brew Services installed
</code></pre>

>>>>>>> e82cb14d09bdca50eaa12c4bfed9ffac9735f122
  </div>

  <div class="tab-pane" id="install-node-windows" role="tabpanel">
    <p>Click on the big friendly button:</p>
    <div class="text-center">
      <a href="#" class="btn btn-primary btn-lg disabled" role="button" aria-disabled="true">Download installer <em>(soon)</em> </a>
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
      A public IP (preferably both v4 and v6) address associated to your machine. If you use a cloud platform, this is as simple as checkig a box, if at all.
    </li>
    <li>A Linux distribution installed in your machine.</li>
  </ul>

  <p>If you have checked all the boxes, just run the following code (as root!):</p>
  <div class="pre-container">
  <button type="button" class="btn btn-primary pre-overlay" style="">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
</svg>
  </button>
  <pre class="template-origin"><code>curl ${origin}/_series/{{< get_samizdat_public_key >}}/latest/hub/x86_64-unknown-linux-gnu/install.sh | sudo bash</code></pre>

</main>
</div>


<script>
  let os = "unknown";
  if (navigator.appVersion.indexOf('Win') != -1) os = 'windows';
  if (navigator.appVersion.indexOf('Mac') != -1) os = 'macos';
  if (navigator.appVersion.indexOf('X11') != -1) os = 'linux';
  if (navigator.appVersion.indexOf('Linux') != -1) os = 'linux';

  let currentButton = document.querySelector(`#btn-${os}`);
  let currentActive = document.querySelector(`#install-node-${os}`);
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

<<<<<<< HEAD
  document.querySelectorAll(".pre-container").forEach(el => {
    const copyButton = el.querySelector("button.pre-overlay");
    const content = el.querySelector("pre").textContent.replace('${origin}', window.origin);
    copyButton.addEventListener("click", (e) => {
      navigator.clipboard.writeText(content);
    });
  });
=======
  currentActive.classList.add("show");
  currentActive.classList.add("active");
  currentButton.classList.add("active");
>>>>>>> e82cb14d09bdca50eaa12c4bfed9ffac9735f122
</script>
