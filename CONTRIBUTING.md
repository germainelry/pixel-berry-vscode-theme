# Contributing to Pixel Berry

Thanks for your interest in contributing! Pixel Berry is MIT-licensed — by submitting a contribution you agree it falls under the same [MIT License](./LICENSE). No CLA is required.

## What Contributions Are Welcome

- **Bug reports** — a color that looks wrong, an unstyled scope, or a contrast issue. Include a screenshot and the output of "Developer: Inspect Editor Tokens and Scopes."
- **New language support** — adding token rules for languages not yet covered. Include a test fixture file.
- **Accessibility improvements** — contrast ratio fixes, color vision deficiency improvements.
- **Documentation fixes** — typos or clarifications in README, DESIGN_STANDARDS, or CHANGELOG.
- **Design discussions** — open an issue before proposing palette-wide changes.

### Out of Scope

- `fontStyle: "bold"` additions (design constraint — bold is never used)
- Terminal ANSI color remapping (ANSI colors stay at VS Code defaults)

## Getting Started

1. **Fork and clone** this repository.
2. **Open** the folder in VS Code.
3. **Install dependencies:** `npm install` (installs `vsce` for packaging).
4. **Press F5** to launch the Extension Development Host.
5. **Select the theme:** Command Palette (`Ctrl+K Ctrl+T`) > **Pixel Berry**.
6. **Read [`docs/DESIGN_STANDARDS.md`](./docs/DESIGN_STANDARDS.md)** before making any color decisions — it is the canonical design reference.

## Development Workflow

### Identifying the Right Scope

Use **"Developer: Inspect Editor Tokens and Scopes"** from the Command Palette to find the TextMate scope for any token. The inspector shows both the TextMate scope and semantic token type (when LSP is active).

### Editing the Theme

- The single source of truth is [`themes/pixel-berry-color-theme.json`](./themes/pixel-berry-color-theme.json).
- The JSON has no comments. Design rationale lives in [`docs/DESIGN_STANDARDS.md`](./docs/DESIGN_STANDARDS.md).
- Pick colors from the existing nine syntax roles (see DESIGN_STANDARDS.md Section 8.7). Do not introduce new hex values without opening an issue first.
- Changes hot-reload in the Extension Development Host.

### Style Rules

These constraints are non-negotiable:

- **Nine syntax colors only.** keyword, function, type, constant, string, operator, variable, punctuation, comment. Each has a defined hex value in DESIGN_STANDARDS.md Section 8.7. New hex values require prior discussion.
- **Surface gradient hierarchy.** Panel `#1b1318` < Sidebar `#221820` < Editor `#292026`. New surfaces must fit this order. All surfaces use warm wine/burgundy tinting (hue 330-345) — no neutral grays.
- **No bold.** `fontStyle: "bold"` is never used. `italic` is reserved for comments, `this`/`self`/`super`, HTML/JSX attributes, and Python control flow.
- **Alpha-blended selections.** Editor selections must use alpha channels, never opaque backgrounds.
- **ANSI defaults.** Terminal ANSI colors stay at VS Code defaults — do not remap them.
- **Controlled accent.** The raspberry accent `#c44560` is reserved for small high-signal elements (progress bar, remote badge, buttons). Focus outlines use Soft Berry `#b88898`. Never use saturated accents as large surface backgrounds.

### Testing Your Changes

1. Open the relevant files in [`test-fixtures/`](./test-fixtures/) (01 through 15) and visually verify your changes.
2. Toggle `"editor.semanticHighlighting.enabled"` to `false` in the Extension Development Host settings and confirm the theme still looks correct — semantic tokens override TextMate, so both paths must work.
3. For any new or changed syntax color, verify WCAG AA contrast (4.5:1 minimum) against the editor background `#292026`.
4. Run `npx vsce package` to confirm the extension packages without errors.

## Submitting Changes

### Branch and Commit

- Create a feature branch: `git checkout -b fix/scope-name-description` or `feat/...`, `docs/...`
- Keep commits focused — one logical change per commit.

### Changelog Entry

Every color change must be documented in [`CHANGELOG.md`](./CHANGELOG.md) with: token name (or TextMate scope), old hex, new hex, and reason.

```
- `list.hoverBackground`: `#2e2228` -> `#302428` — improved contrast with sidebar background
```

### Pull Request

- Open a PR against `master`.
- Include: what changed, why, and a screenshot showing the result in the Extension Development Host.
- If adding a new language, include a test fixture in `test-fixtures/` following the naming convention (`NN-language.ext`).
- Expect discussion — not all changes will be accepted, especially palette modifications that affect the overall design identity.

## Project Structure

```
package.json                          # Extension manifest
themes/pixel-berry-color-theme.json   # The theme — all colors live here
docs/DESIGN_STANDARDS.md              # Authoritative design system reference
test-fixtures/                        # 15 language files for visual testing
CHANGELOG.md                          # Document every color change here
```

## Code of Conduct

Be kind and constructive. This is a small project maintained in spare time.

## Questions?

Open an [issue](https://github.com/germainelry/pixel-berry-vscode-theme/issues) on the repository.
