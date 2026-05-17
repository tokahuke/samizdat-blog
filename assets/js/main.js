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

// Install-page OS tabs: detect platform, activate the matching tab,
// wire click + arrow-key navigation. Linux is the fallback when detection fails.
function initOsTabs() {
  const buttons = Array.from(document.querySelectorAll(".os-tabs .tab-btn"));
  const panels = Array.from(document.querySelectorAll(".os-tabs .tab-panel"));
  if (!buttons.length) return;

  function activate(button, { focus = false } = {}) {
    const panel = document.querySelector(button.getAttribute("data-target"));
    if (!panel) return;
    buttons.forEach((b) => {
      const isActive = b === button;
      b.classList.toggle("is-active", isActive);
      b.setAttribute("aria-selected", String(isActive));
      b.tabIndex = isActive ? 0 : -1;
    });
    panels.forEach((p) => p.classList.toggle("is-active", p === panel));
    if (focus) button.focus();
  }

  let os = "linux";
  const ua = navigator.userAgent;
  if (/Win/i.test(ua)) os = "windows";
  else if (/Mac/i.test(ua)) os = "macos";

  activate(document.querySelector(`#btn-${os}`) || buttons[0]);

  buttons.forEach((b, i) => {
    b.addEventListener("click", () => activate(b));
    b.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Home" && e.key !== "End") return;
      e.preventDefault();
      let next = i;
      if (e.key === "ArrowLeft") next = (i - 1 + buttons.length) % buttons.length;
      else if (e.key === "ArrowRight") next = (i + 1) % buttons.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = buttons.length - 1;
      activate(buttons[next], { focus: true });
    });
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
initOsTabs();
initCopyButtons();
initDocsToc();
