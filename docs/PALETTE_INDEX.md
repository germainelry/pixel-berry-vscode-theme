# Pixel Berry — Palette Index

The authoritative catalogue of **every colour value** in the theme: syntax roles,
semantic overrides, curated workbench tokens, and inherited defaults.

This file owns *values*; `DESIGN_STANDARDS.md` owns *rules and rationale*. When colours
change, regenerate this file. When the design philosophy changes, edit DESIGN_STANDARDS.

The index below is generated from `themes/pixel-berry-color-theme.json`. To refresh it
after a palette edit:

```bash
node scripts/palette-index.mjs
```

<!-- GENERATED:palette-index START — do not edit by hand; run `node scripts/palette-index.mjs` -->

> **Generated** for Pixel Berry **v0.1.3** by `scripts/palette-index.mjs`.
> Do not hand-edit this block. Update colours in the theme JSON (and the CURATED map
> in the script if a role/token name changes), then rerun the script.

**Totals:** 21 syntax foreground values · 122 workbench values · **141 distinct hex strings** across the whole theme.

### 1. Syntax roles (`tokenColors` foregrounds)

| Role | Hex | Usages |
|---|---|---:|
| keyword | `#ff7ba8` | 28 |
| function | `#ffb0cf` | 24 |
| type | `#ddb0ec` | 26 |
| namespace | `#c0a6d8` | 7 |
| constant | `#8fb0f2` | 29 |
| number | `#e8c98a` | 5 |
| string | `#a8d8a8` | 15 |
| regexp | `#9ed0c4` | 3 |
| link | `#86c0cc` | 3 |
| variable | `#e8c5d6` | 26 |
| property | `#c9b9cb` | 10 |
| operator | `#aeb0a8` | 21 |
| punctuation | `#978d94` | 22 |
| comment | `#a8919e` | 5 |
| deprecated | `#9e8a96` | 1 |
| error | `#f06a6a` | 5 |
| unimplemented | `#968ca0` | 1 |

**Non-role foregrounds** (diff-markup colours + Xi-grammar leftovers):

| Hex | Usages | Where |
|---|---:|---|
| `#d17b8b` | 1 | markup.deleted.diff (dedicated removed-diff red) |
| `#e8dfe8` | 1 | body text fallback / invalid.xi (= text.editor) |
| `#b8a3e8` | 1 | wikiword.xi (former constant tone) |
| `#ffffff` | 1 | constant.other.color.rgb-value.xi (= text.inverse) |

### 2. Semantic token overrides

| Semantic token | Hex |
|---|---|
| `enumMember` | `#8fb0f2` |
| `variable.constant` | `#8fb0f2` |
| `variable.defaultLibrary` | `#ddb0ec` |

### 3. Curated workbench tokens (`colors`)

Conceptual tokens from DESIGN_STANDARDS.md §8. Each value lists the VS Code Color IDs that use it.

#### Surface

| Token | Hex | Color IDs |
|---|---|---|
| `surface.deepest` | `#1b1318` | `panel.background`, `peekViewTitle.background`, `titleBar.inactiveBackground` |
| `surface.mid` | `#221820` | `activityBar.activeBackground`, `editorGroupHeader.tabsBackground`, `sideBar.background`, `sideBarSectionHeader.background`, `statusBar.background`, `tab.inactiveBackground`, `titleBar.activeBackground` |
| `surface.editor` | `#292026` | `activityBar.background`, `breadcrumb.background`, `commandCenter.background`, `debugExceptionWidget.background`, `debugToolBar.background`, `editor.background`, `editorGroup.emptyBackground`, `editorGutter.background`, `menubar.selectionBackground`, `minimap.background`, `notificationCenterHeader.background`, `statusBar.noFolderBackground`, `statusBarItem.prominentBackground`, `tab.activeBackground` |
| `surface.widget` | `#241c22` | `editorHoverWidget.background`, `editorSuggestWidget.background`, `editorWidget.background`, `menu.background`, `notifications.background`, `peekViewResult.background` |
| `surface.input` | `#30242c` | `checkbox.background`, `dropdown.background`, `input.background` |

#### Text

| Token | Hex | Color IDs |
|---|---|---|
| `text.primary` | `#ede5e8` | `activityBar.foreground`, `breadcrumb.activeSelectionForeground`, `breadcrumb.focusForeground`, `commandCenter.activeForeground`, `foreground`, `icon.foreground`, `list.activeSelectionForeground`, `menubar.selectionForeground`, `settings.headerForeground`, `statusBar.debuggingForeground`, `statusBar.foreground`, `statusBar.noFolderForeground`, `statusBarItem.errorForeground`, `statusBarItem.hoverForeground`, `statusBarItem.warningForeground`, `tab.activeForeground`, `tab.hoverForeground`, `titleBar.activeForeground` |
| `text.editor` | `#e8dfe8` | `button.secondaryForeground`, `editor.foreground`, `editorSuggestWidget.foreground` |
| `text.secondary` | `#c8bec2` | `checkbox.foreground`, `commandCenter.foreground`, `dropdown.foreground`, `editorHoverWidget.foreground`, `editorLineNumber.activeForeground`, `editorWidget.foreground`, `input.foreground`, `list.hoverForeground`, `list.inactiveSelectionForeground`, `menu.foreground`, `notificationCenterHeader.foreground`, `notifications.foreground`, `sideBar.foreground`, `sideBarTitle.foreground`, `tab.unfocusedActiveForeground`, `tab.unfocusedHoverForeground`, `terminal.foreground` |
| `text.muted` | `#8e8488` | `commandCenter.inactiveForeground`, `editorLineNumber.foreground`, `titleBar.inactiveForeground` |
| `text.inverse` | `#ffffff` | `activityBarBadge.foreground`, `badge.foreground`, `button.foreground`, `inputOption.activeForeground`, `list.focusForeground`, `menu.selectionForeground`, `peekViewResult.fileForeground`, `peekViewResult.selectionForeground`, `peekViewTitleLabel.foreground`, `statusBarItem.remoteForeground`, `terminalCursor.foreground` |

#### Border

| Token | Hex | Color IDs |
|---|---|---|
| `border.wine` | `#3c2c35` | `activityBar.border`, `debugExceptionWidget.border`, `debugToolBar.border`, `diffEditor.border`, `editorGroup.border`, `editorHoverWidget.border`, `editorSuggestWidget.border`, `menu.separatorBackground`, `notificationCenter.border`, `notificationToast.border`, `notifications.border`, `pickerGroup.border`, `tab.border` |
| `border.wine.alpha` | `#3c2c3580` | `commandCenter.border`, `panel.border`, `panelSection.border`, `terminal.border` |
| `border.menu` | `#3c2c3585` | `menu.border` |
| `border.transparent` | `#00000000` | `checkbox.border`, `dropdown.border`, `input.border`, `listFilterWidget.outline`, `menu.selectionBorder`, `tab.activeBorder`, `tab.activeBorderTop`, `tab.hoverBorder`, `titleBar.border`, `toolbar.hoverOutline` |

#### Accent

| Token | Hex | Color IDs |
|---|---|---|
| `accent.primary` | `#c44560` | `activityBarBadge.background`, `badge.background`, `progressBar.background`, `statusBarItem.remoteBackground` |
| `accent.muted` | `#a04060` | `button.background` |
| `accent.softberry` | `#b88898` | `editor.findMatchBorder`, `focusBorder`, `list.focusAndSelectionOutline`, `textLink.foreground` |
| `accent.buttonhover` | `#c46878` | `button.hoverBackground` |
| `accent.cursor` | `#ffb3d9` | `editorCursor.foreground`, `list.highlightForeground` |
| `accent.widget` | `#d49198` | `editorSuggestWidget.highlightForeground`, `listFilterWidget.noMatchesOutline`, `pickerGroup.foreground`, `sideBarSectionHeader.foreground`, `textLink.activeForeground` |

#### Selection

| Token | Hex | Color IDs |
|---|---|---|
| `selection.active` | `#4a2e5080` | `editor.selectionBackground` |
| `selection.secondary` | `#5d3f5f58` | `selection.background` |
| `selection.hover` | `#2e2228` | `editor.lineHighlightBorder`, `list.hoverBackground`, `statusBarItem.hoverBackground`, `tab.hoverBackground`, `tab.unfocusedHoverBackground` |
| `selection.focus` | `#52324a` | `list.focusBackground`, `listFilterWidget.background`, `menu.selectionBackground` |
| `selection.activeList` | `#663a56` | `list.activeSelectionBackground` |
| `selection.inactiveList` | `#382832` | `button.secondaryBackground`, `commandCenter.activeBackground`, `editor.inactiveSelectionBackground`, `editorSuggestWidget.selectedBackground`, `list.dropBackground`, `list.inactiveSelectionBackground`, `minimap.selectionHighlight`, `statusBarItem.activeBackground`, `statusBarItem.prominentHoverBackground` |

#### Diagnostic

| Token | Hex | Color IDs |
|---|---|---|
| `diagnostic.error` | `#f48771` | `editorError.foreground`, `editorMarkerNavigationError.background`, `minimap.errorHighlight`, `notificationsErrorIcon.foreground` |
| `diagnostic.warning` | `#cca700` | `editorMarkerNavigationWarning.background`, `editorWarning.foreground`, `minimap.warningHighlight`, `notificationsWarningIcon.foreground` |
| `diagnostic.info` | `#75beff` | `editorInfo.foreground`, `editorMarkerNavigationInfo.background`, `notificationsInfoIcon.foreground` |
| `diagnostic.success` | `#81b88b` | `editorGutter.addedBackground`, `gitDecoration.addedResourceForeground`, `minimapGutter.addedBackground` |

#### Chrome

| Token | Hex | Color IDs |
|---|---|---|
| `chrome.status.error` | `#8b2d2d` | `statusBarItem.errorBackground` |
| `chrome.status.warning` | `#7a5c00` | `statusBarItem.warningBackground` |

### 4. Inherited defaults & alpha overlays (`colors`)

Values **not** in the curated palette — unmodified VS Code defaults (terminal ANSI, peek-view, default diagnostics) and alpha overlays. Catalogued for completeness; change deliberately.

90 distinct inherited/overlay values across 45 UI groups.

| UI group | Color ID | Hex |
|---|---|---|
| activityBar | `activityBar.inactiveForeground` | `#ffffff66` |
| breadcrumb | `breadcrumb.foreground` | `#cccccccc` |
| button | `button.border` | `#ffffff1f` |
| button | `button.secondaryHoverBackground` | `#4a3442` |
| diffEditor | `diffEditor.insertedTextBackground` | `#9bb95533` |
| diffEditor | `diffEditor.removedTextBackground` | `#ff000033` |
| editor | `editor.findMatchBackground` | `#52324a80` |
| editor | `editor.findMatchHighlightBackground` | `#c4456040` |
| editor | `editor.findMatchHighlightBorder` | `#ffffff00` |
| editor | `editor.findRangeHighlightBackground` | `#38283266` |
| editor | `editor.findRangeHighlightBorder` | `#ffffff00` |
| editor | `editor.foldBackground` | `#264f784d` |
| editor | `editor.hoverHighlightBackground` | `#264f7840` |
| editor | `editor.lineHighlightBackground` | `#38283238` |
| editor | `editor.rangeHighlightBackground` | `#ffffff0b` |
| editor | `editor.rangeHighlightBorder` | `#ffffff00` |
| editor | `editor.selectionHighlightBackground` | `#b8889820` |
| editor | `editor.selectionHighlightBorder` | `#b8889860` |
| editor | `editor.wordHighlightBackground` | `#575757b8` |
| editor | `editor.wordHighlightStrongBackground` | `#0d69e0b8` |
| editorBracketMatch | `editorBracketMatch.background` | `#0064001a` |
| editorBracketMatch | `editorBracketMatch.border` | `#888888` |
| editorCodeLens | `editorCodeLens.foreground` | `#999999` |
| editorCursor | `editorCursor.background` | `#000000` |
| editorError | `editorError.background` | `#b73a3400` |
| editorError | `editorError.border` | `#ffffff00` |
| editorGutter | `editorGutter.commentRangeForeground` | `#c5c5c5` |
| editorGutter | `editorGutter.deletedBackground` | `#94151b` |
| editorGutter | `editorGutter.foldingControlForeground` | `#c5c5c5` |
| editorGutter | `editorGutter.modifiedBackground` | `#3b7f92` |
| editorIndentGuide | `editorIndentGuide.activeBackground` | `#5c4050` |
| editorIndentGuide | `editorIndentGuide.background` | `#332428` |
| editorInfo | `editorInfo.background` | `#4490bf00` |
| editorInfo | `editorInfo.border` | `#4490bf00` |
| editorLink | `editorLink.activeForeground` | `#4e94ce` |
| editorMarkerNavigation | `editorMarkerNavigation.background` | `#2d2d30` |
| editorOverviewRuler | `editorOverviewRuler.background` | `#29202600` |
| editorOverviewRuler | `editorOverviewRuler.border` | `#3c2c354d` |
| editorRuler | `editorRuler.foreground` | `#4a3542` |
| editorWarning | `editorWarning.background` | `#a9904000` |
| editorWarning | `editorWarning.border` | `#ffffff00` |
| editorWhitespace | `editorWhitespace.foreground` | `#e3e4e229` |
| editorWidget | `editorWidget.resizeBorder` | `#5c4050` |
| gitDecoration | `gitDecoration.conflictingResourceForeground` | `#6c6cc4` |
| gitDecoration | `gitDecoration.deletedResourceForeground` | `#c74e39` |
| gitDecoration | `gitDecoration.ignoredResourceForeground` | `#8c8c8c` |
| gitDecoration | `gitDecoration.modifiedResourceForeground` | `#e2c08d` |
| gitDecoration | `gitDecoration.stageDeletedResourceForeground` | `#c74e39` |
| gitDecoration | `gitDecoration.stageModifiedResourceForeground` | `#e2c08d` |
| gitDecoration | `gitDecoration.submoduleResourceForeground` | `#8db9e2` |
| gitDecoration | `gitDecoration.untrackedResourceForeground` | `#73c991` |
| input | `input.placeholderForeground` | `#a09498` |
| inputOption | `inputOption.activeBackground` | `#c8a09866` |
| inputOption | `inputOption.activeBorder` | `#c600cc00` |
| list | `list.focusOutline` | `#b8889880` |
| merge | `merge.commonContentBackground` | `#282828` |
| merge | `merge.commonHeaderBackground` | `#383838` |
| merge | `merge.currentContentBackground` | `#27403b` |
| merge | `merge.currentHeaderBackground` | `#367366` |
| merge | `merge.incomingContentBackground` | `#28384b` |
| merge | `merge.incomingHeaderBackground` | `#395f8f` |
| minimap | `minimap.findMatchHighlight` | `#52324a80` |
| minimapGutter | `minimapGutter.deletedBackground` | `#94151b` |
| minimapGutter | `minimapGutter.modifiedBackground` | `#3b7f92` |
| panelTitle | `panelTitle.activeBorder` | `#e7e7e7` |
| panelTitle | `panelTitle.activeForeground` | `#e7e7e7` |
| panelTitle | `panelTitle.inactiveForeground` | `#e7e7e799` |
| peekView | `peekView.border` | `#007acc` |
| peekViewEditor | `peekViewEditor.background` | `#001f33` |
| peekViewEditor | `peekViewEditor.matchHighlightBackground` | `#ff8f0099` |
| peekViewEditor | `peekViewEditor.matchHighlightBorder` | `#ee931e` |
| peekViewEditorGutter | `peekViewEditorGutter.background` | `#001f33` |
| peekViewResult | `peekViewResult.lineForeground` | `#bbbbbb` |
| peekViewResult | `peekViewResult.matchHighlightBackground` | `#ea5c004d` |
| peekViewResult | `peekViewResult.selectionBackground` | `#3399ff33` |
| peekViewTitleDescription | `peekViewTitleDescription.foreground` | `#ccccccb3` |
| scrollbar | `scrollbar.shadow` | `#000000` |
| scrollbarSlider | `scrollbarSlider.activeBackground` | `#bfbfbf66` |
| scrollbarSlider | `scrollbarSlider.background` | `#79797966` |
| scrollbarSlider | `scrollbarSlider.hoverBackground` | `#646464b3` |
| settings | `settings.focusedRowBackground` | `#ede5e807` |
| sideBar | `sideBar.dropBackground` | `#383b3d` |
| sideBarSectionHeader | `sideBarSectionHeader.border` | `#2a223000` |
| statusBar | `statusBar.debuggingBackground` | `#5a3548` |
| tab | `tab.inactiveForeground` | `#ede5e880` |
| tab | `tab.unfocusedInactiveForeground` | `#ede5e860` |
| terminal | `terminal.ansiBlack` | `#000000` |
| terminal | `terminal.ansiBlue` | `#2472c8` |
| terminal | `terminal.ansiBrightBlack` | `#666666` |
| terminal | `terminal.ansiBrightBlue` | `#3b8eea` |
| terminal | `terminal.ansiBrightCyan` | `#29b8db` |
| terminal | `terminal.ansiBrightGreen` | `#23d18b` |
| terminal | `terminal.ansiBrightMagenta` | `#d670d6` |
| terminal | `terminal.ansiBrightRed` | `#f14c4c` |
| terminal | `terminal.ansiBrightWhite` | `#e5e5e5` |
| terminal | `terminal.ansiBrightYellow` | `#f5f543` |
| terminal | `terminal.ansiCyan` | `#11a8cd` |
| terminal | `terminal.ansiGreen` | `#0dbc79` |
| terminal | `terminal.ansiMagenta` | `#bc3fbc` |
| terminal | `terminal.ansiRed` | `#cd3131` |
| terminal | `terminal.ansiWhite` | `#e5e5e5` |
| terminal | `terminal.ansiYellow` | `#e5e510` |
| terminal | `terminal.selectionBackground` | `#ffffff40` |
| terminalCursor | `terminalCursor.background` | `#2e82ac` |
| toolbar | `toolbar.activeBackground` | `#52324a80` |
| toolbar | `toolbar.hoverBackground` | `#52324a58` |
| tree | `tree.indentGuidesStroke` | `#4a3542` |
| walkThrough | `walkThrough.embeddedEditorBackground` | `#1b131850` |
| widget | `widget.shadow` | `#0000005c` |

<!-- GENERATED:palette-index END -->
