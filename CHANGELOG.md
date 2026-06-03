# Change Log

All notable changes to the Pixel Berry theme will be documented in this file.

## [0.1.1] - 2026-06-04

Maintenance release — no palette or token changes. The syntax/UI colours are
identical to 0.1.0.

### Changed
- Refreshed the README preview screenshots (`pixel-berry-banner.png`,
  `pixel-berry-editor.png`, `pixel-berry-languages.png`, `pixel-berry-ui.png`)
  to reflect the 0.1.0 syntax palette.
- README manual-install command updated to reference `pixel-berry-0.1.1.vsix`.

## [0.1.0] - 2026-06-03

Syntax foreground palette redesign — improves semantic separation across all
languages while preserving the wine/berry UI identity. **UI/chrome colours are
unchanged.**

Final syntax-role hues (interview-driven tuning, vs. v0.0.4): keyword `#ff7ba8`,
function/tag `#ffb0cf`, type `#ddb0ec`, constant `#8fb0f2` (cornflower), number
`#e8c98a`, link `#86c0cc`, variable `#e8c5d6`, property `#d8c2d2`, operator
`#aeb0a8`, regex `#9ed0c4`, error `#f06a6a`, deprecated `#9e8a96`, unimplemented
`#968ca0`. String `#a8d8a8`, comment `#a8919e`, and punctuation `#978d94` are unchanged.

### Added (new syntax colour families)
- **Number butter-yellow `#e8c98a`** — numbers, units, regex escapes, HTML entities, `warn-token`.
- **Link teal `#86c0cc`** — markdown/URL links, `info-token` (breaks link = keyword).
- **Identifier dusty rose `#e8c5d6`** — variables and parameters; a deliberate reversion to the v0.0.4 identifier tone, kept muted vs. the vivid function rose.
- **Diff removed-red `#d17b8b`** — `markup.deleted.diff`; a dedicated wine-rose "removed" tone, split from the variable role so removed lines no longer share the identifier colour (completes the green/red diff convention).
- **Property lilac `#d8c2d2`** — properties, object/JSON keys, CSS property names.
- **Operator greige `#aeb0a8`** — all symbolic operators, unified across every language.
- **Punctuation dim `#978d94`** — punctuation/brackets/delimiters, de-emphasised below body text.
- **Deprecated `#9e8a96`** — `invalid.deprecated` (+ strikethrough), split from the comment tone for the first time.

### Changed (token reassignments — old → new, vs. v0.0.4)
- `constant.numeric` `#b8a3e8` → `#e8c98a` — split numbers from named constants.
- `keyword.other.unit` / `constant.character.entity` `#e8c5d6` → `#e8c98a`.
- `constant.character.escape` `#9bd4b9` → `#e8c98a` — regex escapes now distinct from the literal.
- Named constants / attributes / enum / CSS values / symbols `#b8a3e8` → `#8fb0f2` (cornflower blue; shifted fully blue to separate from type orchid and property lilac). Includes semantic `enumMember` and `variable.constant`.
- `constant.language` (booleans / null) → `#ff7ba8` — reserved words read with the keyword family (new rule).
- `variable`, parameters, language identifiers, JS DOM/console objects → `#e8c5d6`.
- `markup.deleted.diff` `#e8c5d6` → `#d17b8b` — split into a dedicated wine-rose removed-red so deleted-diff no longer shares the variable identifier tone (`markup.changed.diff` left at orchid `#ddb0ec` for now).
- `entity.name.tag` (HTML/JSX) `#e8c5d6` → `#ffb0cf` — tags read with the function family.
- Properties, object/JSON keys, CSS property names → `#d8c2d2`.
- All symbolic operators (was a mix of `#e8dfe8` / `#9bd4b9` / `#ff6b9d` / `#d6a3e8`) → `#aeb0a8`; word-form operators (`new`, `typeof`, `instanceof`, `and`/`or`/`not`, …) → `#ff7ba8`.
- Punctuation / brackets / delimiters `#e8dfe8` → `#978d94`.
- Markdown headings `#e8c5d6` → `#ffb0cf`; markdown links `#ff6b9d` → `#86c0cc`.
- Regex char-class `#e8c5d6` → `#ddb0ec`; regex quantifier `#b8a3e8` → `#ff7ba8`; regex literal → `#9ed0c4` (teal-mint, now its only role).
- Python `support.type.python` `#9bd4b9` → `#ddb0ec`, parameters → `#e8c5d6` (fixes Python scheme inconsistencies). Java/Go/CS `storage`/operators aligned to the global scheme.
- Semantic overrides: `enumMember` / `variable.constant` → `#8fb0f2`; `variable.defaultLibrary` → `#ddb0ec` (kept in sync with constant and type).
- Error red `#f44747` → `#f06a6a` — clears WCAG AA on the editor background; `invalid.broken` moved from `#ffffff` to error red.
- `invalid.deprecated` `#ffffff` → muted `#9e8a96` + `fontStyle: strikethrough` — now a distinct tone from comments (`#a8919e`).
- `invalid.unimplemented` `#ffffff` → `#968ca0` (distinct muted state).

### Fixed
- Removed `variable.parameter` from the italic rule so italic is limited to the four meta cases (comments, `this`/`self`/`super`, HTML/JSX attributes, Python control flow); Python `self` italic preserved explicitly.

### Internal
- Started per-version theme snapshots under `themes/versions/` (excluded from the `.vsix`); `package.json` theme `path`/`label` remain stable.

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
