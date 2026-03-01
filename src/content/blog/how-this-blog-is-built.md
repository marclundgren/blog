---
title: 'How This Blog Is Built'
description: 'The tools and process behind this site — including the AI that helped make it.'
pubDate: 'Feb 20 2026'
---

This blog runs on [Astro](https://astro.build), hosted on GitHub Pages. When I push to main, a GitHub Action builds the site and deploys it. Writing a post means dropping a markdown file into a folder and opening a pull request.

That setup didn't come from me knowing how to do any of that. I'm a frontend developer — I know my way around a UI, but static site generators, GitHub Actions, and deployment pipelines aren't where I spend my time. I got here by describing what I wanted to Claude and working through it together.

The whole thing took an afternoon. We picked Astro, scaffolded the project, wired up the deployment workflow, fixed a handful of routing issues that came from hosting at a subpath, and got it live. I made the decisions, Claude handled the parts I'd have spent days googling.

That's the pattern for most of what's on this blog. I have a problem, I have some idea of what I want, and I use AI to fill in the gaps. It's not magic — I still have to understand what's happening well enough to know when something's wrong — but it lets me work on problems I'd normally just leave alone.

The writing works the same way. I'll dump out what I know about a project and work with Claude to shape it into something readable. The experience is mine. The polish has help.
