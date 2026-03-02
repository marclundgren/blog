---
title: 'Building a Self-Hosted NAS in an Afternoon'
description: "How I replaced cloud file storage with a local web-based NAS — built with Node.js, Docker, and a plugin architecture I didn't design myself."
pubDate: 'Jan 15 2026'
heroImage: '../../assets/Gemini_Generated_Image_lkdde8lkdde8lkdd.png'
---

I got tired of reaching for cloud storage every time I needed to move a file between machines, so I built my own. It's a web-based file server that runs in Docker on a home server — upload, browse, and download files from any device on the network, no app required.

---

## Why I Built This

My files were scattered. Photos on one laptop, documents on another, things I wanted to grab from any device that I was either emailing to myself or hunting down on a USB drive. It was annoying in a low-grade way I'd been ignoring for a while.

I didn't need cloud storage — I didn't want the sync complexity or the ongoing subscription for files that never need to leave my house. I just needed one place on the local network I could drop things and pick them up elsewhere.

Something like Nextcloud felt like overkill. I just wanted a file server with a browser UI, not a whole product to maintain.

Node.js backend and Docker config are outside my normal territory as a frontend developer. But with AI helping me navigate the unfamiliar parts, the scope felt manageable enough to try.

---

## What It Does

The UI is accessible from any device on the network — phone, tablet, laptop, whatever. Files go up via drag-and-drop or the standard file picker. Folders are navigable with breadcrumbs. You can download individual files or pull an entire folder as a ZIP. There's dark and light theme support, because that's the kind of thing that matters at 11pm.

---

## The Stack

| Component | Role |
|-----------|------|
| Node.js + Express | HTTP server and API |
| Multer | File upload handling |
| Archiver | ZIP compression for bulk/folder downloads |
| Vanilla JS | Frontend — no framework |
| Docker | Containerized deployment |

The vanilla JS frontend was deliberate. No build step, loads fast, works everywhere. For a tool this simple there was no reason to bring in a framework.

---

## Deployment

The whole thing runs with:

```bash
docker-compose up -d
```

Access at `http://[server-ip]:3000`. One command, running in the background, restarts itself if the server reboots (`unless-stopped`).

Data is stored in a mounted volume so files survive container restarts. Plugins and the frontend are also mounted, so I can tweak them without rebuilding the image.

---

## The Plugin System

This is the part I didn't expect to be there. The server exposes a hook-based plugin architecture with hooks at every meaningful point in the file lifecycle:

`beforeUpload`, `afterUpload`, `beforeDownload`, `afterDownload`, `beforeDelete`, `afterDelete`, `transformFileList`

Two plugins ship with it:

**File Validator** — hooks into `beforeUpload` and blocks executable file types before they touch disk. It runs in blacklist mode by default, and the config blocks `.exe`, `.bat`, `.sh`, and `.cmd`. Can be flipped to whitelist mode if you'd rather explicitly allow types instead.

**Audit Logger** — hooks into `afterUpload`, `afterDownload`, and `afterDelete`, and appends a JSON entry to `/data/audit.log` for every operation:

```json
{"timestamp":"2025-02-21T11:19:00.000Z","action":"upload","filename":"photo.jpg","size":933570}
```

This came from describing the project to Claude. I asked for a simple file server and it suggested building a plugin architecture to keep the core clean and extensible. I went with it because it made sense and I didn't have to design it myself — which is kind of the point.

---

## Security Tradeoffs

A few things I made deliberate calls on:

- No authentication. This is for a home network where every device is already trusted. Adding auth would mean managing credentials for a tool I use daily.
- The server is bound to `127.0.0.1:3000` by default. I expose it further via a reverse proxy with network-level access control.
- Path traversal protection is in place — all paths are validated to stay within the upload directory, so a crafted filename can't escape to the filesystem.

For anything beyond a home network: add authentication, use HTTPS, add rate limiting. The bones are there to extend it.

---

## What I Actually Use It For

The NAS has documents, photos, and various files in it now. It replaced the "just throw it in Dropbox" habit for anything that doesn't need to leave the local network. The audit log has already come in handy once — I wasn't sure if a file had been accidentally deleted and checking the log settled it immediately. Didn't expect to need that feature so soon.
