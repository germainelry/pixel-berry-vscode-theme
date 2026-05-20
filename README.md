# Pixel Berry

A cozy dark VS Code theme with warm berry tones — wine/burgundy backgrounds, raspberry accents, and rose-pink syntax.

<p align="center">
  <img src="images/pixel-berry-logo.png" alt="Pixel Berry" width="480">
</p>

## Overview

Pixel Berry is a dark theme designed for long coding sessions. The palette uses warm wine/burgundy surfaces (`#292026`, `#221820`, `#1b1318`) layered into a quiet vertical gradient — editor, sidebar, panel — with a warm raspberry accent (`#c44560`) reserved for small high-signal elements. Focus outlines use a soft dusty berry (`#b88898`). Syntax colors are tuned for visual separation without being harsh: berry pink for keywords, lavender-violet for types, rose pink for functions, muted sage for strings.

## Screenshots

![Editor overview](images/pixel-berry-editor.png)

![Multiple languages](images/pixel-berry-languages.png)

![UI elements](images/pixel-berry-ui.png)

## Installation

**From the VS Code Marketplace:**

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for **"Pixel Berry"**
4. Click **Install**
5. Open the Command Palette (`Ctrl+Shift+P`) → **Preferences: Color Theme** → select **Pixel Berry**

**From a `.vsix` file (local install):**

```bash
code --install-extension pixel-berry-0.0.1.vsix
```

## Local Development

To preview changes while editing the theme:

1. Open this folder in VS Code.
2. Press **F5** to launch the Extension Development Host (a second VS Code window).
3. In that new window, open the Command Palette: `Ctrl+K Ctrl+T` (theme picker shortcut) → select **Pixel Berry**.
4. Open various files (`.ts`, `.py`, `.json`, `.md`) to spot-check syntax colors.
5. Edit `themes/pixel-berry-color-theme.json` — changes hot-reload in the Extension Development Host.

## License

MIT — see [LICENSE](./LICENSE).
