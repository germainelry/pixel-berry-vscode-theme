# Pixel Berry — syntax color test fixtures

A passive learning aid: open these files in the Extension Development Host
with **Pixel Berry** selected, and use this README to learn which TextMate
scope (and which entry in `pixel-berry-color-theme.json`) produced each
on-screen color.

The fixtures live in `test-fixtures/` and are excluded from the packaged
`.vsix` via `.vscodeignore`. Nothing here is shipped to end users.

> **Palette:** these fixtures and this README track **v0.1.0** of the syntax
> palette (the syntax-foreground redesign). Earlier palettes are archived —
> see [Versioning](#versioning) — so you can diff a fixture against the look
> it had under a previous theme version.

## How to use

1. Open the repo root (`pixel.berry/`) in VS Code.
2. Press **F5** to launch the Extension Development Host.
3. In the Host window: **Command Palette → "Preferences: Color Theme"
   → Pixel Berry**.
4. Open `test-fixtures/` and walk through files `01-` through `15-` in
   order. Each file has a section below describing what to look for.
5. When a color confuses you, scroll to
   [Palette → scopes (reverse lookup)](#palette--scopes-reverse-lookup)
   and find the hex; every selector listed under it produces that exact
   color (unless overridden by a more specific rule or a semantic
   token).

## v0.1.0 palette at a glance

| Role | Hex | Name | Notes |
|---|---|---|---|
| keyword | `#ff6b9d` | Berry Pink | keywords, control, storage, booleans/null, word-form operators, regex quantifiers |
| function | `#ffa3c7` | Rose | callables, decorators, tags, markdown/HTML headings |
| type | `#d6a3e8` | Orchid | types, classes, namespaces, lifetimes, regex char-class |
| constant | `#b0a8ee` | Periwinkle | named constants, attributes, enum/symbols, CSS values, markup.bold |
| number | `#e8b079` | Amber | numbers, units, regex escapes, HTML/markup entities |
| string | `#a8d8a8` | Sage | string literals, inline code, template/heredoc bodies |
| regexp | `#9bd4b9` | Mint | regex **literal** only (`string.regexp`) |
| link | `#7fc8d6` | Cyan | links / URLs (markdown) |
| variable | `#cdbfc8` | Calm Neutral | variables, parameters, `self`/`this` |
| property | `#e3c0cd` | Dusty Rose | object/JSON keys, member properties, CSS property names |
| operator | `#a6b3ad` | Sage-Grey | symbolic operators (all languages, unified) |
| punctuation | `#978d94` | Mauve-Grey | delimiters, brackets, braces (de-emphasised) |
| comment | `#a8919e` | Comment Mauve | comments (italic) |
| error | `#f55c5c` | Error Red | `invalid.illegal`, `invalid.broken`, `token.error-token` |
| deprecated | `#a8919e` | + strikethrough | `invalid.deprecated` |
| unimplemented | `#9e93a6` | Muted | `invalid.unimplemented` |

Body text (unstyled tokens) is `editor.foreground` `#e8dfe8` — see the
fallthrough note below.

## Scope fallthrough — read this first

TextMate scopes are nested (e.g. `keyword.control.import.python` is a
specialization of `keyword.control`, which is a specialization of
`keyword`). When multiple theme rules match the same token, the
**most-specific** scope wins.

A few details that will trip you up:

- **Unstyled tokens** fall back to `editor.foreground` = `#e8dfe8`. In
  v0.1.0 this is *brighter* than the deliberately de-emphasised operator
  (`#a6b3ad`) and punctuation (`#978d94`) tones — so an unstyled token now
  reads slightly **brighter** than styled glue, rather than identical to it
  (the v0.0.4 "everything collapses to body text" problem is gone). The UI
  chrome uses a different near-white `#ede5e8` (the `colors.foreground`
  key) — but editor text does not.
- **Italic-without-color** entries inherit color from a parent scope
  but render italic. See
  [italic-without-color rules](#italic-without-color-rules).
- **Semantic tokens** (emitted by language servers) override TextMate
  scopes when the LSP is active. The theme defines three — see the
  [Semantic tokens](#semantic-tokens) table. To verify a color came
  from a semantic rule rather than a scope, toggle
  `"editor.semanticHighlighting.enabled": false` in the Host's
  settings.
- **Conflicting entries**: three selectors are defined twice with
  different colors. The *later* entry in the JSON wins:
  - `punctuation.definition.metadata.markdown` → final `#978d94`
    (punctuation) not `#a8d8a8` (string)
  - `punctuation.section.embedded` → final `#ff6b9d` (keyword) not
    `#cdbfc8` (variable)
  - `entity.name.label.cs` → final `#ffa3c7` (function) not `#d6a3e8`
    (type)

## Coverage matrix

Which syntax-role each fixture exercises. Columns are the v0.1.0 roles;
✓ = present · – = not expressible in this language · ~ = partial (scope
falls through to a generic category). Semantic columns: `en` = enumMember,
`vc` = variable.constant, `dl` = variable.defaultLibrary.

| # | Lang | kw | fn | ty | const | num | str | rgx | link | var | prop | op | punc | cmt | en | vc | dl |
|---|------|----|----|----|-------|-----|-----|-----|------|-----|------|----|------|-----|----|----|----|
| 01 | TS | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 02 | JS | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ |
| 03 | Python | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ~ |
| 04 | Markdown | – | ✓ | – | ✓ | – | ✓ | – | ✓ | – | – | – | ✓ | – | – | – | – |
| 05 | JSON | – | – | – | ✓ | ✓ | ✓ | – | – | – | ✓ | – | ✓ | – | – | – | – |
| 06 | CSS | ✓ | ✓ | – | ✓ | ✓ | ✓ | – | – | – | ✓ | ✓ | ✓ | ✓ | – | – | – |
| 07 | HTML | – | ✓ | – | ✓ | ✓ | ✓ | – | – | – | – | – | ✓ | ✓ | – | – | – |
| 08 | YAML | – | ✓ | – | ✓ | ✓ | ✓ | – | – | – | – | – | ✓ | ✓ | – | – | – |
| 09 | Shell | ✓ | ✓ | – | – | ✓ | ✓ | – | – | ✓ | – | ✓ | ✓ | ✓ | – | – | – |
| 10 | Go | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | – | ✓ | ✓ | ✓ | ✓ | ✓ | –¹ | ~ | ~ |
| 11 | Rust | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ~ |
| 12 | Java | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 13 | PHP | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | – | ✓ | ✓ | ✓ | ✓ | ✓ | –² | – | – |
| 14 | SQL | ✓ | ✓ | ~ | – | ✓ | ✓ | – | – | – | – | ~ | ✓ | ✓ | – | – | – |
| 15 | Regex | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | – | ✓ | ✓ | ✓ | – | – | – |

¹ Go has no language-level enums (`iota` constants cover the `constant` role).
² PHP isn't in the theme's LSP-strong semantic set; PHP 8.1 enums exist but
aren't exercised here.

**On error/deprecated/unimplemented states:** the matrix omits the three
`invalid.*` state columns deliberately. TextMate grammars do **not** emit
`invalid.illegal` / `invalid.deprecated` / `invalid.unimplemented` from
valid, idiomatic code — triggering them requires intentionally broken
source, which would conflict with the "plausible real file" goal and raise
LSP error squiggles. (The strikethrough most editors show for a deprecated
*symbol* comes from the LSP `deprecated` semantic-token *modifier*, which
this theme does not style.) To eyeball those three colors directly, see the
[`#f55c5c`](#f55c5c--error-red), [`#a8919e`](#a8919e--comment-mauve), and
[`#9e93a6`](#9e93a6--unimplemented) buckets in the reverse lookup.

## Per-file walkthrough

Hexes below are v0.1.0. "Where" references are indicative, not line-exact.

### 01-typescript.tsx — densest fixture

Open this file first. It exercises more theme rules than any other.

| What to look for | Expected hex | Scope / source |
|---|---|---|
| `import`, `export`, `enum`, `interface`, `type`, `abstract`, `class`, `return`, `yield` | `#ff6b9d` | `keyword.control` / `storage` |
| `MAX_RETRIES`, `PI_APPROX`, `HEX_MASK` (module-scope const refs) | `#b0a8ee` | semantic `variable.constant` |
| `Status.Active` / enum members | `#b0a8ee` | semantic `enumMember` |
| `Math`, `JSON`, `Array`, `Promise`, `document`, `console` globals | `#d6a3e8` | semantic `variable.defaultLibrary` |
| `User`, `Repository`, `string`, `number`, `unknown`, `void` types | `#d6a3e8` | `entity.name.type`, `support.type.primitive.ts` |
| Numbers `0xff_ff_ff`, `9_007_199_254_740_993n`, `1.5e-3` | `#e8b079` | `constant.numeric` |
| Template literal `` `[${date}] ${msg}` `` | backticks `#a8d8a8`, `${`/`}` `#ff6b9d`, interior resets to `#e8dfe8` | `keyword.other.template.*`, `punctuation.definition.template-expression.*` |
| Regex `/^[a-z0-9]+(?:-…)*$/i` | body `#9bd4b9`, `[a-z0-9]` `#d6a3e8`, `+`/`*` `#ff6b9d` | `string.regexp`, `constant.other.character-class.regexp`, `keyword.operator.quantifier.regexp` |
| Escape chars `\t \n \\` inside strings | `#e8b079` | `constant.character.escape` |
| JSX `<button>`, `<span>`, `<em>` tag names | `#ffa3c7` | `entity.name.tag` |
| JSX attributes `type=`, `className=`, `data-count=` | `#b0a8ee`, italic-via-parent | `entity.other.attribute-name.tsx` (italic) |
| Object literal keys `"kebab-key"`, `nested`, `list` | `#e3c0cd` | `meta.object-literal.key` |
| Member properties (`this.cache`, `parsed.id`) | `#e3c0cd` | `meta.property.object` / `support.variable.property` |
| Parameters / locals (`msg`, `target`, `count`) | `#cdbfc8` | `variable.parameter`, `variable` |
| Operators `??`, `=>`, `===`, `+` | `#a6b3ad` | `keyword.operator*` |
| `typeof` (word-form operator) | `#ff6b9d` | `keyword.operator.expression.typeof` |
| `//` line + `/** */` JSDoc comments | `#a8919e` italic | `comment` |

### 02-javascript.js — plain JS scopes (no TS-only rules)

| What to look for | Expected hex | Scope |
|---|---|---|
| `require('fs')` | `#ffa3c7` | `meta.require` |
| `KEY_RE = /^[a-z]…/` regex literal + `.test()` | body `#9bd4b9`, char-class `#d6a3e8`, quantifier `#ff6b9d` | `string.regexp` family |
| `/* … */` block comment above `KEY_RE` | `#a8919e` | `comment.block` |
| `process.cwd()`, `process.pid`, `process.platform` | `process` `#e3c0cd`, properties `#e3c0cd` | `support.variable.object.process` |
| `Math.pow`, `JSON.stringify`, `JSON.parse` | `Math`/`JSON` `#d6a3e8`, methods `#ffa3c7` | semantic `variable.defaultLibrary`, `support.function` |
| `console.log/info/debug` | `console` `#cdbfc8`, method `#ffa3c7` | `support.type.object.console`, `support.function.console` |
| `class Store extends EventEmitter` | class `#d6a3e8`, `extends` `#ff6b9d` | `variable.other.class.js`, `entity.other.inherited-class` |
| `document.querySelector`, `window.location` | DOM object `#cdbfc8`, property `#e3c0cd` | `support.type.object.dom`, `support.variable.property.dom` |
| `CACHE_DIR`, `MAX_SIZE` module consts | `#b0a8ee` | semantic `variable.constant` |
| `module.exports` | `#d6a3e8` | `support.module.node` |

### 03-python.py — italic test-bed + semantics

| What to look for | Expected hex | Scope |
|---|---|---|
| `from`, `import` | parent color + italic | `keyword.control.import.python` (italic) |
| `if`, `for`, `with`, `return`, `yield` | parent color + italic | `keyword.control.flow.python` (italic) |
| `# double the even numbers…` line comment | `#a8919e` italic | `comment.line` |
| `class Status(Enum)` members, `Status.ACTIVE` ref | `#b0a8ee` | semantic `enumMember` |
| `@dataclass`, `@property`, `@staticmethod` decorators | `@` + identifier `#ffa3c7` | `meta.function.decorator.python` |
| `self` parameter | `#cdbfc8` | `variable.parameter.function.language.special.self.python` |
| `str`, `int`, `list`, `dict` type hints | `#d6a3e8` | `support.type.python` |
| `__post_init__`, `__init__`, `__name__` magic | `#cdbfc8` | `support.variable.magic.python` |
| `and`, `or`, `not`, `is` | `#ff6b9d` | `keyword.operator.logical.python` |
| f-string format spec `{value:.2f}`, `!r`, `!s` | placeholder `#b0a8ee` | `constant.character.format.placeholder.other.python` |
| `CACHE_DIR`, `MAX_RETRIES` module consts | `#b0a8ee` | semantic `variable.constant` |
| raw `r"…"`, bytes `b"\x00\x01\xff"` | string `#a8d8a8`, escapes `#e8b079` | `string`, `constant.character.escape` |

> Note: `Optional` is imported but unused — a pre-existing quirk in this
> fixture, left as-is.

### 04-markdown.md — headings, emphasis, links

| What to look for | Expected hex | Scope |
|---|---|---|
| `# H1 … ###### H6` heading text | `#ffa3c7` | `markup.heading`, `entity.name.section.markdown` |
| Leading `#` marker characters | `#ffa3c7` | `markup.heading punctuation.definition.heading` |
| Setext `==` / `--` underlines | `#ffa3c7` | `markup.heading.setext` |
| `**bold**` text + `**` markers | `#b0a8ee` | `markup.bold`, `punctuation.definition.bold.markdown` |
| `*italic*`, `_italic_` text | `#ff6b9d` | `markup.italic` |
| `` `inline code` `` | `#a8d8a8` | `markup.inline.raw.markdown` |
| `> blockquote` | `#a8919e` | `markup.quote.markdown` |
| List markers `-`, `*`, `+`, `1.` | `#978d94` | `punctuation.definition.list.markdown` |
| `[link text](url "title")`, bare `<url>` | text/URL `#7fc8d6`, title `#7fc8d6` | `markup.underline.link.markdown`, `string.other.link.title.markdown` |
| `&amp;`, `&copy;` entities | `#e8b079` | `constant.character.entity` |
| Fenced code (`` ```ts ``) | embedded grammar | language-specific scopes apply |

### 05-json.json — JSON-specific scopes

| What to look for | Expected hex | Scope |
|---|---|---|
| Property keys (`"name"`, `"version"`) | `#e3c0cd` | `support.type.property-name.json` |
| String values | `#a8d8a8` | `… > value.json > string.quoted.json` |
| `true` / `false`, `null` | `#ff6b9d` | `… > constant.language.json` |
| Numbers `30000`, `4.5`, `1.5` | `#e8b079` | `constant.numeric` |

### 06-css.css — selectors, at-rules, vars, units

| What to look for | Expected hex | Scope |
|---|---|---|
| `@charset`, `@import`, `@media`, `@keyframes` | `#ff6b9d` | at-rule / `keyword.control` |
| Element selectors `html`, `body`, `button` | `#ffa3c7` | `entity.name.tag` |
| `#app` ID selector | `#ffa3c7`, `fontStyle: normal` | `entity.other.attribute-name.id` |
| `.btn`, `.container` class selectors | `#b0a8ee`, `fontStyle: normal` | `entity.other.attribute-name.class.css` |
| `:hover`, `:focus-visible`, `::before` pseudo | `#b0a8ee` | `entity.other.attribute-name.pseudo-class/-element` |
| Property names (`display`, `padding`, `color`) | `#e3c0cd` | `support.type.vendored.property-name.css` |
| Named colors (`hotpink`, `white`) + values (`flex`, `none`) | `#b0a8ee` | `support.constant.color…`, `support.constant.property-value.css` |
| Units (`px`, `rem`, `em`, `vw`, `ms`) | `#e8b079` | `keyword.other.unit` |
| Hex color literals, `rgb()`/`hsl()` values | `#b0a8ee` | `rgb-value` |
| Combinators `>`, `+`, `~` | `#a6b3ad` | `keyword.operator.css` |
| `/* … */` comments | `#a8919e` | `comment` |

### 07-html.html — tags, attributes, entities, embeds

| What to look for | Expected hex | Scope |
|---|---|---|
| Tag names (`<html>`, `<header>`, `<button>`) | `#ffa3c7` | `entity.name.tag` |
| Attributes (`lang=`, `class=`, `href=`, `aria-label=`) | `#b0a8ee` | `entity.other.attribute-name` |
| `id="top"`, `id="name"` | `#ffa3c7` | `entity.other.attribute-name.id` |
| `<`, `>`, `/`, `=` tag punctuation | `#978d94` | `meta.tag` |
| Entities (`&mdash;`, `&amp;`, `&copy;`, `&nbsp;`) | `#e8b079` | `constant.character.entity` |
| `<!-- comment -->` | `#a8919e` italic | `comment` |
| Embedded `<style>` / `<script type="module">` | CSS / JS scopes inside | nested grammars |

### 08-yaml.yaml — keys, scalars, anchors, multi-doc

| What to look for | Expected hex | Scope |
|---|---|---|
| Keys (`name:`, `version:`) | `#ffa3c7` | `entity.name.tag.yaml` |
| List `-` markers | `#978d94` | `punctuation.definition.block.sequence.item.yaml` |
| Quoted strings (`"https://…"`) | `#a8d8a8` | `string` |
| Anchors `&defaults`, aliases `*defaults`, merge `<<` | `#b0a8ee` for `&`/`*` constants | `constant` |
| `true`/`false`, `null`/`~` | `#ff6b9d` | `constant.language` |
| Numbers (decimal, float, `0xFF`, `0o755`, `-17`) | `#e8b079` | `constant.numeric` |
| `# comment` lines | `#a8919e` italic | `comment` |
| Block scalars `|`, `>`; doc separator `---` | `#a6b3ad` / `#978d94` | operator / punctuation family |

### 09-shell.sh — generic fallthrough showcase

The theme defines no shell-specific scopes; everything falls through to
generic categories.

| What to look for | Expected hex | Scope |
|---|---|---|
| `#!` shebang and `# comments` | `#a8919e` italic | `comment` |
| `if`, `then`, `fi`, `for`, `case`, `esac`, `return` | `#ff6b9d` | `keyword.control` |
| `local`, `readonly` | `#ff6b9d` | `storage` |
| Function names (`log`, `retry`, `cleanup`, `main`) | `#ffa3c7` | `entity.name.function` |
| Single-quoted strings | `#a8d8a8` | `string.quoted.single` |
| Double-quoted strings with `$var` | sage + variable inside | `string.quoted.double` |
| `${BASH_SOURCE[0]}`, `$@`, `$$`, `$mode` | `#cdbfc8` | `variable` |
| Heredoc `<<EOF` vs `<<'EOF'` | content as string | grammar-defined |

### 10-go.go — package, channels, generics, iota

| What to look for | Expected hex | Scope |
|---|---|---|
| `package main` | `main` `#d6a3e8` | `entity.name.package.go` |
| `:=` short declaration | `#a6b3ad` | `keyword.operator.assignment.go` |
| `&user`, `*T` address/pointer | `#a6b3ad` | `keyword.operator.address.go` (now unified operator) |
| Channel `<-`, `chan int` | `#a6b3ad` | `keyword.operator.channel` |
| `iota` enum pattern, `MaxRetries`, `DefaultTimeout` consts | `#b0a8ee` | `constant` |
| Struct tags `` `json:"id"` `` | `#a8d8a8` | `string` |
| `defer`, `go`, `select`, `switch`, `range` | `#ff6b9d` | `keyword.control` |
| Generics `[T any]`, `Store[T]`, type names | `#d6a3e8` | `entity.name.type` |
| `//` line + `/* … */` block comment (above `fanIn`) | `#a8919e` | `comment` |
| Member access `s.mu`, `u.ID` | `#e3c0cd` | `support.variable.property` |

### 11-rust.rs — lifetimes, traits, macros, generics

| What to look for | Expected hex | Scope |
|---|---|---|
| `'static`, `'a` lifetimes | `#d6a3e8` | `entity.name.lifetime.rust` |
| `&` borrow, `*` deref sigils | `#a6b3ad` | `keyword.operator.sigil.rust` (now unified operator) |
| `self`, `Self` | `#cdbfc8` | `variable.language.rust` |
| `println!`, `vec!`, `write!`, `eprintln!` macros | `#ffa3c7` | `support.function.std.rust` |
| `Some`, `None`, `Ok`, `Err`, `Result`, `MAX_RETRIES` | `#b0a8ee` | `support.constant.core.rust`, `variable.other.constant` |
| `Status::Active` enum variants | `#b0a8ee` | semantic `enumMember` |
| `?`, `..`, `..=`, `->`, `=>` | `#a6b3ad` | `keyword.operator.misc.rust` |
| `#[derive(…)]`, `#[allow(…)]` attributes | attribute name color | attribute scopes |
| `impl`, `trait`, `pub`, `fn`, `let`, `mut`, `match` | `#ff6b9d` | `keyword.control` / `storage` |
| `///` doc comment + `//` + `/* … */` | `#a8919e` | `comment` |

### 12-java.java — annotations, generics, enum, inner class

| What to look for | Expected hex | Scope |
|---|---|---|
| `package com.example.pixelberry;` | `#cdbfc8` | `source.java` |
| `import java.util.…;` | `import` `#ff6b9d`, name segments vary | `storage.modifier.import.java` |
| `@Override`, `@SuppressWarnings` annotations | `#ffa3c7` | `storage.type.annotation.java` |
| `enum Status { ACTIVE, IDLE, DONE }`, `Status.ACTIVE` ref | `#b0a8ee` | semantic `enumMember` |
| `MAX_RETRIES`, `DEFAULT_NAME` static finals | `#b0a8ee` | semantic `variable.constant` |
| `System.out::println` | `System` `#d6a3e8` | semantic `variable.defaultLibrary` |
| Generics `<T extends …>`, brackets | type names `#d6a3e8`, `<>` `#ffa3c7` | `storage.type.generic.java`, `punctuation.bracket.angle.java` |
| Method names | `#ffa3c7` | `meta.method.java` |
| `int[]`, `String[]` array types | `#ffa3c7` (Java array storage) | `storage.type.object.array.java` |
| `instanceof` (word-form) | `#ff6b9d` | `keyword.operator.instanceof.java` |
| Local variable names | `#cdbfc8` | `meta.definition.variable.name.java` |
| `//` + `/** Javadoc */` | `#a8919e` | `comment` |

### 13-php.php — namespaces, types, heredoc/nowdoc

| What to look for | Expected hex | Scope |
|---|---|---|
| `namespace App\Repositories;` | `#d6a3e8` | `support.other.namespace.php` |
| `use App\Models\User;`, `use … as Alias` | `#d6a3e8` | `support.other.namespace.use.php`, `entity.other.alias.php` |
| `interface Identifiable`, `extends`, `implements` | `#d6a3e8` | `meta.interface.php`, inherited scopes |
| Type hints (`string`, `int`, `array`, `?User`) | `#d6a3e8` | `storage.type.php`, `keyword.other.type.php` |
| `$this`, `$cache`, `$id` | `#d6a3e8` (`$this`), `#cdbfc8` (vars) | `variable.other.class.php`, `variable` |
| `$this->name` member access | `#e3c0cd` | `support.variable.property` |
| `@file_get_contents(…)` (`@` error suppression) | `@` `#a6b3ad` | `keyword.operator.error-control.php` |
| `instanceof` | `#a6b3ad` | `keyword.operator.type.php` |
| Method calls (`$repo->load(1)`) | `#ffa3c7` | `meta.function-call.object.php` |
| `PHP_EOL`, `__FILE__`, `__DIR__`, `MAX_RETRIES` | `#b0a8ee` | `support.constant.core.php`, `support.constant.parser-token.php` |
| `<<<EOT … EOT;` heredoc, `<<<'NOWDOC' …` nowdoc | `<<<` `#a6b3ad`, content `#a8d8a8` | `keyword.operator.heredoc.php` / `.nowdoc.php` |
| `{$this->name}` interpolation in heredoc | embedded punctuation `#ff6b9d` | `punctuation.section.embedded` |
| `//` line + `/** … */` docblock (above `load`) | `#a8919e` | `comment` / phpdoc |

### 14-sql.sql — DDL, DML, CTEs, window functions

The theme has only two SQL-specific scopes; the rest fall through to
generic keywords/strings.

| What to look for | Expected hex | Scope |
|---|---|---|
| `CREATE`, `SELECT`, `INSERT`, `WHERE`, `GROUP BY`, `WITH`, `JOIN`, `RANK() OVER` | `#ff6b9d` | `keyword` |
| `COUNT(…)`, `SUM(…)`, `AVG(…)`, `RANK()` | `#ffa3c7` | `entity.name.function` |
| Column / table names | `#e8dfe8` (fallthrough) | unstyled |
| `'Alice'`, `'active'` string literals | `#a8d8a8` | `string` |
| Numeric literals `49.99`, `10` | `#e8b079` | `constant.numeric` |
| Type names `INTEGER`, `VARCHAR(255)`, `TIMESTAMP` | mostly fallthrough | partial coverage |
| `--` line + `/* block */` comments | `#a8919e` italic | `comment` |

### 15-regex.js — regex sub-scope showcase

| What to look for | Expected hex | Scope |
|---|---|---|
| Regex body between `/…/` | `#9bd4b9` | `string.regexp` |
| Character classes `[a-z0-9]`, `[\t\r\n\f\v ]` | `#d6a3e8` | `constant.other.character-class.regexp` |
| Quantifiers `*`, `+`, `?`, `{2,4}`, `{8,}` | `#ff6b9d` | `keyword.operator.quantifier.regexp` |
| Escape sequences `\d`, `\w`, `\s`, `\x00`, `\u…` | `#e8b079` | `constant.character.escape` |
| Named groups `(?<scheme>…)`, backreferences `\1` | grammar-defined | mixed |
| Flags `i`, `g`, `u`, `gu`, `gimsuy` | varies | flag-specific scopes |
| Unicode property escapes `\p{L}`, `\P{N}` | varies | escape scope |
| Surrounding JS (`const`, `function`, strings, `//`) | per JS scopes | — |

## Palette → scopes (reverse lookup)

Parsed directly from `themes/pixel-berry-color-theme.json` (v0.1.0) by
iterating `tokenColors` and splitting composite `scope` strings on commas.
Every selector below appears verbatim in the JSON. 238 colored entries →
408 distinct selector instances → 19 foreground hexes.

### `#7fc8d6` — Cyan / Link (5 scopes)

- `markup.underline.link.image.markdown`
- `markup.underline.link.markdown`
- `string.other.link.description.markdown`
- `string.other.link.title.markdown`
- `token.info-token`

### `#9bd4b9` — Mint / Regex literal (3 scopes)

- `entity.name.class.xi`
- `keyword.control.xi`
- `string.regexp`

### `#a8d8a8` — Sage / String (21 scopes)

- `beginning.punctuation.definition.quote.markdown.xi`
- `keyword.other.substitution.begin` / `.end`
- `keyword.other.template.begin` / `.end`
- `markup.inline.raw.markdown`, `markup.inline.raw.string.markdown`
- `markup.inserted.diff`
- `meta.definition.class.inherited.classes.groovy`
- `meta.scope.prerequisites.makefile`
- `punctuation.definition.metadata.markdown` *(conflict — loses to `#978d94`)*
- `punctuation.definition.string.begin` / `.end` (+ `.markdown`)
- `source.ini`
- `source.json … value.json > string.quoted.json` (+ `> punctuation`)
- `string`

### `#e8b079` — Amber / Number (5 scopes)

- `constant.character.entity`
- `constant.character.escape`
- `constant.numeric`
- `keyword.other.unit`
- `token.warn-token`

### `#b0a8ee` — Periwinkle / Constant (35 scopes)

- `constant`, `constant.other.symbol`, `constant.keyword.clojure`
- `constant.character.format.placeholder.other.python`
- `constant.language.symbol.elixir` / `.ruby`
- `entity.other.attribute-name` (+ `.pseudo-class`, `.pseudo-element`)
- `entity.other.attribute-name.class.css` *(fontStyle: normal)*
- `inline-color-decoration rgb-value`, `less rgb-value`, `rgb-value`
- `markup.bold`, `punctuation.definition.bold` (+ `.markdown`), `todo.bold`
- `punctuation.definition.constant`
- `support.constant.color.w3c-standard-color-name.css` / `.scss`
- `support.constant.core.php` / `.rust`, `support.constant.edge`,
  `support.constant.elm`, `support.constant.ext.php`,
  `support.constant.font-name`, `support.constant.json`,
  `support.constant.parser-token.php`, `support.constant.property-value`
  (+ `.css`, `.scss`), `support.constant.property.math`,
  `support.constant.std.php`
- `meta.symbol.clojure`
- `variable.other.constant`

### `#cdbfc8` — Calm Neutral / Variable (31 scopes)

- `variable`, `variable.c`, `variable.interpolation`, `variable.language`
  (+ `.rust`), `variable.other.generic-type.haskell`
- `variable.parameter.function` (+ `.coffee`, `.js`, `.python`,
  `.language.python`, `.language.special.self.python`)
- `function.parameter` (+ `.cs`, `.ruby`)
- `entity.name.variable.local.cs`
- `meta.arguments.coffee`, `meta.definition.variable.name.groovy` / `.java`
- `meta.function.c` / `.cpp`, `meta.template.expression`
- `punctuation.section.embedded` *(conflict — loses to `#ff6b9d`)*
- `source.java`
- `support.type.object.console`, `support.type.object.dom`,
  `support.variable.magic.python`
- `text.bracketed`, `text.variable`, `token.package`,
  `token.variable.parameter.java`

### `#e3c0cd` — Dusty Rose / Property (14 scopes)

- `meta.object-literal.key`, `meta.property.object`
- `support.type.property-name` (+ `.json`, `.json punctuation`)
- `support.type.vendored.property-name.css`
- `source.json … dictionary.json > string.quoted.json` (+ `> punctuation.string`)
- `support.variable.dom`, `support.variable.object.node` / `.process`,
  `support.variable.property` (+ `.dom`, `.process`)

### `#d6a3e8` — Orchid / Type (48 scopes)

- `constant.other.character-class.regexp`
- `entity.global.clojure`, `entity.name.class` (+ `.identifier.namespace.type`),
  `entity.name.function.xi`, `entity.name.label.cs` *(conflict — loses to `#ffa3c7`)*,
  `entity.name.lifetime.rust`, `entity.name.namespace`, `entity.name.package.go`,
  `entity.name.scope-resolution.function.call` / `.definition`,
  `entity.name.type` (+ `.class`, `.module`, `.namespace`)
- `entity.other.alias.php`, `entity.other.inherited-class`
- `markup.changed.diff`, `meta.interface.php`, `source.makefile`
- `support.class`, `support.constant.math`, `support.module.node`
- `support.other.namespace.php` / `.use.php` / `.use-as.php`
- `support.type.builtin.ts` / `.tsx`, `support.type.primitive` (+ `.ts`, `.tsx`),
  `support.type.python`, `support.type.object.module`, `support.type.swift`,
  `support.type.vb.asp`, `support.type.type.flowtype`,
  `support.type.posix-reserved.c` / `.cpp`, `support.type.prelude.elm`,
  `support.type.*.hlsl` (fx/object/rw/sampler/texture), `support.variable.semantic.hlsl`
- `variable.other.class.js` / `.ts` / `.php`

### `#ffa3c7` — Rose / Function·Tag·Heading (60 scopes)

- `entity.name.function`, `entity.name.section` (+ `.markdown`),
  `entity.name.tag`, `entity.name.goto-label.php`, `entity.name.label.cs` *(conflict winner)*
- `markup.heading` (+ `markup.heading punctuation.definition.heading`,
  `markup.heading.setext`, `.setext.1/.2.markdown`)
- `keyword.operator.expression.import`, `keyword.other.special-method`
- `meta.function-call.generic.python`, `meta.function-call.object.php` /
  `.php` / `.static.php`, `meta.function.decorator.python` /
  `.identifier.python`, `support.token.decorator.python`
- `meta.method.java` / `.body.java` / `.identifier.java` / `.groovy`,
  `meta.method-call.java`, plus the Java method/class/inner-class
  `punctuation.section.*` and `punctuation.definition.method-parameters.*`
  and `punctuation.bracket.angle.java`, `punctuation.definition.annotation.java`,
  `punctuation.separator.period.java`, `punctuation.terminator.java`
- `storage.type.annotation.java`, `storage.type.object.array.java`
- `meta.require`, `meta.diff.header.from-file` / `.to-file`,
  `punctuation.definition.from-file.diff` / `.to-file.diff`
- `support.function`, `support.function.any-method`, `support.function.console`,
  `support.function.std.rust`, `support.other.php`, `variable.function`
- `accent.xi`, `constant.character.xi`

### `#ff6b9d` — Berry Pink / Keyword (72 scopes)

- `keyword`, `keyword.control`, `constant.language`, `storage` (+
  `storage.type.java` / `.cs` / `.php` / `.haskell` / `.generic.java`,
  `storage.modifier.import.java` / `.groovy`, `storage.modifier.lifetime.rust`)
- word-form operators: `keyword.operator.new`, `.delete`, `.expression.*`
  (in/of/typeof/instanceof/keyof/void/delete), `.instanceof.java`,
  `.logical.python`, `.module`, `.optional`, `.ternary`
- `keyword.operator.quantifier.regexp`, `keyword.operator.sizeof.c` / `.cpp`
- `keyword.other.type.php`, `keyword.other.array.phpdoc.php`,
  `meta.other.type.phpdoc.php`
- `markup.italic`, `emphasis md`, `todo.emphasis`,
  `punctuation.definition.italic`
- template/embedded punctuation: `punctuation.definition.template-expression.begin`
  / `.end`, `punctuation.quasi.element`, `punctuation.section.embedded`
  (+ `.begin`, `.end`) *(conflict winner)*
- the PHP `punctuation.*.php` brace/section/terminator family,
  `punctuation.separator.delimiter.php`
- `source.json … constant.language.json` (array + dictionary)
- `meta.selector`, `selector.sass`
- `import.storage.java`, `token.storage` (+ `.type.java`), `token.package.keyword`,
  `token.debug-token`, `constant.regexp.xi`
- Laravel-blade embedded constant scope

### `#a6b3ad` — Sage-Grey / Operator (43 scopes)

- `keyword.operator` (base) + arithmetic / assignment (+ compound) / bitwise
  (+ shift) / comparison / relational / logical / increment / decrement
  across c, cpp, php, go, js, ts, css, scss
- `keyword.operator.address.go`, `.channel`, `.assignment.go`
- `keyword.operator.sigil.rust`, `.misc.rust`
- `keyword.operator.error-control.php`, `.heredoc.php`, `.nowdoc.php`,
  `.regexp.php`, `.type.php`
- `keyword.operator.less`, `keyword.operator.scss`, `control.elements`

### `#978d94` — Mauve-Grey / Punctuation (45 scopes)

- `punctuation.separator.*` (delimiter, key-value, period.python, element,
  arguments, comma.css, c/cpp, unison pipe/delimiter)
- `punctuation.definition.list.*` (markdown, python, unison),
  `punctuation.definition.arguments.*.python`,
  `punctuation.parenthesis.begin/.end.python`,
  `punctuation.definition.block.sequence.item.yaml`,
  `punctuation.definition.heading.markdown`,
  `punctuation.definition.metadata.markdown` *(conflict winner)*,
  `punctuation.definition.hash.unison`, `.delayed.unison`, `.ability.*.unison`
- `punctuation.section.array.*.php`, `punctuation.section.block.*.c` / `.cpp`,
  `punctuation.section.parameters/.parens.*.c`, `punctuation.terminator.statement.c`
- `block.scope.begin` / `.end`, `function.brace`, `meta.brace.square`, `meta.tag`,
  `beginning.punctuation.definition.list.markdown`

### `#a8919e` — Comment Mauve (7 scopes)

- `comment` *(italic)*
- `comment markup.link`
- `punctuation.definition.comment` *(italic)*
- `markup.quote.markdown`
- `invalid.deprecated` *(strikethrough)*
- `beginning.punctuation.definition.list.markdown.xi`
- `punctuation.definition.tag.xi`

### `#9e93a6` — Unimplemented (1 scope)

- `invalid.unimplemented`

### `#f55c5c` — Error Red (5 scopes)

- `invalid.broken`
- `invalid.illegal`
- `invalid.illegal.bad-ampersand.html`
- `invalid.illegal.non-null-typehinted.php`
- `token.error-token`

### Niche / legacy buckets

A few selectors keep colors that are now off the main palette — almost all
are `.xi` (Xi-editor) grammar leftovers that no fixture here triggers:

- `#e8dfe8` — Body text (`editor.foreground` fallback) + `invalid.xi`
- `#e8c5d6` — `constant.character.character-class.regexp.xi`, `markup.deleted.diff`
- `#b8a3e8` — `wikiword.xi`
- `#ffffff` — `constant.other.color.rgb-value.xi`

## Semantic tokens

Semantic tokens are emitted by the language server, not the TextMate
grammar. They override TextMate scopes when active.

| Semantic token | Hex | What triggers it |
|---|---|---|
| `enumMember` | `#b0a8ee` | TS/Rust/Java/Python enum member refs — `Status.Active` (01), `Status::Active` (11), `Status.ACTIVE` (12), `Status.ACTIVE` (03) |
| `variable.constant` | `#b0a8ee` | Module/class-scope const names — `MAX_RETRIES`, `CACHE_DIR` (01/02/03/12) |
| `variable.defaultLibrary` | `#d6a3e8` | Standard-library globals — `Math`, `console`, `JSON`, `document`, `Array`, `Promise`, `System` |

`enumMember` and `variable.constant` share `#b0a8ee` (both are the
constant family); `variable.defaultLibrary` is `#d6a3e8` (the type family).
To confirm a color came from a semantic rule rather than a TextMate scope,
hover the token or set `"editor.semanticHighlighting.enabled": false` in
the Host's settings and watch which tokens change.

## Italic-without-color rules

These rules set `fontStyle` but no `foreground` — color is inherited from a
parent scope; only the style is added. (`comment` itself is colored *and*
italic via a separate entry, so it is not in this list.)

- `entity.other.attribute-name.js` / `.ts` / `.jsx` / `.tsx`,
  `variable.language.super`,
  `variable.parameter.function.language.special.self.python` *(italic)*
- `comment.line.double-slash`, `comment.block.documentation` *(italic)*
- `keyword.control.import.python`, `keyword.control.flow.python` *(italic)*
- `markup.italic.markdown` *(italic)*

If something looks italic and you can't find a colored rule that explains
it, it's almost certainly from this list.

## Versioning

The fixtures mirror the theme's "Model A" archive convention. The live
`test-fixtures/` always tracks the current palette; each released palette
version is frozen as an immutable bundle under `test-fixtures/versions/`,
paired with the matching `themes/versions/pixel-berry-color-theme-v<ver>.json`:

```
test-fixtures/
  01-..tsx … 15-..js, README.md   # live = current palette (v0.1.0)
  versions/
    v0.0.4/  …                    # frozen "before" (pre-redesign palette)
    v0.1.0/  …                    # frozen snapshot of this palette
```

`versions/` inherits the `test-fixtures/` `.vscodeignore` exclusion (never
shipped) and is git-committed for diffing, exactly like `themes/versions/`.

## Notes on the parse

- `themes/pixel-berry-color-theme.json` contains 238 colored `tokenColors`
  entries; many declare a composite `scope` string of comma-joined
  selectors. The reverse lookup breaks composites into individual selectors
  (~408 distinct instances across 19 foreground hexes).
- Three selectors are defined twice with different colors; TextMate
  evaluation is last-wins, so the winning color is the entry defined later
  in the JSON (flagged *(conflict)* above).
- To regenerate this reverse lookup after a theme edit, parse the JSON,
  split composite `scope` strings on `,`, and group by `foreground`.
