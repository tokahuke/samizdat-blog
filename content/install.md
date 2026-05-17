---
title: "Install"
date: 2021-10-20T09:54:58-03:00
type: bare
---

# Get SAMIZDAT Today

Download and install your own Samizdat node in you computer, be it Windows, MacOS or Linux.

<aside class="note">
All code under the Samizdat Project is Free Software and is licensed to any individal or
organization under the AGPLv3 license. You are free to run, study, alter and redistribute
the software as you wish, as long as you abide by the terms of the aforementioned license.
</aside>

## Samizdat Node

Samizdat Node allows you to view and also publish content in the Samizdat Network. If you are an end user or publisher, this is the program for you! Follow the instructinons below to install.

<div class="os-tabs">
<div class="os-tabs-nav" role="tablist"><button type="button" class="tab-btn" id="btn-linux" data-target="#install-node-linux" role="tab" aria-selected="false" aria-controls="install-node-linux">Linux</button><button type="button" class="tab-btn" id="btn-macos" data-target="#install-node-macos" role="tab" aria-selected="false" aria-controls="install-node-macos">MacOS</button><button type="button" class="tab-btn" id="btn-windows" data-target="#install-node-windows" role="tab" aria-selected="false" aria-controls="install-node-windows">Windows</button></div>
<div class="os-tabs-panels">
<div class="tab-panel" id="install-node-linux" role="tabpanel" aria-labelledby="btn-linux" tabindex="0"><p>To install Samizdat Node (and the Samizdat CLI) in your preferred linux distribution, you can use our one-line installation script by copying and pasting the following code in your command line:</p><div class="pre-container"><button type="button" class="pre-overlay copy-btn" aria-label="Copy to clipboard">copy</button><pre class="template-origin"><code>curl -Ls ${origin}~/get-samizdat/latest/x86_64-unknown-linux-gnu/node/install.sh \
  | sudo bash</code></pre></div></div>
<div class="tab-panel" id="install-node-macos" role="tabpanel" aria-labelledby="btn-macos" tabindex="0"><p>To install Samizdat Node (and the Samizdat CLI) in your fancy MacOS, we offer you our very own <code>homebrew</code> package (a.k.a formula):</p><div class="pre-container"><button type="button" class="pre-overlay copy-btn" aria-label="Copy to clipboard">copy</button><pre class="template-origin"><code>brew tap tokahuke/samizdat           # add our tap
brew install samizdat                # install samizdat
sudo brew services restart samizdat  # make sure you have Brew Services installed
brew postinstall samizdat            # configure your node after the service is up
</code></pre></div></div>
<div class="tab-panel" id="install-node-windows" role="tabpanel" aria-labelledby="btn-windows" tabindex="0"><p>Click on the big friendly button:</p><p><a href="${origin}/get-samizdat/latest/x86_64-pc-windows-gnu/node/samizdat-installer.exe" class="btn-arrow has-origin">Download installer</a></p></div>
</div>
</div>

After you finish the installation, you may want to visit our [getting started](/docs/getting-started) page to get up-to-speed with SAMIZDAT.

<aside class="note">

### Note

Please note that this is still a proof of concept implementation. So three caveats are in place:

- Don't rely on the availability of the network or of your content; have alternatives in place.
- Expect frequent breaking changes.
- Expect vulnerabilities. Do not use the network for sensitive content yet.

</aside>

## Samizdat Hub

If you want to work for the cause, welcome aboard! To serve a Samizdat Hub, you will need to have

- Access to some computing resource that can be up 24/7, such as a Desktop server or a VM provisioned by a cloud platform. You can have your own for as little as US$5 per month.
- A public IP (preferably both v4 and v6) address associated to your machine. If you use a cloud platform, this is as simple as checkig a box, if at all.
- A Linux distribution installed in your machine.

If you have checked all the boxes, just run the following code (as root!):

<div class="pre-container">
  <button type="button" class="pre-overlay copy-btn" aria-label="Copy to clipboard">copy</button>
  <pre class="template-origin"><code>curl -Ls ${origin}/~get-samizdat/latest/x86_64-unknown-linux-gnu/hub/install.sh
  | sudo bash</code></pre>
</div>

