# Pixel Berry Design Standards

Last updated: 2026-05-21 | Theme version: 0.0.1 | Variant: Dark (`vs-dark`)

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Design Principles](#2-design-principles)
3. [Terminology](#3-terminology)
4. [Dark Theme Design Standards](#4-dark-theme-design-standards)
5. [VS Code Theme Architecture](#5-vs-code-theme-architecture)
6. [Workbench Color Standards](#6-workbench-color-standards)
7. [Interaction State Standards](#7-interaction-state-standards)
8. [Color Token Strategy](#8-color-token-strategy)
9. [Contrast and Accessibility Standards](#9-contrast-and-accessibility-standards)
10. [Syntax Highlighting Standards](#10-syntax-highlighting-standards)
11. [Testing Checklist](#11-testing-checklist)
12. [Anti-Patterns](#12-anti-patterns)
13. [Maintenance Rules](#13-maintenance-rules)

---

## 1. Purpose

This document defines the visual language, interaction-state rules, accessibility expectations, and color-token strategy for the Pixel Berry VS Code theme. It is a technical design-system reference for theme development, not a user-facing branding document.

Pixel Berry's theme JSON has no comments. This document serves as the authoritative source for *why* a color was chosen, *how* interaction states should relate to each other, and *what constraints* future changes must respect. Every color decision in `themes/pixel-berry-color-theme.json` should be traceable to a standard defined here.

The scope of this document covers the single dark variant (`vs-dark`). If a light variant is introduced, it should receive a companion section or separate document. Notes on light-theme strategy appear in [Section 13](#13-maintenance-rules).

Pixel Berry is derived from the Pink Panda theme. Many TextMate scope structures are inherited from upstream. This document codifies the palette and design intent applied on top of that structure.

---

## 2. Design Principles

### 2.1 Wine Gradient Layering

Surfaces use a three-step wine/burgundy gradient (hue 330-345, saturation 12-18%) to create implicit depth without relying on visible borders. The darkest surface is the panel (`#1b1318`), the middle is the sidebar and tabs (`#221820`), and the lightest is the editor (`#292026`). New surface colors must slot into this gradient hierarchy.

### 2.2 Controlled Accent

The warm raspberry accent (`#c44560`) is reserved for small, high-signal elements: the progress bar, the remote status indicator badge, and buttons. Focus outlines use Soft Berry (`#b88898`). Accents are never used as large surface backgrounds. The title bar and status bar use dark wine surfaces (`#221820`) with light foreground text, matching the sidebar level. This prevents accent fatigue and keeps the editor as the visual focal point.

### 2.3 Warm-to-Cool Syntax Palette

Syntax colors span from warm to cool: berry-pink keywords (`#ff7ba8`), rose functions/tags (`#ffb0cf`), butter-yellow numbers (`#e8c98a`), orchid-violet types (`#ddb0ec`), cornflower-blue constants (`#8fb0f2`), sage strings (`#a8d8a8`), teal links (`#86c0cc`). The warmest, most saturated colors are reserved for high-signal structure (keywords, functions). High-frequency identifiers (variables/parameters) take a **dusty rose-pink** (`#e8c5d6`) — a deliberate v0.1.0 reversion to the v0.0.4 identifier tone, kept muted and lower in saturation than the vivid function rose (`#ffb0cf`) so the two stay distinct in call vs. identifier position. Structural glue recedes furthest: operators (`#aeb0a8`) sit just above punctuation (`#978d94`), both below body text. The butter-yellow number tone is the one deliberately warm *value* note, providing relief that is not pink.

### 2.4 Semantic Distinctness Over Vibrancy

No two syntax roles share the same hex value. The primary syntax colors must remain perceptually distinct from each other, even when viewed under color vision deficiency simulation. Distinctness is achieved through differences in both hue and luminance, not hue alone. (A small number of *narrow/niche* tokens deliberately reuse a family — e.g. amber serves numbers and `warn-token`, cyan serves links and `info-token` — where the roles never co-occur.)

### 2.5 Italic for Flow, Not for Everything

`fontStyle: "italic"` is applied to comments, `this`/`self`/`super`, HTML/JSX attributes, and Python control flow keywords. It is never applied to functions, types, or strings. Italic marks tokens that are "meta" or contextual rather than primary identifiers.

### 2.6 Muted Over Loud

The theme favors pastels with enough saturation to maintain hue identity at higher contrast ratios. Keywords carry the most structural meaning and use the most saturated color. Other syntax tokens balance readability (higher contrast preferred for prolonged use) with visual cohesion. A syntax color may be bright if it retains clear hue identity — the goal is "readable and distinct," not "dim."

### 2.7 Inherit from Defaults Where Safe

Many workbench tokens (merge backgrounds, debug toolbars, terminal ANSI colors) are left at or near VS Code Dark+ defaults. Customization happens only where it reinforces the berry identity or corrects a readability issue. This reduces maintenance surface area and avoids breaking user expectations in areas where themed colors add no value.

---

## 3. Terminology

| Term | Definition |
|------|------------|
| **Workbench color** | A VS Code UI chrome color set in the `"colors"` object of the theme JSON. Controls non-editor UI: sidebar, status bar, tabs, lists, widgets, notifications. |
| **Token color** | A TextMate scope-to-style rule set in the `"tokenColors"` array. Controls syntax highlighting in the editor via scope matching. |
| **Semantic token** | A VS Code-native token derived from the language server (LSP), set in `"semanticTokenColors"`. Overrides TextMate scopes when `"semanticHighlighting": true`. |
| **TextMate scope** | A dot-separated grammar identifier (e.g., `keyword.control.flow.python`). More specific scopes override less specific ones during token matching. |
| **Design system** | A structured collection of reusable design decisions — colors, spacing, typography, interaction rules — that ensures consistency across a product. For a VS Code theme, this means the palette, state rules, and contrast standards. |
| **Visual language** | The set of visual cues (color, weight, opacity, outline) that communicate meaning to the user. In a theme, visual language determines how users distinguish keywords from strings, active tabs from inactive tabs, or errors from warnings. |
| **Design token** | A named, semantic color value that maps to one or more concrete color IDs. Pixel Berry uses conceptual tokens (e.g., `surface.editor`, `syntax.keyword`) even though VS Code's theme JSON does not support token indirection natively. |
| **Surface** | A background color for a UI region. Each surface sits at a specific level in the luminance hierarchy. |
| **Elevation** | The conceptual "layer" of a UI element. Higher elevation surfaces (widgets, menus, notifications) float above lower ones (editor, sidebar) and typically have slightly different background colors to reinforce depth. |
| **Accent color** | A high-saturation color used sparingly for emphasis: status bar, buttons, focus rings, badges. Overuse of accent colors destroys their signaling power. |
| **Muted text** | Text rendered at reduced contrast to indicate secondary importance (e.g., line numbers, breadcrumbs). Must remain readable. |
| **Disabled text** | Text rendered at very low contrast to indicate an unavailable or inactive state. Should look intentionally dimmed, not broken. |
| **Alpha channel** | The last two hex digits in an 8-digit color code (e.g., `#4a2e5080` — the `80` is ~50% opacity). Used for selection overlays, hover states, and any background that must composite over syntax-colored text. |
| **Contrast ratio** | The WCAG luminance ratio between a foreground and background color. 4.5:1 is the AA threshold for normal text; 3:1 for large text and UI components. |
| **Focus indicator** | A visible outline or background change that shows which element has keyboard focus. Essential for keyboard navigation and accessibility. |
| **Interaction state** | A visual variant of a UI element triggered by user action: hover, focus, active, selected, disabled. Each state must be visually distinguishable. |
| **State matrix** | A table mapping every interaction state to its visual treatment (background, foreground, border/outline). Used to verify that no two states are ambiguous. |
| **Chroma / saturation** | The intensity or purity of a color. High-chroma colors (neon pink) demand attention; low-chroma colors (muted plum) recede. Dark themes should favor low-to-medium chroma for backgrounds and reserve high chroma for small accent areas. |
| **Foreground/background contrast** | The relationship between text color and the surface behind it. Insufficient contrast causes readability problems; excessive contrast causes eye strain on dark backgrounds. |
| **`vs-dark` base** | The VS Code dark theme base that provides fallback colors for any token not explicitly defined in the theme JSON. Pixel Berry inherits from this. |

---

## 4. Dark Theme Design Standards

### 4.1 Surface Luminance Range

Background surfaces should stay within a CIE L* range of approximately 8 (darkest) to 18 (lightest). Going below L*=5 causes OLED "smearing" artifacts on some displays. Going above L*=25 begins to lose dark-theme identity and can create glare.

Pixel Berry's surface stack:

```
Darkest   #1b1318   Panel (terminal, output, problems)         L* ≈ 7.5
          #221820   Side Bar, Tab Bar, Section Headers          L* ≈ 10
          #241c22   Widgets (suggest, hover, notifications)     L* ≈ 11
Lightest  #292026   Editor, Activity Bar, Gutter, Breadcrumb   L* ≈ 14
```

Widgets sit between sidebar and editor luminance, which is correct for overlay elements that need to appear "above" the content surface.

### 4.2 Foreground Luminance

Primary text should sit at L*=90–95. Pixel Berry uses `#e8dfe8` (~L*=90) for editor text and `#ede5e8` (~L*=92) for general UI foreground. Pure `#ffffff` is reserved for maximum emphasis: focus state foreground and badge text. Using `#ffffff` for body text would create excessive contrast against the wine backgrounds.

### 4.3 Alpha-Blending Strategy

Editor selections use alpha-blended backgrounds (e.g., `#4a2e5080`, `#5d3f5f58`) rather than opaque colors. This is intentional: selections overlay syntax-highlighted text, and opaque backgrounds would hide the text color underneath, losing the syntax context that helps users understand what they've selected. Any new selection or highlight color must use an alpha channel.

### 4.4 Border Philosophy

Pixel Berry uses borders sparingly. Many border tokens are set to `#00000000` (fully transparent). Where borders appear, they use wine-tinted values:

- Activity bar border: `#3c2c35`
- Tab border: `#3c2c35`
- Panel border: `#3c2c3580` (semi-transparent wine)
- Widget border: `#3c2c35`

Borders use a unified wine-tinted value (`#3c2c35`) for consistency. They serve as structural separators, not decorative elements. Adding visible borders where none exist currently requires justification — the wine gradient hierarchy should handle most spatial separation.

### 4.5 Dark Theme General Rules

- Avoid relying on pure `#000000` for any surface. Pure black creates harsh contrast boundaries and OLED issues.
- Use layered dark surfaces to create hierarchy rather than relying on borders alone.
- Use contrast deliberately — not everything should be bright. Important elements (active text, keywords, focused items) earn high contrast. Secondary elements (line numbers, indent guides, inactive tabs) stay muted.
- Avoid neon overload. Saturated colors work in small doses (status bar, cursor, error squiggles) but overwhelm when applied to large areas.
- Ensure muted text (`#858585` line numbers, `#a8919e` comments) remains readable at typical screen distances and font sizes.
- Avoid highly saturated backgrounds behind syntax text. Selection and highlight backgrounds must be low-chroma or alpha-blended so that the syntax foreground colors remain the dominant visual signal.
- Reduce eye strain by keeping the overall luminance low and warm-tinted. The plum foundation is easier on eyes during long sessions than a neutral gray or blue-gray base.

### 4.6 Light Theme Considerations

If a light variant is created in the future:
- It should share the same conceptual token names but with inverted luminance relationships.
- Surface tokens would shift to light cream or lavender tints.
- Accent tokens would use deeper, more saturated berry/raspberry values to maintain contrast on light backgrounds.
- Syntax colors would need darkened variants of the same hue families to maintain readability on light surfaces.
- A separate design-standards section or companion document should be created for the light variant.

---

## 5. VS Code Theme Architecture

### 5.1 File Structure

```
pixel.berry/
├── package.json                              # Declares theme contribution
└── themes/
    └── pixel-berry-color-theme.json          # The theme definition
```

The `package.json` `contributes.themes` array declares the theme:

```json
{
  "label": "Pixel Berry",
  "uiTheme": "vs-dark",
  "path": "./themes/pixel-berry-color-theme.json"
}
```

The `uiTheme` value `"vs-dark"` tells VS Code to use the dark base theme for any color token not explicitly defined.

### 5.2 Theme JSON Structure

The theme JSON has these top-level keys:

| Key | Purpose |
|-----|---------|
| `"name"` | Theme display name |
| `"type"` | `"dark"` — declares this is a dark theme |
| `"semanticHighlighting"` | `true` — enables semantic token support |
| `"colors"` | Object of ~252 workbench/UI color assignments |
| `"tokenColors"` | Array of ~180 TextMate scope-to-style rules for syntax highlighting |
| `"semanticTokenColors"` | Object of 3 semantic token overrides |

### 5.3 Evaluation Order

VS Code applies colors in this order:

1. **`colors`** — workbench UI chrome is painted first
2. **`tokenColors`** — TextMate grammar scopes are matched and styled
3. **`semanticTokenColors`** — language server tokens override TextMate matches when semantic highlighting is available

Semantic tokens always win when both a TextMate rule and a semantic rule match the same token. This means changes to `tokenColors` may have no visible effect for languages with strong LSP support (TypeScript, Rust, Python, Go, Java, C#) if a conflicting semantic rule exists.

### 5.4 Scope Specificity

When multiple `tokenColors` rules match the same token, the most specific scope wins regardless of position in the array. For example:

- `keyword.operator` → `syntax.operator` (generic; e.g. `+`, `=`)
- `keyword.operator.logical.python` → `syntax.keyword` (most specific, wins for Python — `and`/`or`/`not` read as keywords)

For rules at the same specificity level, last-in-file wins. The theme has several entries sharing the same `"name"` field (e.g., multiple `"java modifier.import"` entries) — these are specificity layers, not duplicates.

### 5.5 Fallback Behavior

Any color token not defined in the theme JSON falls back to the VS Code Dark+ default. This is why tokens like `editorBracketHighlight.foreground1`–`foreground6` render colored brackets even though they are absent from the Pixel Berry theme file. Intentionally omitting tokens is a valid strategy when the default is acceptable.

### 5.6 Current Semantic Token Coverage

| Semantic Token | Color | Overrides |
|----------------|-------|-----------|
| `enumMember` | `#8fb0f2` | Enum members → constant family (cornflower blue) |
| `variable.constant` | `#8fb0f2` | Constants → cornflower blue |
| `variable.defaultLibrary` | `#ddb0ec` | Built-in library variables → orchid violet (type) |

This is minimal coverage. Expansion is recommended for languages with strong LSP support. See [Section 13](#13-maintenance-rules) for the expansion plan.

---

## 6. Workbench Color Standards

### 6.1 Surface Backgrounds

Every surface must maintain the luminance gradient: panel is darkest, sidebar/tabs are mid, editor is lightest.

| Region | VS Code Token | Value | Role |
|--------|---------------|-------|------|
| Editor | `editor.background` | `#292026` | Primary editing surface, brightest layer |
| Activity Bar | `activityBar.background` | `#292026` | Icon rail, matches editor level |
| Side Bar | `sideBar.background` | `#221820` | File explorer, search, SCM panels |
| Title Bar | `titleBar.activeBackground` | `#221820` | Window title/menu area, matches sidebar level |
| Tab Bar | `editorGroupHeader.tabsBackground` | `#221820` | Tab strip, matches sidebar level |
| Status Bar | `statusBar.background` | `#221820` | Bottom status area, matches sidebar level |
| Section Headers | `sideBarSectionHeader.background` | `#221820` | Collapsible section headers in sidebar |
| Command Center | `commandCenter.background` | `#292026` | Search/command widget in title bar — editor-level inset |
| Widgets | `editorWidget.background` | `#241c22` | Suggest, hover, peek overlays |
| Menus | `menu.background` | `#241c22` | Context menus, dropdowns |
| Notifications | `notifications.background` | `#241c22` | Toast notifications |
| Title Bar (inactive) | `titleBar.inactiveBackground` | `#1b1318` | Subtly darker when window unfocused |
| Panel | `panel.background` | `#1b1318` | Terminal, output, problems — darkest layer |

### 6.2 Accent Colors

The accent family derives from raspberry/berry hues. Each level serves a specific interaction purpose.

| Conceptual Role | Value | Used For |
|-----------------|-------|----------|
| Primary accent | `#c44560` | Progress bar, remote status badge, buttons, badges — small high-signal elements only |
| Muted accent | `#a04060` | Button primary rest state |
| Soft Berry outline | `#b88898` | Focus border, text links, find match border, selection highlight outlines |
| Button hover | `#c46878` | Button hover state — warm berry-rose |
| Cursor accent | `#ffb3d9` | Editor cursor, highly visible pink |
| Widget highlight | `#d49198` | Suggest widget match text, section header foreground, picker group foreground |

The accent family should not grow beyond these six levels without justification. Adding more saturated colors dilutes the impact of existing accents. The raspberry accent is never used as a large surface background — title bar and status bar use dark wine surfaces with light foreground text instead.

### 6.3 Text Hierarchy

| Level | Token(s) | Value | Usage |
|-------|----------|-------|-------|
| Primary | `foreground`, `titleBar.activeForeground`, `statusBar.foreground` | `#ede5e8` | General UI text, icons, title bar, status bar — unified chrome foreground |
| Editor | `editor.foreground` | `#e8dfe8` | Code text, suggest widget text |
| Secondary | `input.foreground`, `terminal.foreground`, `commandCenter.foreground` | `#c8bec2` | Input fields, terminal, widget bodies, command center placeholder |
| Muted | `editorLineNumber.foreground`, `titleBar.inactiveForeground` | `#8e8488` | Line numbers, breadcrumb subdued text, inactive chrome text |
| Disabled | `activityBar.inactiveForeground` | `#ede5e860` | Inactive activity bar icons (~38% primary) |

### 6.4 Diagnostic Colors

The error/warning/info triad must be used consistently across all diagnostic surfaces.

| Severity | Color | Used For |
|----------|-------|----------|
| Error | `#f48771` | Editor squiggles, gutter markers, minimap highlight, marker navigation |
| Warning | `#cca700` | Editor squiggles, gutter markers, minimap highlight, marker navigation, notification warning icon |
| Info | `#75beff` | Editor squiggles, marker navigation, notification info icon |

**Known inconsistency:** `notificationsErrorIcon.foreground` is currently `#d9992d` (amber) rather than `#f48771`. This should be reviewed for alignment with the error triad.

### 6.5 Git Decoration Colors

| State | Token | Value |
|-------|-------|-------|
| Added | `gitDecoration.addedResourceForeground` | `#81b88b` |
| Modified | `gitDecoration.modifiedResourceForeground` | `#e2c08d` |
| Deleted | `gitDecoration.deletedResourceForeground` | `#c74e39` |
| Untracked | `gitDecoration.untrackedResourceForeground` | `#73c991` |
| Conflicting | `gitDecoration.conflictingResourceForeground` | `#6c6cc4` |
| Ignored | `gitDecoration.ignoredResourceForeground` | `#8c8c8c` |
| Submodule | `gitDecoration.submoduleResourceForeground` | `#8db9e2` |

These colors follow established conventions (green=added, amber=modified, red=deleted) and should not be changed to berry-tinted variants. Users have strong mental models for git status colors.

### 6.6 Terminal ANSI Colors

Terminal ANSI colors are left at VS Code Dark+ defaults. This is intentional: terminal programs expect standard ANSI semantics. Red means error, green means success, yellow means warning. Remapping ANSI colors to match the berry syntax palette would break these expectations and confuse users reading colored terminal output.

---

## 7. Interaction State Standards

### 7.1 The State Ambiguity Problem

VS Code list and tree widgets combine interaction states in ways that can confuse users. A file in the Explorer can simultaneously be:
- Under the mouse cursor (hover)
- Receiving keyboard focus (focus)
- Previously clicked (selected)
- In a panel that lost focus (inactive selection)

If hover, focus, active selection, and inactive selection use colors that are too similar, users lose track of:
- Which item is merely under the mouse
- Which item has keyboard focus
- Which item was clicked
- Which item remains selected after focus moves to the editor

This section defines a clear visual hierarchy to prevent state ambiguity.

### 7.2 State Hierarchy Rule

States are ranked by visual strength from weakest to strongest:

```
Rest < Hover < Inactive Selection < Focus < Active Selection
```

Each state must be visually stronger than the one before it. "Stronger" means higher contrast against the parent surface, more saturated, or more opaque.

### 7.3 General Interaction State Matrix

| State | User Meaning | Visual Strength | Background Guidance | Foreground Guidance | Border/Outline Guidance | Common Failure Mode |
|-------|-------------|-----------------|--------------------|--------------------|------------------------|-------------------|
| **Rest** | No interaction | Baseline | Parent surface color | Standard text color | None | N/A |
| **Hover** | Mouse is over this item | Subtle | Slight background shift, barely visible | May brighten slightly | None typically | Making hover too strong, competing with focus |
| **Focus** | Keyboard navigation target | Clearly visible | Distinct background, noticeably different from hover | Bright, maximum readability | Focus ring/outline should be present | Invisible focus — users cannot tell where keyboard navigation is |
| **Active** | Currently being pressed/clicked | Momentary emphasis | Brief flash or depression | Stable | Optional | Lingering too long, confused with selected |
| **Selected** | Item was chosen and panel is focused | Strongest | Most opaque/prominent background | Brightest foreground | Optional outline for reinforcement | Too similar to hover; user cannot tell if click registered |
| **Active Selection** | Selected + panel has focus | Strongest | Same as selected — this IS the selected state when the panel is active | Brightest foreground | Focus+selection outline | Fading too much when panel is still focused |
| **Inactive Selection** | Selected but panel lost focus | Moderate | Visible but dimmer than active selection | Slightly muted compared to active | No outline typically | Completely invisible — user forgets what was selected |
| **Disabled** | Not interactive | Clearly reduced | Unchanged or slightly dimmed | Low-opacity foreground | None | Looking broken rather than intentionally dimmed |
| **Error** | Something is wrong | High, alarming | Error-tinted background or border | Error color or high-contrast text | Error-colored border | Too subtle — errors should be unmissable |
| **Warning** | Attention needed | Moderate-high | Warning-tinted background or border | Warning color or text | Warning-colored border | Too similar to error or too similar to info |
| **Success** | Operation completed | Moderate | Success-tinted briefly | Success color | Optional | Persisting too long or competing with selection |

### 7.4 List/Tree State Matrix (Pixel Berry Values)

These are the actual values in the theme JSON and the standard they must maintain:

| State | BG Token | BG Value | FG Token | FG Value | Visual Role |
|-------|----------|----------|----------|----------|-------------|
| Rest | (inherits) | `#221820` | (inherits) | `#c8bec2` | Sidebar base surface |
| Hover | `list.hoverBackground` | `#2e2228` | `list.hoverForeground` | `#c8bec2` | Subtle wine shift; indicates cursor position |
| Focus (keyboard) | `list.focusBackground` | `#52324a` | `list.focusForeground` | `#ffffff` | Wine-berry; distinct from hover; keyboard nav indicator |
| Active Selection | `list.activeSelectionBackground` | `#663a56` | `list.activeSelectionForeground` | `#ede5e8` | Strongest wine-berry state; confirms the click landed |
| Inactive Selection | `list.inactiveSelectionBackground` | `#382832` | `list.inactiveSelectionForeground` | `#c8bec2` | Muted wine; "this was selected before you moved away" |
| Drop Target | `list.dropBackground` | `#382832` | — | — | Temporary drag-and-drop indicator |
| Search Match | — | — | `list.highlightForeground` | `#ffb3d9` | Berry-pink text on matching characters |

Additional list tokens:

| Token | Value | Purpose |
|-------|-------|---------|
| `list.focusOutline` | `#b8889880` | Semi-transparent Soft Berry outline reinforcing keyboard focus |
| `list.focusAndSelectionOutline` | `#b88898` | Full Soft Berry outline for combined focus+selection state |
| `list.inactiveFocusBackground` | Not currently set | Focus indicator when panel is inactive |
| `tree.indentGuidesStroke` | `#4a3542` | Wine-tinted indent guide lines in tree views |
| `listFilterWidget.background` | `#52324a` | Wine-tinted type-to-filter search box in lists |
| `listFilterWidget.noMatchesOutline` | `#d49198` | Warm rose outline when filter finds nothing |

**Design note:** All list interaction states use wine-berry tinted values, creating a unified visual language. The hierarchy progresses from barely-visible wine (hover) through muted wine (inactive selection) to saturated wine-berry (focus, active selection). Focus and focus+selection outlines in Soft Berry (`#b88898`) reinforce keyboard navigation visibility.

### 7.5 Tab States

| State | Background | Foreground | Other |
|-------|-----------|------------|-------|
| Active tab | `#292026` (editor level) | `#ede5e8` (text.primary) | Matches editor surface — tab "opens into" the editor |
| Inactive tab | `#221820` (sidebar level) | `#ede5e880` (~50% primary) | Receded; dimmed foreground creates clear hierarchy |
| Hover (inactive) | `#2e2228` (between sidebar and editor) | `#ede5e8` (text.primary) | Subtle brightening signals interactivity |
| Unfocused active | `#292026` | `#c8bec2` (text.secondary) | Dimmed text signals the editor group lost focus |
| Unfocused inactive | `#221820` | `#ede5e860` (text.disabled) | More muted than focused inactive |
| Unfocused hover | `#2e2228` | `#c8bec2` (text.secondary) | Hover still works in unfocused groups |
| Tab border | — | — | `#3c2c35` wine-tinted side border between tabs |

The active tab must always match `editor.background` so the tab appears to be part of the editor, not a separate element floating above it. The hover background `#2e2228` sits at L*~12 between sidebar (L*10) and editor (L*14) to ensure it never matches the active tab.

### 7.6 Button States

| State | Background | Foreground |
|-------|-----------|------------|
| Primary rest | `#a04060` (muted wine-berry) | `#ffffff` |
| Primary hover | `#c46878` (warm berry-rose) | `#ffffff` |
| Secondary rest | `#382832` (dark wine) | `#e8dfe8` |
| Secondary hover | `#4a3442` (lighter dark wine) | (inherits) |

Buttons are one of the few places where the berry palette appears in interactive states. The hover brightening should be noticeable but not jarring.

### 7.7 Scrollbar States

| State | Token | Value |
|-------|-------|-------|
| Rest | `scrollbarSlider.background` | `#79797966` (~40% gray) |
| Hover | `scrollbarSlider.hoverBackground` | `#646464b3` (~70% gray) |
| Active (dragging) | `scrollbarSlider.activeBackground` | `#bfbfbf66` (~40% light gray) |

Scrollbars use neutral grays with alpha channels. They should never be themed to berry colors — scrollbars are utility elements, not decorative ones.

### 7.8 Menu States

| State | Background | Foreground |
|-------|-----------|------------|
| Rest | `#241c22` | `#c8bec2` |
| Selection | `#52324a` (wine-berry) | `#ffffff` |
| Separator | `#3c2c35` | — |

Menu selection matches `list.focusBackground`, maintaining consistency between keyboard navigation in lists and menus.

### 7.9 Input States

| State | Token | Value |
|-------|-------|-------|
| Rest background | `input.background` | `#30242c` |
| Rest foreground | `input.foreground` | `#c8bec2` |
| Placeholder | `input.placeholderForeground` | `#a09498` |
| Active option | `inputOption.activeBackground` | `#c8a09866` (wine-tinted) |
| Validation error | `inputValidation.errorBackground` | `#5a1d1d` |
| Validation error border | `inputValidation.errorBorder` | `#be1100` |
| Validation warning border | `inputValidation.warningBorder` | `#9b5900` |
| Validation info border | `inputValidation.infoBorder` | `#007acc` |

The input active option uses a warm wine tint (`#c8a09866`), consistent with the wine palette.

### 7.10 Title Bar / Menu Bar Interaction States

| State | Background | Foreground | Notes |
|-------|-----------|------------|-------|
| Active window | `#221820` (surface.mid) | `#ede5e8` (text.primary) | Dark wine — matches sidebar level |
| Inactive window | `#1b1318` (surface.deepest) | `#8e8488` (text.muted) | Subtly darker, muted text signals inactive |
| Menu hover | `#292026` (surface.editor) | `#ede5e8` (text.primary) | Slight elevation, foreground stays consistent |
| Command center rest | `#292026` (surface.editor) | `#c8bec2` (text.secondary) | Editor-level inset, secondary text like a search field |
| Command center active | `#382832` (selection.inactiveList) | `#ede5e8` (text.primary) | Wine-berry active state, primary text |
| Command center inactive | — | `#8e8488` (text.muted) | Matches inactive title bar text |

### 7.11 Status Bar Interaction States

| State | Background | Foreground | Notes |
|-------|-----------|------------|-------|
| Normal | `#221820` (surface.mid) | `#ede5e8` (text.primary) | Dark wine — matches sidebar/title bar |
| Item hover | `#2e2228` (selection.hover) | `#ede5e8` (text.primary) | Wine-tinted hover, consistent with list hover |
| Item active/press | `#382832` (selection.inactiveList) | `#ede5e8` (text.primary) | Stronger than hover, momentary |
| Debugging | `#5a3548` (dark wine-purple) | `#ede5e8` (text.primary) | Clearly different mode |
| No folder | `#292026` (surface.editor) | `#ede5e8` (text.primary) | Slightly lighter to signal no-folder state |
| Remote indicator | `#c44560` (accent.primary) | `#ffffff` (max emphasis) | Accent badge — the one loud element on the status bar |
| Error | `#8b2d2d` (dark brick red) | `#ede5e8` (text.primary) | Distinct from wine; ~6.2:1 contrast |
| Warning | `#7a5c00` (dark amber) | `#ede5e8` (text.primary) | Distinct from both wine and error; ~7.6:1 |
| Prominent | `#292026` (surface.editor) | `#ede5e8` (text.primary) | Slightly elevated for emphasis |

### 7.12 Toolbar Interaction States

| State | Background | Notes |
|-------|-----------|-------|
| Rest | (transparent) | Icons use `icon.foreground` (`#ede5e8`) |
| Hover | `#52324a58` (~35% wine overlay) | Subtle wine tint |
| Active/press | `#52324a80` (~50% wine overlay) | Stronger than hover |

---

## 8. Color Token Strategy

VS Code's theme JSON does not support design-token indirection natively. Pixel Berry
nonetheless treats its palette as a set of **conceptual tokens**: every hex in the theme
maps to one named token (a syntax role, a surface level, an accent, and so on). When
editing the theme, pick an existing token rather than introducing a new hex.

> **The token catalogue — every value, its name, and the VS Code Color IDs / TextMate
> scopes that use it — lives in [`PALETTE_INDEX.md`](./PALETTE_INDEX.md)**, regenerated
> from the theme JSON by `scripts/palette-index.mjs`. This section owns the *rules* for
> assigning tokens; PALETTE_INDEX owns the *values*. Rerun the generator when colours
> change; edit this section when the assignment philosophy changes.

The conceptual token families (see PALETTE_INDEX for the hex behind each):

| Family | Tokens | Defined / discussed in |
|--------|--------|------------------------|
| Surface | `surface.deepest · mid · editor · widget · input` | §4.1, §6.1 |
| Text | `text.primary · editor · secondary · muted · inverse` | §6.3 |
| Border | `border.wine · wine.alpha · menu · transparent` | §4.4 |
| Accent | `accent.primary · muted · softberry · buttonhover · cursor · widget` | §2.2, §6.2 |
| Selection | `selection.active · secondary · hover · focus · activeList · inactiveList` | §7 |
| Diagnostic | `diagnostic.error · warning · info · success` | §6.4 |
| Syntax | `syntax.keyword … comment` + error/deprecated/unimplemented | §2.3, ratios §9.1 |
| Chrome | `chrome.status.error · warning` (derived states) | §7 |

### 8.1 Token Assignment Rules

1. When adding a new syntax rule, pick from the syntax roles in [`PALETTE_INDEX.md` §1](./PALETTE_INDEX.md#1-syntax-roles-tokencolors-foregrounds). Do not introduce ad-hoc hex values for one-off rules.
2. Language-specific overrides must still use values from the palette. A Python-specific rule uses the same palette, just mapped to different scopes.
3. The only error exception is `syntax.error`, used for `invalid.illegal` / `invalid.broken` / `token.error-token`. This "hard error" red is distinct from `diagnostic.error` — invalid syntax in the editor is more urgent than a linter warning. `invalid.deprecated` (`syntax.deprecated`, muted + strikethrough) and `invalid.unimplemented` (`syntax.unimplemented`) are deliberately *not* red — deprecated/unimplemented are not errors.
4. If a genuinely new semantic role emerges (e.g., a distinct "decorator" color), add it to the CURATED map in `scripts/palette-index.mjs` and regenerate PALETTE_INDEX.md before adding hex values to the theme JSON.
5. **Palette revisions are permitted.** When the entire palette is being revised for readability, distinctness, or identity reasons, update the theme JSON, then regenerate `PALETTE_INDEX.md` (and update the CURATED map in `scripts/palette-index.mjs` if any role/token *name* changes). Update CHANGELOG.md and Section 9.1 simultaneously.
6. **Operators:** *symbolic* operators (`+ - * / = == && || << ::` …) use `syntax.operator` consistently across every language — no per-language operator colours. *Word-form* operators (`new`, `typeof`, `instanceof`, `in`, `of`, `and`/`or`/`not`, …) use `syntax.keyword`.
7. **Variables vs properties:** plain variables/parameters use `syntax.variable`; object/JSON keys and member properties use `syntax.property`. Keep them distinct — do not collapse to one tone.

---

## 9. Contrast and Accessibility Standards

All ratios in this section are computed using the WCAG 2.x relative luminance formula. WCAG thresholds referenced: **SC 1.4.3** (AA) requires 4.5:1 for normal text, 3:1 for large text and UI components; **SC 1.4.6** (AAA) requires 7:1 for normal text, 4.5:1 for large text.

### 9.1 Syntax Color Ratios (foreground on editor `#292026`)

Recomputed for the v0.1.0 palette. Every token clears AA-normal (4.5:1); the
lowest are punctuation/deprecated/unimplemented/error/comment at ~4.9-5.4:1, which
is intentional (glue and muted states are de-emphasised).

| Pair | Foreground | Ratio | AA Normal | AA Large | AAA Normal |
|------|-----------|-------|-----------|----------|------------|
| Keywords / booleans | `#ff7ba8` | 6.5:1 | Pass | Pass | Fail |
| Functions / tags | `#ffb0cf` | 9.3:1 | Pass | Pass | Pass |
| Types | `#ddb0ec` | 8.7:1 | Pass | Pass | Pass |
| Constants | `#8fb0f2` | 7.3:1 | Pass | Pass | Pass |
| Numbers | `#e8c98a` | 9.9:1 | Pass | Pass | Pass |
| Strings | `#a8d8a8` | 9.8:1 | Pass | Pass | Pass |
| Regex literal | `#9ed0c4` | 9.2:1 | Pass | Pass | Pass |
| Links | `#86c0cc` | 7.9:1 | Pass | Pass | Pass |
| Variables | `#e8c5d6` | 10.1:1 | Pass | Pass | Pass |
| Properties | `#d8c2d2` | 9.5:1 | Pass | Pass | Pass |
| Operators | `#aeb0a8` | 7.2:1 | Pass | Pass | Pass |
| Punctuation | `#978d94` | 4.9:1 | Pass | Pass | Fail |
| Comments | `#a8919e` | 5.4:1 | Pass | Pass | Fail |
| Deprecated | `#9e8a96` | 4.9:1 | Pass | Pass | Fail |
| Error | `#f06a6a` | 5.3:1 | Pass | Pass | Fail |
| Unimplemented | `#968ca0` | 4.9:1 | Pass | Pass | Fail |

### 9.2 UI Text Ratios

| Pair | Foreground | Background | Ratio | AA Normal | AA Large | AAA Normal |
|------|-----------|------------|-------|-----------|----------|------------|
| Editor text | `#e8dfe8` | `#292026` | ~11.5:1 | Pass | Pass | Pass |
| UI foreground | `#ede5e8` | `#292026` | ~12.2:1 | Pass | Pass | Pass |
| Sidebar text | `#c8bec2` | `#221820` | ~9.1:1 | Pass | Pass | Pass |
| Line numbers | `#8e8488` | `#292026` | ~4.5:1 | Pass | Pass | Fail |
| Status bar text | `#ede5e8` | `#221820` | ~14.0:1 | Pass | Pass | Pass |
| Title bar text | `#ede5e8` | `#221820` | ~14.0:1 | Pass | Pass | Pass |
| Title bar inactive | `#8e8488` | `#1b1318` | ~5.2:1 | Pass | Pass | Fail |
| Widget text | `#c8bec2` | `#241c22` | ~9.0:1 | Pass | Pass | Pass |
| Notification text | `#c8bec2` | `#241c22` | ~9.0:1 | Pass | Pass | Pass |
| Placeholder text | `#a09498` | `#30242c` | ~4.5:1 | Pass | Pass | Fail |
| Breadcrumb text | `#c8bec2` at 80% | `#292026` | ~6.5:1 | Pass | Pass | Fail |
| Inactive tab text | `#ede5e8` at 50% | `#221820` | ~5.0:1 | Pass | Pass | Fail |

### 9.3 Selection Overlay Verification

Editor selections use alpha-blended backgrounds. The composited selection background must not drop text contrast below 4.5:1.

| Selection | Overlay | Composited BG | Text FG | Ratio | AA Normal |
|-----------|---------|---------------|---------|-------|-----------|
| Editor selection | `#4a2e5080` over `#292026` | `#3a282b` | `#e8dfe8` | ~10.2:1 | Pass |

### 9.4 Accepted Exceptions and Contrast Philosophy

**Comments at ~4.7:1 — passes AA normal.** The comment color `#a8919e` (plum-gray) achieves ~4.7:1 on `#292026`. Comments recede visually but remain readable at a glance during prolonged coding sessions. Target 4.5–6:1 for comments.

**No hard upper ceiling on syntax contrast.** Higher contrast is preferred for prolonged readability. Syntax token ratios up to ~13:1 are acceptable as long as the color retains its hue identity and does not appear washed-out or near-white. The practical limit is determined by color distinction, not by a fixed ratio cap.

**Status bar text.** Uses `#ede5e8` on `#221820` (~14.0:1), well above AAA.

**Line numbers at ~4.5:1 — passes AA normal.** `#8e8488` on `#292026`. Borderline but passing. Could be bumped if feedback indicates readability issues.

**Placeholder text at ~4.5:1 — passes AA normal.** `#a09498` on `#30242c`. Minimal margin. If `input.background` changes, recheck this pair.

### 9.5 Color Vision Deficiency Considerations

The syntax colors must remain distinguishable under protanopia, deuteranopia, and tritanopia simulation. Verify using: VS Code DevTools > Rendering > "Emulate vision deficiency" or Sim Daltonism.

Key risk pairs:

- **Variables (`#e8c5d6`, dusty rose) vs. functions (`#ffb0cf`, rose):** Same hue family — the primary v0.1.0 pair to watch. Separated by saturation and luminance (10.1:1 vs. 9.3:1); functions are vivid and in call position, variables muted and in identifier position.
- **Keywords (`#ff7ba8`) vs. strings (`#a8d8a8`):** Differ in both hue and luminance (6.5:1 vs. 9.8:1). Remain separable under red-green CVD.
- **Types (`#ddb0ec`, orchid) vs. properties (`#d8c2d2`, lilac):** Both lean violet; differ in saturation and lightness (8.7:1 vs. 9.5:1). Constants moved to cornflower (`#8fb0f2`) in v0.1.0, so the former type/constant violet collision no longer applies.
- **Regex (`#9ed0c4`, teal-mint) vs. links (`#86c0cc`, teal):** Adjacent teals; real-world adjacency is low (links are markdown/URLs).
- **Error (`#f48771`) vs. warning (`#cca700`):** Differ in luminance as well as hue. Separable under most CVD types.

### 9.6 Minimum Standards for Future Changes

1. Any new foreground on `#2a2230` must achieve ≥ 4.5:1 for comments/muted text or ≥ 5:1 for active code tokens. Higher contrast is encouraged for readability — there is no hard upper cap as long as the color retains hue identity.
2. Any foreground on accent backgrounds (`#c44569`, `#a04068`) must achieve ≥ 3:1 for UI components.
3. Selection backgrounds (alpha-blended) must not cause foreground text to drop below 4.5:1 when composited over the editor background. Compute the composited background, then check the ratio.
4. Color must not be the only indicator of state. Errors need squiggles (not just red text), focus needs outlines (not just background), selections need both background and foreground changes.
5. Error, warning, and success states must be distinguishable through both hue and luminance differences.
6. When adding or changing any color, compute the exact ratio — do not estimate. Use the WCAG relative luminance formula or a tool like the WebAIM Contrast Checker.

---

## 10. Syntax Highlighting Standards

### 10.1 Universal Token-to-Color Mapping

The syntax roles catalogued in [`PALETTE_INDEX.md` §1](./PALETTE_INDEX.md#1-syntax-roles-tokencolors-foregrounds) form the baseline palette. All languages start from these generic TextMate scope assignments. Language-specific overrides (below) refine the mapping where a language's grammar requires it.

### 10.2 Font Style Rules

| Style | Applied To | Rationale |
|-------|-----------|-----------|
| `italic` | Comments, `this`/`self`/`super`, HTML/JSX/TSX attributes, variable parameters, Python control flow, Markdown emphasis | Marks "meta" or contextual tokens |
| `normal` (explicit) | CSS `#id` selectors, CSS class attributes | Overrides inherited italic from generic attribute rules |
| `bold` | Not used | Bold competes with color for attention and creates visual heaviness |

### 10.3 Language-Specific Guidelines

#### JavaScript / TypeScript

The most extensively customized language in the theme (~25 specific rules).

- Template literal delimiters use `syntax.string`, not `syntax.keyword`
- Compound assignment operators use `syntax.operator`, not `syntax.keyword`
- `console` uses `syntax.variable`, not `syntax.type`
- DOM types (`support.type.object.dom`) use `syntax.variable`
- DOM variables (`support.variable.dom`, `support.variable.property.dom`) use `syntax.property`
- JSX/TSX attributes are italic
- Flow/TS primitive types use `syntax.type`
- Import/export keywords use `syntax.function` — treated as "actions" rather than control flow

#### Python

- `self` parameter uses `syntax.variable`, marked italic — same colour as other parameters, distinguished only by italic
- Function parameters use `syntax.variable`
- Decorators (`@` and the decorator name) use `syntax.function`
- Logical operators (`and`, `or`, `not`) use `syntax.keyword` — in Python these are words, not symbols, so they earn keyword treatment
- Control flow keywords (`import`, `if`, `for`) are italic

#### JSON

- Keys use `syntax.property`
- String values use `syntax.string`
- Boolean/null constants use `syntax.keyword`

#### HTML / XML

- Tags use `syntax.function`
- Attributes use `syntax.constant` with italic
- String attribute values use `syntax.string`

#### CSS / SCSS / LESS

- Property values and color names use `syntax.constant`
- Vendor-prefixed properties use `syntax.property`
- Pseudo-elements/classes use `syntax.constant`
- Class selectors use `syntax.constant`
- ID selectors use `syntax.function` with explicit `normal` style (not italic)

#### Rust

- Lifetime annotations (`'a`) use `syntax.type`
- `self`/language variables use `syntax.variable`
- Sigil operators (`&`, `*`) use `syntax.operator`

#### Java

- Source-level default is `syntax.variable`
- Type annotations use `syntax.function`; storage types and generics use `syntax.keyword`
- Method names use `syntax.function`
- Most structural punctuation (braces, method parens, separators) uses `syntax.function` via a broad Java rule — an intentional departure from the global `syntax.punctuation`

#### Go

- Operators (`:=`, arithmetic, address) use `syntax.operator` — unified with the global symbolic-operator rule
- Package names use `syntax.type`

#### Markdown

Markdown receives extensive customization as a first-class language for developers:

- Headings use `syntax.function`
- Bold uses `syntax.constant`
- Italic uses `syntax.keyword` with italic style
- Inline code uses `syntax.string`
- Links use `syntax.link`
- List markers use `syntax.punctuation`
- Blockquote markers use `syntax.comment`

#### React / TSX

TSX inherits all JavaScript/TypeScript rules plus:
- JSX component tags follow the same rules as HTML tags (`syntax.function`)
- JSX attributes are italic (same as HTML attributes)
- Expression braces in JSX use standard punctuation color

### 10.4 Adding Support for a New Language

When adding syntax rules for a new language:

1. Start by opening a representative file in the VS Code Extension Development Host (F5).
2. Use the "Developer: Inspect Editor Tokens and Scopes" command to identify the TextMate scopes emitted by the language grammar.
3. Map each scope to one of the syntax tokens. Do not create new hex values.
4. If the language has a "special" keyword (like Python's `self` or Go's `:=`), consider whether it deserves a deliberate departure from the generic mapping. Document the reasoning.
5. Add language-specific rules to `tokenColors` grouped together in the JSON.
6. If the language has strong LSP support, also add `semanticTokenColors` rules.

---

## 11. Testing Checklist

Run this checklist before every version bump. Run Sections 11.1–11.4 after any individual color change.

### 11.1 Syntax Highlighting Smoke Test

Open each file type in the Extension Development Host (F5) and verify colors match the syntax token assignments:

- [ ] TypeScript (`.ts`) — keywords pink, functions rose, types lavender, strings sage
- [ ] Python (`.py`) — decorators green/rose, `self` lavender, logical operators pink
- [ ] Rust (`.rs`) — lifetimes lavender, `self` rose-mauve, `&`/`*` pink
- [ ] Java (`.java`) — annotations lavender, methods rose, all punctuation mauve
- [ ] HTML (`.html`) — tags rose-mauve, attributes lavender (italic), values sage
- [ ] CSS (`.css`) — selectors pink, properties mauve, values lavender, pseudo-classes green
- [ ] JSON (`.json`) — keys rose-mauve, string values sage, booleans green
- [ ] Markdown (`.md`) — headings rose-mauve, bold lavender, italic pink, code sage
- [ ] Go (`.go`) — `:=` lavender, arithmetic pink, package names lavender
- [ ] PHP (`.php`) — class variables rose-mauve, function calls rose, operators green
- [ ] C/C++ (`.c`/`.cpp`) — operators pink, POSIX types green
- [ ] Shell/Bash (`.sh`) — verify no unexpected fallback to plain white

### 11.2 Workbench Chrome Verification

- [ ] Surface gradient visible: panel is darkest, sidebar is mid, editor is lightest
- [ ] Status bar: dark wine `#221820` background with warm white `#ede5e8` text
- [ ] Title bar active: matches status bar wine background
- [ ] Title bar inactive: darkest wine `#1b1318` — smooth transition from active
- [ ] Menu bar hover: editor-level surface visible, text readable
- [ ] Command center: visible inset on title bar, click deepens bg, inactive window dims text
- [ ] Active tab background matches editor `#292026`; inactive matches sidebar `#221820`
- [ ] Tab hover: subtle brightening to `#2e2228`, text brightens to primary
- [ ] Tab unfocused: active tab dims to secondary text, inactive dims further
- [ ] Activity bar icons: warm white `#ede5e8`, not pure cold white
- [ ] Activity bar badge: raspberry `#c44560` badge with white foreground text
- [ ] Side bar section headers: rose-tinted foreground `#d49198` on sidebar background
- [ ] Sidebar title and text: `#c8bec2` secondary text, not `#ffffff`
- [ ] Breadcrumb bar: matches editor background, not tab bar
- [ ] Status bar hover: wine-tinted `#2e2228` on items
- [ ] Status bar active: deeper wine `#382832` on press
- [ ] Status bar remote indicator: raspberry `#c44560` with white text
- [ ] Status bar error state: dark brick red with warm white text
- [ ] Status bar warning state: dark amber with warm white text
- [ ] Toolbar icon hover: subtle wine overlay, active slightly stronger
- [ ] No pure `#ffffff` in chrome foregrounds (only in badges, focus state foreground)

### 11.3 Interaction State Verification

- [ ] Explorer hover: subtle wine-tinted `#2e2228` background when mousing over files
- [ ] Explorer keyboard focus: wine-berry `#52324a` focus indicator with Soft Berry outline
- [ ] Explorer active selection: click a file, confirm `#663a56` background with `#b88898` outline
- [ ] Explorer inactive selection: click into editor, confirm selected file dims to `#382832`
- [ ] Command Palette: selected row is clearly highlighted
- [ ] Search match highlight: berry-pink (`#ffb3d9`) match text in search results
- [ ] Menu selection: wine-berry `#52324a` selection background in context menus
- [ ] Button hover: warm berry-rose `#c46878` brightening on hover
- [ ] Scrollbar: thumb visible on hover, brighter when dragging

### 11.4 Editor State Verification

- [ ] Cursor: pink (`#ffb3d9`) blinking cursor visible against plum background
- [ ] Selection: semi-transparent plum overlay, text underneath remains readable
- [ ] Find match: current match highlighted, all matches with orange tint
- [ ] Word highlight: click a variable, other occurrences subtly highlighted
- [ ] Bracket matching: bracket match background/border visible
- [ ] Error squiggles: create a syntax error, confirm salmon underline (`#f48771`)
- [ ] Warning squiggles: trigger a linter warning, confirm amber underline (`#cca700`)
- [ ] Suggest widget: autocomplete with wine-tinted background, rose (`#d49198`) match text
- [ ] Inline suggestions (ghost text): visible but clearly dimmer than real code

### 11.5 Terminal Verification

- [ ] ANSI colors render correctly (run a colored test script or `ls --color`)
- [ ] Terminal cursor: white cursor on panel background
- [ ] Terminal selection: white-tinted overlay on selected text

### 11.6 Git Integration Verification

- [ ] Modified files: amber/gold (`#e2c08d`) text in explorer
- [ ] Added files: muted green (`#81b88b`) text
- [ ] Deleted files: rust-red (`#c74e39`) text
- [ ] Untracked files: green (`#73c991`) text
- [ ] Gutter indicators: modified (teal), added (gray), deleted (red) gutter bars

### 11.7 Diff Editor Verification

- [ ] Inserted lines: green-tinted background
- [ ] Removed lines: red-tinted background
- [ ] Changed text: inline changes visible within modified lines

### 11.8 Notification and Badge Verification

- [ ] Error notification: icon visible, not confused with warning
- [ ] Warning notification: amber icon
- [ ] Info notification: blue icon
- [ ] Activity bar badge: rose-pink with dark text, number readable

### 11.9 Accessibility Verification

- [ ] Run DevTools > Rendering > Emulate vision deficiency (protanopia, deuteranopia, tritanopia)
- [ ] Verify all syntax colors remain distinguishable under each simulation
- [ ] Verify status bar text remains readable under each simulation
- [ ] Verify error/warning/info triad remains distinguishable

### 11.10 Edge Cases

- [ ] Zen mode: editor background fills screen without seams
- [ ] Split editor: group borders visible between panes
- [ ] Minimap: background matches editor, find matches visible
- [ ] Peek view: peek editor background contrasts with main editor
- [ ] Sticky scroll: header rows readable, don't blend into editor content
- [ ] Breadcrumbs: readable, background matches editor surface

### 11.11 Cross-Editor Compatibility

Where applicable, verify in:
- [ ] VS Code (primary target)
- [ ] Cursor (VS Code fork — should render identically)
- [ ] Windsurf (VS Code fork — check for any custom overrides)

---

## 12. Anti-Patterns

These are mistakes to avoid when editing the theme.

1. **Do not use `#ffffff` for syntax colors.** White is reserved for `invalid.illegal` tokens and maximum-emphasis UI text (active selection foreground, badges). Using white for syntax destroys the palette hierarchy.

2. **Do not introduce new hex values when an existing conceptual token fits.** The syntax colors and five surface levels cover all needs. A new hex value is a maintenance burden and a palette drift risk. Check [`PALETTE_INDEX.md`](./PALETTE_INDEX.md) for current values, and Section 8 for the assignment rules, before adding any color.

3. **Do not theme terminal ANSI colors to match the syntax palette.** Terminal programs expect standard ANSI semantics — red means error, green means success. Remapping breaks user expectations.

4. **Do not use opaque backgrounds for editor selections.** Selections overlay syntax-colored text. An opaque selection background hides the syntax color underneath, removing context about what is selected. Always use alpha-blended backgrounds.

5. **Do not apply `fontStyle: "bold"` to syntax tokens.** Bold competes with color for attention and creates visual heaviness. Pixel Berry uses only `italic` and `normal`.

6. **Do not make hover and selected states look identical.** If a user cannot tell whether they clicked an item or are merely hovering over it, the state system has failed. Hover must be weaker than selection.

7. **Do not make the focus state invisible.** Focus is the keyboard navigation indicator. If it looks the same as rest or hover, keyboard users cannot navigate the UI. Focus should be clearly distinct.

8. **Do not make inactive selection too faint.** When a user selects a file, clicks into the editor, and then looks back at the sidebar, the selected file should still be identifiable. Inactive selection should be dimmer than active selection but not invisible.

9. **Do not forget that `semanticTokenColors` overrides `tokenColors`.** The three semantic rules currently defined silently override any TextMate rule for the same token when the language server provides semantic data. Test with semantic highlighting both on and off.

10. **Do not use the raspberry accent (`#c44560`) as a large surface background.** The accent is reserved for small high-signal elements (progress bar, remote badge, buttons). The title bar and status bar use dark wine surfaces with light foreground text. Using a saturated accent as a bar background forces low-contrast dark foreground text.

11. **Do not use too many saturated colors.** If more than one UI surface is visually "loud," the theme becomes fatiguing. Only the cursor and small accent indicators should be high-saturation.

12. **Do not make the sidebar compete with the editor for attention.** The sidebar serves navigation; the editor is where work happens. The sidebar should always be visually subordinate (darker, more muted). Sidebar foreground should be `#c8bec2` (secondary), never `#ffffff`.

13. **Do not rely only on color to indicate errors and warnings.** Underlines, icons, borders, and text labels should reinforce what color communicates. This benefits users with color vision deficiencies and those working on uncalibrated displays.

14. **Do not change one interaction state without checking related states.** Changing `list.hoverBackground` without reviewing `list.focusBackground`, `list.activeSelectionBackground`, and `list.inactiveSelectionBackground` risks collapsing the state hierarchy. Always review the full state matrix in [Section 7.4](#74-listtree-state-matrix-pixel-berry-values).

---

## 13. Maintenance Rules

### 13.1 Palette Discipline

When a new hex value is proposed, check the token catalogue in [`PALETTE_INDEX.md`](./PALETTE_INDEX.md). If an existing token serves the same role, use it. If a genuinely new role exists, add it to the CURATED map in `scripts/palette-index.mjs` (with a name and rationale recorded here) and regenerate before adding it to the theme JSON. One-in, one-out: if a token is removed, delete it from the theme JSON and regenerate PALETTE_INDEX.md.

### 13.2 Upstream Reconciliation

When Pink Panda (the upstream theme) releases updates, compare their scope additions against the Pixel Berry `tokenColors` array. Add new scopes using Pixel Berry's palette, not upstream's colors. The scope structure can be inherited; the color assignments must not.

### 13.3 Version Engine Pinning

The `"vscode"` engine field is `^1.72.0`. When using workbench tokens introduced in newer VS Code versions (e.g., `editorBracketHighlight` from 1.60, `editorInlayHint` from 1.67, `editorStickyScroll` from 1.71), only bump the engine minimum if the token is essential to the theme's core experience.

### 13.4 Changelog Discipline

Every color change must be documented in `CHANGELOG.md` with:
- The VS Code token name or TextMate scope
- The old hex value
- The new hex value
- The reason for the change

### 13.5 Testing Cadence

- **Full checklist** (all of Section 11): before every version bump
- **Partial checklist** (Sections 11.1–11.4): after any individual color change
- **Accessibility check** (Section 11.9): when adding or changing syntax colors

### 13.6 Semantic Token Expansion

The current three semantic token rules are minimal. When expanding:
- Prefer semantic tokens over TextMate for languages with strong LSP support: TypeScript, Rust, Python, Go, Java, C#
- Each new semantic rule should map to an existing syntax role from [`PALETTE_INDEX.md` §1](./PALETTE_INDEX.md#1-syntax-roles-tokencolors-foregrounds)
- Document new semantic rules in [Section 5.6](#56-current-semantic-token-coverage)

### 13.7 Known Issues to Track

These are identified inconsistencies or refinement candidates:

- No open issues as of v0.1.0. (The earlier `variable.other.constant` vs semantic `variable.constant` mismatch and the C/C++ punctuation-separator inheritance were both resolved in the v0.1.0 palette swap.)

### 13.8 Light Theme Strategy

If a light variant is created:
- Share the same conceptual token names with inverted luminance
- Surface tokens shift to light cream/lavender tints
- Accent tokens use deeper, more saturated berry/raspberry to maintain contrast
- Syntax colors need darkened variants of the same hue families
- Create a companion section in this document or a separate `DESIGN_STANDARDS_LIGHT.md`
- The light variant should be developed against the same testing checklist with adjusted expected values

### 13.9 Document Maintenance

Update this document when:
- Introducing a new palette direction or accent color
- Adding support for a new language
- Changing the interaction state hierarchy
- Expanding semantic token coverage
- Resolving any of the known issues listed above
- Receiving user feedback about readability or accessibility
