---
title: "Install"
date: 2021-10-20T09:54:58-03:00
type: bare
wide: true
---

<header class="page-hero">

# Get <u>SAMIZDAT</u> Today

Download and install your own Samizdat node in your computer, be it Windows, MacOS or Linux. One tool, `samizdat-up`, drives the whole thing on every OS.

</header>

{{< role-tabs >}}

{{% role-tab id="use-it" %}}

Samizdat Node lets you view and publish content on the Samizdat network. Runs on Linux, macOS, and Windows. Pick your OS.

<div class="os-tabs">
<div class="os-tabs-nav" role="tablist"><button type="button" class="tab-btn" id="btn-linux" data-target="#install-node-linux" role="tab" aria-selected="false" aria-controls="install-node-linux">Linux</button><button type="button" class="tab-btn" id="btn-macos" data-target="#install-node-macos" role="tab" aria-selected="false" aria-controls="install-node-macos">MacOS</button><button type="button" class="tab-btn" id="btn-windows" data-target="#install-node-windows" role="tab" aria-selected="false" aria-controls="install-node-windows">Windows</button></div>
<div class="os-tabs-panels">

<div class="tab-panel" id="install-node-linux" role="tabpanel" aria-labelledby="btn-linux" tabindex="0">
<p>Two commands. The first one drops the <code>samizdat-up</code> installer on your machine. The second one tells it to set up the node service.</p>
<div class="pre-container"><button type="button" class="pre-overlay copy-btn" aria-label="Copy to clipboard">copy</button><pre class="template-origin"><code>curl -fsSL ${origin}~/get-samizdat/latest/install.sh | sudo bash
sudo samizdat-up install node</code></pre></div>
<h3>Did it work?</h3>
<p>Open <a href="http://localhost:4510"><code>http://localhost:4510</code></a> in your browser. The Samizdat home should load. If it does not, see below.</p>
<h3>If something looks wrong</h3>
<ul>
<li><strong>Port 4510 already in use?</strong> Something else has it. Stop it, then <code>sudo systemctl restart samizdat-node</code>.</li>
<li><strong><code>samizdat: command not found</code>?</strong> <code>samizdat-up install node</code> drops binaries in <code>/usr/local/bin</code>. Make sure that is on your <code>$PATH</code>.</li>
<li><strong>Service will not start?</strong> <code>sudo journalctl -u samizdat-node</code> tells you why.</li>
<li><strong>Want to upgrade later?</strong> <code>sudo samizdat-up update</code>.</li>
<li><strong>Want to remove it?</strong> <code>sudo samizdat-up uninstall node</code> (or add <code>--purge</code> to also wipe data).</li>
<li><strong>Anything else?</strong> <a href="https://github.com/tokahuke/samizdat">Open an issue</a> with what you tried and what you saw.</li>
</ul>
</div>

<div class="tab-panel" id="install-node-macos" role="tabpanel" aria-labelledby="btn-macos" tabindex="0">
<p>On macOS the installer (<code>samizdat-up</code>) ships via Homebrew. After installing it, point it at the node service.</p>
<div class="pre-container"><button type="button" class="pre-overlay copy-btn" aria-label="Copy to clipboard">copy</button><pre class="template-origin"><code>brew tap tokahuke/samizdat
brew install samizdat
sudo samizdat-up install node</code></pre></div>
<h3>Did it work?</h3>
<p>Open <a href="http://localhost:4510"><code>http://localhost:4510</code></a> in your browser. The Samizdat home should load. If it does not, see below.</p>
<h3>If something looks wrong</h3>
<ul>
<li><strong>Port 4510 already in use?</strong> Something else has it. Stop it, then <code>sudo launchctl kickstart -k system/com.samizdat.node</code>.</li>
<li><strong><code>samizdat: command not found</code>?</strong> <code>samizdat-up install node</code> drops binaries in <code>/usr/local/bin</code>. Make sure that is on your <code>$PATH</code>.</li>
<li><strong>Service will not start?</strong> <code>sudo launchctl print system/com.samizdat.node</code> shows its state; the <code>stderr</code> path printed there has the daemon log.</li>
<li><strong>Want to upgrade later?</strong> <code>brew update; brew upgrade samizdat</code> upgrades the installer; <code>sudo samizdat-up update</code> upgrades the daemons.</li>
<li><strong>Want to remove it?</strong> <code>sudo samizdat-up uninstall node</code> (or add <code>--purge</code>), then <code>brew uninstall samizdat</code>.</li>
<li><strong>Anything else?</strong> <a href="https://github.com/tokahuke/samizdat">Open an issue</a> with what you tried and what you saw.</li>
</ul>
</div>

<div class="tab-panel" id="install-node-windows" role="tabpanel" aria-labelledby="btn-windows" tabindex="0">
<p>Download <code>samizdat-up.exe</code>, save it in your <code>PATH</code>, then run it from an <strong>elevated</strong> PowerShell prompt:</p>
<p><a href="${origin}/get-samizdat/latest/x86_64-pc-windows-gnu/samizdat-up/samizdat-up.exe" class="btn-arrow has-origin">Download samizdat-up.exe</a></p>
<div class="pre-container"><button type="button" class="pre-overlay copy-btn" aria-label="Copy to clipboard">copy</button><pre class="template-origin"><code>samizdat-up.exe install node</code></pre></div>
<aside class="note">Windows Defender will flag this with "Windows protected your PC". That is because we have not paid Microsoft to code-sign the binary. (Yes, that is a thing. Yes, it costs money.) Click "More info", then "Run anyway".</aside>
<h3>Did it work?</h3>
<p>Open <a href="http://localhost:4510"><code>http://localhost:4510</code></a> in your browser. The Samizdat home should load. If it does not, <code>sc.exe query SamizdatNode</code> shows whether the service is up.</p>
<h3>If something looks wrong</h3>
<ul>
<li><strong>SmartScreen?</strong> See the click sequence above.</li>
<li><strong>Want to upgrade later?</strong> <code>samizdat-up.exe update</code> from an elevated prompt.</li>
<li><strong>Want to remove it?</strong> <code>samizdat-up.exe uninstall node</code> (or <code>--purge</code>).</li>
<li><strong>Anything else?</strong> <a href="https://github.com/tokahuke/samizdat">Open an issue</a> with what you tried and what you saw.</li>
</ul>
</div>

</div>
</div>

When it loads, the [getting started](/docs/getting-started) page is your next stop.

### What it needs

A few hundred MB of memory in steady state. Some GB of disk to build the cache of stuff we are going to store; the node cleans up what you stop caring about. Outbound UDP to a hub (default: `testbed.hubfederation.com`). Installation needs elevated privileges on every OS: `sudo` on Linux + macOS, admin on Windows.

{{% /role-tab %}}

{{% role-tab id="run-a-hub" %}}

If you want to work for the cause, welcome aboard! To serve a Samizdat Hub, you will need

- Access to some computing resource that can be up 24/7, such as a desktop server or a cloud VM. As little as US$5 per month works.
- A public IP (preferably both v4 and v6) associated with the machine. If you use a cloud platform this is usually a checkbox.
- A Linux distribution.

If you have checked all the boxes, install (as root):

<div class="pre-container">
  <button type="button" class="pre-overlay copy-btn" aria-label="Copy to clipboard">copy</button>
  <pre class="template-origin"><code>curl -fsSL ${origin}~/get-samizdat/latest/install.sh | sudo bash
sudo samizdat-up install hub</code></pre>
</div>

### Did the Hub start?

`systemctl status samizdat-hub` should say "active (running)". If not, `journalctl -u samizdat-hub` tells you why.

### Firewall

Open UDP `4511` inbound so other nodes can reach the hub. That is the matchmaker port; everything else is local.

The Hub's admin HTTP (port `45180`) binds only to `127.0.0.1` on purpose. SSH-tunnel in if you need it.

{{% /role-tab %}}

{{% role-tab id="run-a-proxy" %}}

If you want public HTTPS access to a Samizdat node, from people who do not have Samizdat installed, run a proxy in front of it. You will need:

- A Samizdat Node running on the same machine. The proxy forwards reads to it.
- A public domain pointed at your machine. The proxy gets a Let's Encrypt cert for it.
- A public IP, a Linux distribution, and the willingness to keep the box up.

If you have all of that, install (as root):

<div class="pre-container">
  <button type="button" class="pre-overlay copy-btn" aria-label="Copy to clipboard">copy</button>
  <pre class="template-origin"><code>curl -fsSL ${origin}~/get-samizdat/latest/install.sh | sudo bash
sudo samizdat-up install proxy</code></pre>
</div>

After install, edit `/etc/samizdat/proxy.toml` (set `https = true`, your domain, and your contact email for Let's Encrypt), then `sudo systemctl restart samizdat-proxy`.

### Did the Proxy start?

`systemctl status samizdat-proxy` should say "active (running)". If not, `journalctl -u samizdat-proxy` tells you why. ACME (Let's Encrypt) errors land in the same journal; grep for `acme` if HTTPS is not coming up.

### Firewall

Open TCP `80` and `443` inbound. Port `80` handles the ACME challenge and redirects HTTP to HTTPS; port `443` carries the HTTPS traffic that the proxy forwards to your local node.

{{% /role-tab %}}

{{< /role-tabs >}}
