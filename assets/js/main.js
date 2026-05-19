// Replace ${origin} placeholders in <pre class="template-origin"> blocks
// with the actual window.origin. Used by install.md code blocks so the
// "curl ..." commands point at the visitor's local Samizdat node.
function substituteTemplateOrigin() {
  document.querySelectorAll(".template-origin").forEach((el) => {
    el.textContent = el.textContent.replaceAll("${origin}", window.origin);
  });
}

// Rewrite <a class="samizdat-link"> elements: take the relative path that
// the author typed as the link text, and turn it into a full Samizdat
// series URL pointing at the local node, using the site's public key.
function rewriteSamizdatLinks() {
  const publicKey = window.__samizdatPublicKey;
  if (!publicKey) return;

  const base = `http://localhost:4510/_series/${publicKey}/`;
  document.querySelectorAll("a.samizdat-link").forEach((el) => {
    const fullLink = base + el.textContent;
    el.textContent = fullLink;
    el.setAttribute("href", fullLink);
  });
}

// Rewrite <a class="has-origin"> href attributes to substitute ${origin}.
function rewriteHasOriginLinks() {
  document.querySelectorAll("a.has-origin").forEach((el) => {
    const href = el.getAttribute("href");
    if (!href) return;
    el.setAttribute("href", href.replaceAll("${origin}", window.origin));
  });
}

// Shared tab activation: flips aria + .is-active on the matching button
// and panel in the given button/panel arrays.
function activateTabIn(buttons, panels, button, opts = {}) {
  const panelSelector = button.getAttribute("data-target");
  const panel = panelSelector ? document.querySelector(panelSelector) : null;
  if (!panel) return;
  buttons.forEach((b) => {
    const isActive = b === button;
    b.classList.toggle("is-active", isActive);
    b.setAttribute("aria-selected", String(isActive));
    b.tabIndex = isActive ? 0 : -1;
  });
  panels.forEach((p) => p.classList.toggle("is-active", p === panel));
  if (opts.focus) button.focus();
  if (opts.onChange) opts.onChange(button);
}

// Arrow-key + Home/End navigation for a tablist's buttons.
function wireTabKeyboard(buttons, activateFn) {
  buttons.forEach((b, i) => {
    b.addEventListener("click", () => activateFn(b));
    b.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Home" && e.key !== "End") return;
      e.preventDefault();
      let next = i;
      if (e.key === "ArrowLeft") next = (i - 1 + buttons.length) % buttons.length;
      else if (e.key === "ArrowRight") next = (i + 1) % buttons.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = buttons.length - 1;
      activateFn(buttons[next], { focus: true });
    });
  });
}

// Install-page OS tabs: detect platform, activate the matching tab,
// wire click + arrow-key navigation. Linux is the fallback when detection fails.
// Scopes to each .os-tabs container so multiple instances on a page work.
function initOsTabs() {
  document.querySelectorAll(".os-tabs").forEach((container) => {
    const buttons = Array.from(container.querySelectorAll(".tab-btn"));
    const panels = Array.from(container.querySelectorAll(".tab-panel"));
    if (!buttons.length) return;

    let os = "linux";
    const ua = navigator.userAgent;
    if (/Win/i.test(ua)) os = "windows";
    else if (/Mac/i.test(ua)) os = "macos";

    const activate = (btn, opts) => activateTabIn(buttons, panels, btn, opts);
    activate(container.querySelector(`#btn-${os}`) || buttons[0]);
    wireTabKeyboard(buttons, activate);
  });
}

// Install-page audience tabs: "Use it" / "Run a hub" / "Run a proxy".
// Active tab is reflected in the URL hash so install paths are deep-linkable
// (e.g. /install/#run-a-hub). The hash is updated on tab change and the
// page reacts to hashchange events (back-button, manual edit).
function initRoleTabs() {
  const container = document.querySelector(".role-tabs");
  if (!container) return;
  const buttons = Array.from(container.querySelectorAll(".role-tabs-nav .tab-btn"));
  const panels = Array.from(container.querySelectorAll(":scope > .role-tabs-panels > .tab-panel"));
  if (!buttons.length) return;

  const pickFromHash = () => {
    const hash = location.hash.slice(1);
    return hash ? container.querySelector(`#btn-${CSS.escape(hash)}`) : null;
  };

  const activate = (btn, opts = {}) =>
    activateTabIn(buttons, panels, btn, {
      ...opts,
      onChange: (b) => {
        const id = b.id.replace(/^btn-/, "");
        if (location.hash.slice(1) !== id) {
          history.replaceState(null, "", "#" + id);
        }
      },
    });

  activate(pickFromHash() || buttons[0]);
  wireTabKeyboard(buttons, activate);

  window.addEventListener("hashchange", () => {
    const btn = pickFromHash();
    if (btn) activate(btn);
  });
}

// Copy-to-clipboard buttons inside .pre-container blocks. Reads the
// <pre> content at click time so substitutions from substituteTemplateOrigin
// are already applied.
function initCopyButtons() {
  document.querySelectorAll(".pre-container").forEach((container) => {
    const button = container.querySelector(".copy-btn");
    const pre = container.querySelector("pre");
    if (!button || !pre) return;

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(pre.textContent);
        const original = button.textContent;
        button.textContent = "copied";
        setTimeout(() => { button.textContent = original; }, 1200);
      } catch (err) {
        console.error("clipboard write failed", err);
      }
    });
  });
}

// Homepage network-status chip: detects whether the reader is on a Samizdat
// node serving natively or on an HTTP proxy, and reflects that in the chip.
// Native paths look like /_series/<pubkey>/...; everything else is a proxy.
function initNetworkStatus() {
  const el = document.querySelector("[data-network-status]");
  if (!el) return;

  const mode = el.querySelector("[data-network-mode]");
  const host = el.querySelector("[data-network-host]");
  if (!mode || !host) return;

  const isNative = window.location.pathname.startsWith("/_series/");
  const pubkey = window.__samizdatPublicKey;

  if (isNative && pubkey) {
    el.dataset.networkState = "native";
    mode.textContent = "NATIVE";
    host.textContent = pubkey.slice(0, 12) + "…";
  } else {
    el.dataset.networkState = "proxy";
    mode.textContent = "PROXY";
    host.textContent = window.location.host || "…";
  }
}

// Build the "On this page" TOC inside #toc .toc from H2/H3s in .docs-content.
// Used only on docs pages. Server-side TOC would be cleaner but Hugo's
// .TableOfContents output doesn't match the chrome we want here.
function initDocsToc() {
  const target = document.querySelector("#toc .toc");
  const content = document.querySelector(".docs-content");
  if (!target || !content) return;

  const headers = content.querySelectorAll("h2, h3");
  if (!headers.length) return;

  const sections = [];
  headers.forEach((el) => {
    if (!el.id) return;
    if (el.tagName === "H2") {
      sections.push({ id: el.id, text: el.textContent, children: [] });
    } else if (sections.length) {
      sections[sections.length - 1].children.push({ id: el.id, text: el.textContent });
    }
  });

  const frag = document.createDocumentFragment();
  for (const section of sections) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${section.id}`;
    a.textContent = section.text;
    li.appendChild(a);
    if (section.children.length) {
      const sub = document.createElement("ul");
      for (const child of section.children) {
        const subLi = document.createElement("li");
        const subA = document.createElement("a");
        subA.href = `#${child.id}`;
        subA.textContent = child.text;
        subLi.appendChild(subA);
        sub.appendChild(subLi);
      }
      li.appendChild(sub);
    }
    frag.appendChild(li);
  }

  target.replaceChildren(frag);
}

substituteTemplateOrigin();
rewriteSamizdatLinks();
rewriteHasOriginLinks();
initRoleTabs();
initOsTabs();
initCopyButtons();
initNetworkStatus();
initDocsToc();
