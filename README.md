# ✨ Air Canvas — Neon Hand-Drawing in the Browser

Draw glowing neon art in the air with just your **webcam** and your **finger**.
No installs, no plugins — one HTML file, powered by [MediaPipe Hands](https://developers.google.com/mediapipe).

🔗 **Live demo:** _(GitHub Pages link — see below)_

![cyberpunk air canvas](https://img.shields.io/badge/style-cyberpunk-ff2bd6) ![single file](https://img.shields.io/badge/build-single%20HTML%20file-00e5ff)

## 🎮 Gesture controls
| Gesture | Action |
|---|---|
| ☝️ Index finger up | **Draw** a glowing neon trail |
| 🖐️ Open palm | **Erase** |
| ✊ Closed fist | **Pause** |

## 🛠️ Features
- Real-time single-hand tracking (MediaPipe Hands)
- Smooth **quadratic-curve** brush strokes with additive glow + bright core
- Energy-streak afterglow, fingertip sparkle particles, mode HUD
- Color picker (presets + custom), brush-size slider with live preview
- Clear + **Save as PNG**
- Gesture debouncing & pen-up jump guard for clean handwriting
- Responsive / mobile-friendly (uses the front camera)
- Cyberpunk theme: electric blue · magenta · violet

## ▶️ Run locally
The webcam needs a **secure context** (`https://` or `localhost`):

```bash
# from this folder
python -m http.server 8000
# then open http://localhost:8000
```

> Opening `index.html` directly with `file://` works in some desktop browsers,
> but **mobile browsers require HTTPS** — use the GitHub Pages link for phones.

## 📦 Tech
Plain HTML/CSS/JS in a single file. Hand-tracking model is loaded from a CDN
(internet required on first load; tracking then runs on-device).

## 📄 License
MIT
