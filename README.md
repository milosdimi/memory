<div align="center">

# 🃏 Memory Game

A two-player memory card game with 4 unique themes, built with Vite, TypeScript and SCSS.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-memory.dimit.cc-4a7fa5?style=for-the-badge&logo=googlechrome&logoColor=white)](https://memory.dimit.cc)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![PWA](https://img.shields.io/badge/PWA-ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://memory.dimit.cc)

</div>

---

## ✨ Features

- 🎮 **2-player** local multiplayer — take turns on the same device
- 🎨 **4 unique themes** — each with its own cards, colors and typography
- 📐 **3 board sizes** — 16, 24 or 36 cards
- 🔄 **Card flip animations** — smooth 3D flip with CSS perspective
- 📊 **Live score tracking** — score updates after every match
- 🏆 **Winner screen** — confetti animation, draw detection, play again
- 🚪 **Exit popup** — theme-aware confirmation dialog
- 📱 **Fully responsive** — works on mobile, tablet and desktop
- ⚡ **PWA ready** — installable on mobile devices

---

## 🎨 Themes

| Theme | Font | Style |
|-------|------|-------|
| **Code Vibes** | Red Rose | Dark terminal aesthetic with arrow labels |
| **Gaming** | Orbitron | Neon glow, pixel-style icons |
| **DA Projects** | Figtree | Clean and modern |
| **Foods** | Klee One | Warm and playful |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [SCSS](https://sass-lang.com/) | Modular, component-based styles |
| [Google Fonts](https://fonts.google.com/) | Theme-specific typography |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+

### Installation

```bash
# Clone the repository
git clone https://github.com/milosdimi/memory.git
cd memory

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview build

```bash
npm run preview
```

---

## 📁 Project Structure

```
memory/
├── public/
│   ├── assets/
│   │   ├── cards/          # Card images per theme (code-vibes, gaming, da-projects, foods)
│   │   ├── confetti/       # Confetti images for winner screen
│   │   ├── icons/          # UI icons
│   │   ├── logo/           # Favicon & PWA icons
│   │   └── previews/       # Theme preview images for settings
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # Reusable UI components (card, popup)
│   ├── game/               # Core game logic (flip, match, score, turn)
│   ├── pages/              # Page renderers (home, settings, game-board, game-over, winner)
│   ├── styles/             # SCSS — BEM methodology, one file per component
│   ├── types/              # TypeScript type definitions
│   └── main.ts             # App entry point & page routing
├── index.html
└── vite.config.ts
```

---

## 🎯 Game Flow

```
Home → Settings → Game Board → Game Over → Winner
                                    ↑
                               (Play Again)
```

1. **Home** — landing screen
2. **Settings** — choose theme, player color and board size
3. **Game Board** — flip cards, find pairs, alternate turns on mismatch
4. **Game Over** — shows final scores
5. **Winner** — announces winner or draw with confetti

---

## 👤 Author

**Milos Dimitrijevic**

[![GitHub](https://img.shields.io/badge/GitHub-milosdimi-181717?style=flat-square&logo=github)](https://github.com/milosdimi)
