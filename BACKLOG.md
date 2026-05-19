# Backlog

Future work for samizdat-blog. Items added over time; trim when done.

## Content

- [ ] `content/blog/samizdat-and-hugo.md` — tutorial dated 2021, walks the older workflow (Hugo + Archie theme + `samizdat watch`). If this is the canonical "how to publish a site" page, update for the current `samizdat-up` flow. Otherwise leave as a dated post and write a fresh canonical tutorial.

## Pages / structure

- [ ] `/about-us/` is thin (~2 paragraphs); doesn't carry the "why does Samizdat exist?" thesis. Either grow it or absorb the role into the homepage.
- [ ] No "What is Samizdat?" explainer / glossary for newcomers who land cold from a GitHub link.
- [ ] No status / maturity page — the proof-of-concept warning lives only in the `/install/` aside.
- [ ] No contact / discussion path beyond GitHub issues.
- [ ] `/donate/` doesn't say what donations fund (server, dev time, bounties).
- [ ] Upstream `tokahuke/samizdat` has no top-level README — the "View on GitHub" button on `/install/` lands a newcomer on a bare file listing.

## Operational

- [ ] Uninstall on `/install/` — the install scripts do drop a `samizdat-uninstall` (with `--purge` flag for wiping config + data + keys). Currently deferred from the install page.
- [ ] Confirm the actual Polygon-registered identity name for this blog. Homepage URL-contrast block currently uses `~samizdat-blog/` — if the real name is different, swap it.
