# Astro-Blog

Currently in development...

I'm building a lightweight blog program for personal use. This project will never support server-side rendering and will minimize reliance on client-side JavaScript.

## Todo

- [ ] responsive style
- [ ] load markdown file from online github repo
- [ ] pwa
- [ ] katex in decap preview
- [ ] post tag
- [ ] search

Additional features are still being considered...

## Environment variables

| Key               | Description                                                                     |
| ----------------- | ------------------------------------------------------------------------------- |
| SITE_URL          | The base URL of your site.                                                      |
| CONTENT_GH_REPO   | **Required**. Github repository name. (Pattern: `[org-or-username]/[repo-name`) |
| CONTENT_GH_BRANCH | Git branch name. Default: `master`.                                             |
| GH_OAUTH_PROXY    | GitHub OAuth App Proxy server. Default: `https://api.netlify.com`.              |

**See Also:**

Decap CMS Docs: [Backend Configuration](https://decapcms.org/docs/backends-overview)

A simple GitHub OAuth proxy demo for Cloudflare Worker: [tototjc/decapcms-github-oauth-proxy](https://github.com/tototjc/decapcms-github-oauth-proxy)
