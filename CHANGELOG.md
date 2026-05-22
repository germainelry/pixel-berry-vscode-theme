# Change Log

All notable changes to the Pixel Berry theme will be documented in this file.

## [0.0.4] - 2026-05-22

### Added
- New banner image (`pixel-berry-banner.png`) for README hero section.

### Changed
- README updated to use the new banner image instead of the logo.
- Refreshed editor, languages, and UI preview screenshots.

## [0.0.3] - 2026-05-21

### Added
- Open VSX Registry publishing support (`ovsx` CLI, npm scripts).
- `PUBLISHING.md` — step-by-step dual-marketplace publishing guide.
- Expanded marketplace keywords from 9 to 30 for better discoverability.

### Changed
- README updated with Open VSX badge, multi-editor installation instructions, and manual VSIX install section.
- `.vscodeignore` updated to exclude publishing docs and build artifacts.

## [0.0.2] - 2026-05-21

### Changed
- README updated with marketplace badges and improved descriptions.
- Logo image optimized for marketplace display.
- Pre-publish cleanup and asset optimization.

## [0.0.1] - 2026-05-21

### Added
- Initial release of Pixel Berry.
- Wine & Ember dark palette: warm wine/burgundy backgrounds (`#292026`, `#221820`, `#1b1318`) with Soft Berry focus outlines (`#b88898`).
- Surface gradient: panel `#1b1318` < sidebar `#221820` < editor `#292026`. All widget, input, menu, and notification surfaces are wine-tinted — no neutral grays.
- Nine distinct syntax roles: keyword (`#ff6b9d`), function (`#ffa3c7`), type (`#d6a3e8`), constant (`#b8a3e8`), string (`#a8d8a8`), operator (`#9bd4b9`), variable (`#e8c5d6`), punctuation (`#e8dfe8`), comment (`#a8919e`).
- Warm raspberry accent (`#c44560`) for progress bar, remote badge, and buttons.
- Text hierarchy: primary `#ede5e8`, secondary `#c8bec2`, muted `#8e8488`.
- Wine-tinted borders (`#3c2c35`) throughout — activity bar, tabs, panels, widgets.
- Five-step list/tree interaction state hierarchy: rest < hover (`#2e2228`) < inactive selection (`#382832`) < focus (`#52324a`) < active selection (`#663a56`).
- Alpha-blended editor selections with berry-plum tint.
- WCAG AA contrast compliance across all foreground/background pairs.
- 15 language test fixtures for visual verification.
