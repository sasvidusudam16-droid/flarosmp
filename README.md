# FlaroSMP — Minecraft Server Landing Page

Official landing page for **FlaroSMP**, a custom Minecraft Java & Bedrock survival server.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **CSS Modules / Global CSS**
- Deployed via **PM2** on a VPS behind **Cloudflare Tunnel**

## Features

- Live player count (Minecraft server status API)
- Server IP copy-to-clipboard
- Rank store section
- Shard world showcase
- Scroll-based animations & back-to-top sword launch effect
- Fully responsive (mobile → desktop)

## Live Site

[flarosmp.lumexhosting.xyz](https://flarosmp.lumexhosting.xyz)

## Server Info

| | |
|---|---|
| **Java IP** | `play.flarosmp.net` |
| **Bedrock** | Same IP, port `19132` |
| **Discord** | [discord.gg/DahmrDUQhT](https://discord.gg/DahmrDUQhT) |
| **Store** | [store.flarosmp.net](https://store.flarosmp.net) |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

```bash
npm run build
pm2 restart flarosmp
```
