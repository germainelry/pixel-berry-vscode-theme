# Pixel Berry — syntax color test fixtures

A passive learning aid: open these files in the Extension Development Host
with **Pixel Berry** selected, and use this README to learn which TextMate
scope (and which entry in `pixel-berry-color-theme.json`) produced each
on-screen color.

The fixtures live in `test-fixtures/` and are excluded from the packaged
`.vsix` via `.vscodeignore`. Nothing here is shipped to end users.

> **Palette:** these fixtures and this README track **v0.1.3** of the syntax
> palette (the v0.1.0 syntax-foreground redesign plus the v0.1.3 property
> recolour and new `namespace` role). Earlier palettes are archived — see
> [Versioning](#versioning) — so you can diff a fixture against the look it
> had under a previous theme version.

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

## v0.1.3 palette at a glance

| Role | Hex | Name | Notes |
|---|---|---|---|
| keyword | `#ff7ba8` | Berry Pink | keywords, control, storage, booleans/null, word-form operators, regex quantifiers |
| function | `#ffb0cf` | Rose | callables, decorators, tags, markdown/HTML headings |
| type | `#ddb0ec` | Orchid | types, classes, lifetimes, regex char-class |
| namespace | `#c0a6d8` | Grey-Lilac | module / package / namespace names (`use`/`import`/`package` paths) |
| constant | `#8fb0f2` | Cornflower | named constants, attributes, enum/symbols, CSS values, markup.bold |
| number | `#e8c98a` | Butter Yellow | numbers, units, regex escapes, HTML/markup entities |
| string | `#a8d8a8` | Sage | string literals, inline code, template/heredoc bodies |
| regexp | `#9ed0c4` | Teal-Mint | regex **literal** only (`string.regexp`) |
| link | `#86c0cc` | Teal | links / URLs (markdown) |
| variable | `#e8c5d6` | Dusty Rose | variables, parameters, `self`/`this` |
| property | `#c9b9cb` | Mauve-Grey | object/JSON keys, member properties, CSS property names |
| operator | `#aeb0a8` | Greige | symbolic operators (all languages, unified) |
| punctuation | `#978d94` | Dim Grey | delimiters, brackets, braces (de-emphasised) |
| comment | `#a8919e` | Comment Mauve | comments (italic) |
| error | `#f06a6a` | Error Red | `invalid.illegal`, `invalid.broken`, `token.error-token` |
| deprecated | `#9e8a96` | + strikethrough | `invalid.deprecated` |
| unimplemented | `#968ca0` | Muted | `invalid.unimplemented` |

Body text (unstyled tokens) is `editor.foreground` `#e8dfe8` — see the
fallthrough note below.

## Scope fallthrough — read this first

TextMate scopes are nested (e.g. `keyword.control.import.python` is a
specialization of `keyword.control`, which is a specialization of
`keyword`). When multiple theme rules match the same token, the
**most-specific** scope wins.

A few details that will trip you up:

- **Unstyled tokens** fall back to `editor.foreground` = `#e8dfe8`. This is
  *brighter* than the deliberately de-emphasised operator (`#aeb0a8`) and
  punctuation (`#978d94`) tones — so an unstyled token reads slightly
  **brighter** than styled glue, rather than identical to it (the v0.0.4
  "everything collapses to body text" problem is gone). The UI chrome uses a
  different near-white `#ede5e8` (the `colors.foreground` key) — but editor
  text does not.
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
  - `punctuation.section.embedded` → final `#ff7ba8` (keyword) not
    `#e8c5d6` (variable)
  - `entity.name.label.cs` → final `#ffb0cf` (function) not `#ddb0ec`
    (type)

## Coverage matrix

Which syntax-role each fixture exercises. Columns are the v0.1.3 roles;
✓ = present · – = not expressible in this language · ~ = partial (scope
falls through to a generic category). The `ns` column is the v0.1.3
namespace role (module/package/namespace names). Semantic columns:
`en` = enumMember, `vc` = variable.constant, `dl` = variable.defaultLibrary.

| # | Lang | kw | fn | ty | ns | const | num | str | rgx | link | var | prop | op | punc | cmt | en | vc | dl |
|---|------|----|----|----|----|-------|-----|-----|-----|------|-----|------|----|------|-----|----|----|----|
| 01 | TS | ✓ | ✓ | ✓ | ~ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 02 | JS | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ |
| 03 | Python | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | – | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ~ |
| 04 | Markdown | – | ✓ | – | – | ✓ | – | ✓ | – | ✓ | – | – | – | ✓ | – | – | – | – |
| 05 | JSON | – | – | – | – | ✓ | ✓ | ✓ | – | – | – | ✓ | – | ✓ | – | – | – | – |
| 06 | CSS | ✓ | ✓ | – | – | ✓ | ✓ | ✓ | – | – | – | ✓ | ✓ | ✓ | ✓ | – | – | – |
| 07 | HTML | – | ✓ | – | – | ✓ | ✓ | ✓ | – | – | – | – | – | ✓ | ✓ | – | – | – |
| 08 | YAML | – | ✓ | – | – | ✓ | ✓ | ✓ | – | – | – | – | – | ✓ | ✓ | – | – | – |
| 09 | Shell | ✓ | ✓ | – | – | – | ✓ | ✓ | – | – | ✓ | – | ✓ | ✓ | ✓ | – | – | – |
| 10 | Go | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | – | ✓ | ✓ | ✓ | ✓ | ✓ | –¹ | ~ | ~ |
| 11 | Rust | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | – | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ~ |
| 12 | Java | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 13 | PHP | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | – | ✓ | ✓ | ✓ | ✓ | ✓ | –² | – | – |
| 14 | SQL | ✓ | ✓ | ~ | – | – | ✓ | ✓ | – | – | – | – | ~ | ✓ | ✓ | – | – | – |
| 15 | Regex | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | – | ✓ | – | ✓ | ✓ | ✓ | – | – | – |

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
[`#f06a6a`](#f06a6a--error-red), [`#9e8a96`](#9e8a96--deprecated), and
[`#968ca0`](#968ca0--unimplemented) buckets in the reverse lookup.

## Per-file walkthrough

Hexes below are v0.1.3. "Where" references are indicative, not line-exact.

### 01-typescript.tsx — densest fixture

Open this file first. It exercises more theme rules than any other.

| What to look for | Expected hex | Scope / source |
|---|---|---|
| `import`, `export`, `enum`, `interface`, `type`, `abstract`, `class`, `return`, `yield` | `#ff7ba8` | `keyword.control` / `storage` |
| `MAX_RETRIES`, `PI_APPROX`, `HEX_MASK` (module-scope const refs) | `#8fb0f2` | semantic `variable.constant` |
| `Status.Active` / enum members | `#8fb0f2` | semantic `enumMember` |
| `Math`, `JSON`, `Array`, `Promise`, `document`, `console` globals | `#ddb0ec` | semantic `variable.defaultLibrary` |
| `User`, `Repository`, `string`, `number`, `unknown`, `void` types | `#ddb0ec` | `entity.name.type`, `support.type.primitive.ts` |
| Numbers `0xff_ff_ff`, `9_007_199_254_740_993n`, `1.5e-3` | `#e8c98a` | `constant.numeric` |
| Template literal `` `[${date}] ${msg}` `` | backticks `#a8d8a8`, `${`/`}` `#ff7ba8`, interior resets to `#e8dfe8` | `keyword.other.template.*`, `punctuation.definition.template-expression.*` |
| Regex `/^[a-z0-9]+(?:-…)*$/i` | body `#9ed0c4`, `[a-z0-9]` `#ddb0ec`, `+`/`*` `#ff7ba8` | `string.regexp`, `constant.other.character-class.regexp`, `keyword.operator.quantifier.regexp` |
| Escape chars `\t \n \\` inside strings | `#e8c98a` | `constant.character.escape` |
| JSX `<button>`, `<span>`, `<em>` tag names | `#ffb0cf` | `entity.name.tag` |
| JSX attributes `type=`, `className=`, `data-count=` | `#8fb0f2`, italic-via-parent | `entity.other.attribute-name.tsx` (italic) |
| Object literal keys `"kebab-key"`, `nested`, `list` | `#c9b9cb` | `meta.object-literal.key` |
| Member properties (`this.cache`, `parsed.id`) | `#c9b9cb` | `meta.property.object` / `support.variable.property` |
| Parameters / locals (`msg`, `target`, `count`) | `#e8c5d6` | `variable.parameter`, `variable` |
| Operators `??`, `=>`, `===`, `+` | `#aeb0a8` | `keyword.operator*` |
| `typeof` (word-form operator) | `#ff7ba8` | `keyword.operator.expression.typeof` |
| `//` line + `/** */` JSDoc comments | `#a8919e` italic | `comment` |

### 02-javascript.js — plain JS scopes (no TS-only rules)

| What to look for | Expected hex | Scope |
|---|---|---|
| `require('fs')` | `#ffb0cf` | `meta.require` |
| `KEY_RE = /^[a-z]…/` regex literal + `.test()` | body `#9ed0c4`, char-class `#ddb0ec`, quantifier `#ff7ba8` | `string.regexp` family |
| `/* … */` block comment above `KEY_RE` | `#a8919e` | `comment.block` |
| `process.cwd()`, `process.pid`, `process.platform` | `process` `#c9b9cb`, properties `#c9b9cb` | `support.variable.object.process` |
| `Math.pow`, `JSON.stringify`, `JSON.parse` | `Math`/`JSON` `#ddb0ec`, methods `#ffb0cf` | semantic `variable.defaultLibrary`, `support.function` |
| `console.log/info/debug` | `console` `#e8c5d6`, method `#ffb0cf` | `support.type.object.console`, `support.function.console` |
| `class Store extends EventEmitter` | class `#ddb0ec`, `extends` `#ff7ba8` | `variable.other.class.js`, `entity.other.inherited-class` |
| `document.querySelector`, `window.location` | DOM object `#e8c5d6`, property `#c9b9cb` | `support.type.object.dom`, `support.variable.property.dom` |
| `CACHE_DIR`, `MAX_SIZE` module consts | `#8fb0f2` | semantic `variable.constant` |
| `module.exports` | `#c0a6d8` | `support.module.node` (namespace) |

### 03-python.py — italic test-bed + semantics

| What to look for | Expected hex | Scope |
|---|---|---|
| `from`, `import` | parent color + italic | `keyword.control.import.python` (italic) |
| `if`, `for`, `with`, `return`, `yield` | parent color + italic | `keyword.control.flow.python` (italic) |
| `# double the even numbers…` line comment | `#a8919e` italic | `comment.line` |
| `class Status(Enum)` members, `Status.ACTIVE` ref | `#8fb0f2` | semantic `enumMember` |
| `@dataclass`, `@property`, `@staticmethod` decorators | `@` + identifier `#ffb0cf` | `meta.function.decorator.python` |
| `self` parameter | `#e8c5d6` | `variable.parameter.function.language.special.self.python` |
| `str`, `int`, `list`, `dict` type hints | `#ddb0ec` | `support.type.python` |
| `__post_init__`, `__init__`, `__name__` magic | `#e8c5d6` | `support.variable.magic.python` |
| `and`, `or`, `not`, `is` | `#ff7ba8` | `keyword.operator.logical.python` |
| f-string format spec `{value:.2f}`, `!r`, `!s` | placeholder `#8fb0f2` | `constant.character.format.placeholder.other.python` |
| `CACHE_DIR`, `MAX_RETRIES` module consts | `#8fb0f2` | semantic `variable.constant` |
| raw `r"…"`, bytes `b"\x00\x01\xff"` | string `#a8d8a8`, escapes `#e8c98a` | `string`, `constant.character.escape` |

> Note: `Optional` is imported but unused — a pre-existing quirk in this
> fixture, left as-is.

### 04-markdown.md — headings, emphasis, links

| What to look for | Expected hex | Scope |
|---|---|---|
| `# H1 … ###### H6` heading text | `#ffb0cf` | `markup.heading`, `entity.name.section.markdown` |
| Leading `#` marker characters | `#ffb0cf` | `markup.heading punctuation.definition.heading` |
| Setext `==` / `--` underlines | `#ffb0cf` | `markup.heading.setext` |
| `**bold**` text + `**` markers | `#8fb0f2` | `markup.bold`, `punctuation.definition.bold.markdown` |
| `*italic*`, `_italic_` text | `#ff7ba8` | `markup.italic` |
| `` `inline code` `` | `#a8d8a8` | `markup.inline.raw.markdown` |
| `> blockquote` | `#a8919e` | `markup.quote.markdown` |
| List markers `-`, `*`, `+`, `1.` | `#978d94` | `punctuation.definition.list.markdown` |
| `[link text](url "title")`, bare `<url>` | text/URL `#86c0cc`, title `#86c0cc` | `markup.underline.link.markdown`, `string.other.link.title.markdown` |
| `&amp;`, `&copy;` entities | `#e8c98a` | `constant.character.entity` |
| Fenced code (`` ```ts ``) | embedded grammar | language-specific scopes apply |

### 05-json.json — JSON-specific scopes

| What to look for | Expected hex | Scope |
|---|---|---|
| Property keys (`"name"`, `"version"`) | `#c9b9cb` | `support.type.property-name.json` |
| String values | `#a8d8a8` | `… > value.json > string.quoted.json` |
| `true` / `false`, `null` | `#ff7ba8` | `… > constant.language.json` |
| Numbers `30000`, `4.5`, `1.5` | `#e8c98a` | `constant.numeric` |

### 06-css.css — selectors, at-rules, vars, units

| What to look for | Expected hex | Scope |
|---|---|---|
| `@charset`, `@import`, `@media`, `@keyframes` | `#ff7ba8` | at-rule / `keyword.control` |
| Element selectors `html`, `body`, `button` | `#ffb0cf` | `entity.name.tag` |
| `#app` ID selector | `#ffb0cf`, `fontStyle: normal` | `entity.other.attribute-name.id` |
| `.btn`, `.container` class selectors | `#8fb0f2`, `fontStyle: normal` | `entity.other.attribute-name.class.css` |
| `:hover`, `:focus-visible`, `::before` pseudo | `#8fb0f2` | `entity.other.attribute-name.pseudo-class/-element` |
| Property names (`display`, `padding`, `color`) | `#c9b9cb` | `support.type.vendored.property-name.css` |
| Named colors (`hotpink`, `white`) + values (`flex`, `none`) | `#8fb0f2` | `support.constant.color…`, `support.constant.property-value.css` |
| Units (`px`, `rem`, `em`, `vw`, `ms`) | `#e8c98a` | `keyword.other.unit` |
| Hex color literals, `rgb()`/`hsl()` values | `#8fb0f2` | `rgb-value` |
| Combinators `>`, `+`, `~` | `#aeb0a8` | `keyword.operator.css` |
| `/* … */` comments | `#a8919e` | `comment` |

### 07-html.html — tags, attributes, entities, embeds

| What to look for | Expected hex | Scope |
|---|---|---|
| Tag names (`<html>`, `<header>`, `<button>`) | `#ffb0cf` | `entity.name.tag` |
| Attributes (`lang=`, `class=`, `href=`, `aria-label=`) | `#8fb0f2` | `entity.other.attribute-name` |
| `id="top"`, `id="name"` | `#ffb0cf` | `entity.other.attribute-name.id` |
| `<`, `>`, `/`, `=` tag punctuation | `#978d94` | `meta.tag` |
| Entities (`&mdash;`, `&amp;`, `&copy;`, `&nbsp;`) | `#e8c98a` | `constant.character.entity` |
| `<!-- comment -->` | `#a8919e` italic | `comment` |
| Embedded `<style>` / `<script type="module">` | CSS / JS scopes inside | nested grammars |

### 08-yaml.yaml — keys, scalars, anchors, multi-doc

| What to look for | Expected hex | Scope |
|---|---|---|
| Keys (`name:`, `version:`) | `#ffb0cf` | `entity.name.tag.yaml` |
| List `-` markers | `#978d94` | `punctuation.definition.block.sequence.item.yaml` |
| Quoted strings (`"https://…"`) | `#a8d8a8` | `string` |
| Anchors `&defaults`, aliases `*defaults`, merge `<<` | `#8fb0f2` for `&`/`*` constants | `constant` |
| `true`/`false`, `null`/`~` | `#ff7ba8` | `constant.language` |
| Numbers (decimal, float, `0xFF`, `0o755`, `-17`) | `#e8c98a` | `constant.numeric` |
| `# comment` lines | `#a8919e` italic | `comment` |
| Block scalars `|`, `>`; doc separator `---` | `#aeb0a8` / `#978d94` | operator / punctuation family |

### 09-shell.sh — generic fallthrough showcase

The theme defines no shell-specific scopes; everything falls through to
generic categories.

| What to look for | Expected hex | Scope |
|---|---|---|
| `#!` shebang and `# comments` | `#a8919e` italic | `comment` |
| `if`, `then`, `fi`, `for`, `case`, `esac`, `return` | `#ff7ba8` | `keyword.control` |
| `local`, `readonly` | `#ff7ba8` | `storage` |
| Function names (`log`, `retry`, `cleanup`, `main`) | `#ffb0cf` | `entity.name.function` |
| Single-quoted strings | `#a8d8a8` | `string.quoted.single` |
| Double-quoted strings with `$var` | sage + variable inside | `string.quoted.double` |
| `${BASH_SOURCE[0]}`, `$@`, `$$`, `$mode` | `#e8c5d6` | `variable` |
| Heredoc `<<EOF` vs `<<'EOF'` | content as string | grammar-defined |

### 10-go.go — package, channels, generics, iota

| What to look for | Expected hex | Scope |
|---|---|---|
| `package main` | `main` `#c0a6d8` | `entity.name.package.go` (namespace) |
| `:=` short declaration | `#aeb0a8` | `keyword.operator.assignment.go` |
| `&user`, `*T` address/pointer | `#aeb0a8` | `keyword.operator.address.go` (now unified operator) |
| Channel `<-`, `chan int` | `#aeb0a8` | `keyword.operator.channel` |
| `iota` enum pattern, `MaxRetries`, `DefaultTimeout` consts | `#8fb0f2` | `constant` |
| Struct tags `` `json:"id"` `` | `#a8d8a8` | `string` |
| `defer`, `go`, `select`, `switch`, `range` | `#ff7ba8` | `keyword.control` |
| Generics `[T any]`, `Store[T]`, type names | `#ddb0ec` | `entity.name.type` |
| `//` line + `/* … */` block comment (above `fanIn`) | `#a8919e` | `comment` |
| Member access `s.mu`, `u.ID` | `#c9b9cb` | `support.variable.property` |

### 11-rust.rs — lifetimes, traits, macros, generics

| What to look for | Expected hex | Scope |
|---|---|---|
| `'static`, `'a` lifetimes | `#ddb0ec` | `entity.name.lifetime.rust` |
| `&` borrow, `*` deref sigils | `#aeb0a8` | `keyword.operator.sigil.rust` (now unified operator) |
| `self`, `Self` | `#e8c5d6` | `variable.language.rust` |
| `println!`, `vec!`, `write!`, `eprintln!` macros | `#ffb0cf` | `support.function.std.rust` |
| `Some`, `None`, `Ok`, `Err`, `Result`, `MAX_RETRIES` | `#8fb0f2` | `support.constant.core.rust`, `variable.other.constant` |
| `Status::Active` enum variants | `#8fb0f2` | semantic `enumMember` |
| `?`, `..`, `..=`, `->`, `=>` | `#aeb0a8` | `keyword.operator.misc.rust` |
| `#[derive(…)]`, `#[allow(…)]` attributes | attribute name color | attribute scopes |
| `impl`, `trait`, `pub`, `fn`, `let`, `mut`, `match` | `#ff7ba8` | `keyword.control` / `storage` |
| `///` doc comment + `//` + `/* … */` | `#a8919e` | `comment` |

### 12-java.java — annotations, generics, enum, inner class

| What to look for | Expected hex | Scope |
|---|---|---|
| `package com.example.pixelberry;` | `package` `#ff7ba8`, path `#c0a6d8` | `keyword.other.package.java`, `storage.modifier.package.java` (namespace) |
| `import java.util.…;` | `import` `#ff7ba8`, path `#c0a6d8` | `keyword.other.import.java`, `storage.modifier.import.java` (namespace) |
| `@Override`, `@SuppressWarnings` annotations | `#ffb0cf` | `storage.type.annotation.java`, `punctuation.definition.annotation.java` |
| `enum Status { ACTIVE, IDLE, DONE }`, `Status.ACTIVE` ref | `#8fb0f2` | semantic `enumMember` |
| `MAX_RETRIES`, `DEFAULT_NAME` static finals | `#8fb0f2` | semantic `variable.constant` |
| `System.out::println` | `System` `#ddb0ec` | semantic `variable.defaultLibrary` |
| Generics `<T extends …>`, brackets | type names `#ddb0ec`, `<>` `#978d94` | `storage.type.generic.java`, `punctuation.bracket.angle.java` |
| Method names | `#ffb0cf` | `meta.method.identifier.java` |
| `int[]`, `String[]` array types | `#ddb0ec` | `storage.type.object.array.java` |
| `instanceof` (word-form) | `#ff7ba8` | `keyword.operator.instanceof.java` |
| Local variable names | `#e8c5d6` | `meta.definition.variable.name.java` |
| Braces, parens, dots, `;` | `#978d94` | `punctuation.*.java` |
| `//` + `/** Javadoc */` | `#a8919e` | `comment` |

### 13-php.php — namespaces, types, heredoc/nowdoc

| What to look for | Expected hex | Scope |
|---|---|---|
| `namespace App\Repositories;` | path `#c0a6d8` | `entity.name.type.namespace.php` (namespace) |
| `use App\Models\User;`, `use … as Alias` | `#c0a6d8` | `support.other.namespace.use.php`, `entity.other.alias.php` (namespace) |
| `interface Identifiable` region | `#c0a6d8` (via `meta.interface.php`); `extends`/`implements` `#ff7ba8` | `meta.interface.php`, `keyword.control` |
| Type hints (`string`, `int`, `array`, `?User`) | `#ddb0ec` | `storage.type.php`, `keyword.other.type.php` |
| `$this`, `$cache`, `$id` | `#ddb0ec` (`$this`), `#e8c5d6` (vars) | `variable.other.class.php`, `variable` |
| `$this->name` member access | `#c9b9cb` | `support.variable.property` |
| `@file_get_contents(…)` (`@` error suppression) | `@` `#aeb0a8` | `keyword.operator.error-control.php` |
| `instanceof` | `#aeb0a8` | `keyword.operator.type.php` |
| Method calls (`$repo->load(1)`) | `#ffb0cf` | `meta.function-call.object.php` |
| `PHP_EOL`, `__FILE__`, `__DIR__`, `MAX_RETRIES` | `#8fb0f2` | `support.constant.core.php`, `support.constant.parser-token.php` |
| Braces, parens, `;`, delimiters | `#978d94` | `punctuation.*.php` |
| `<<<EOT … EOT;` heredoc, `<<<'NOWDOC' …` nowdoc | `<<<` `#aeb0a8`, content `#a8d8a8` | `keyword.operator.heredoc.php` / `.nowdoc.php` |
| `{$this->name}` interpolation in heredoc | embedded punctuation `#ff7ba8` | `punctuation.section.embedded` |
| `//` line + `/** … */` docblock (above `load`) | `#a8919e` | `comment` / phpdoc |

### 14-sql.sql — DDL, DML, CTEs, window functions

The theme has only two SQL-specific scopes; the rest fall through to
generic keywords/strings.

| What to look for | Expected hex | Scope |
|---|---|---|
| `CREATE`, `SELECT`, `INSERT`, `WHERE`, `GROUP BY`, `WITH`, `JOIN`, `RANK() OVER` | `#ff7ba8` | `keyword` |
| `COUNT(…)`, `SUM(…)`, `AVG(…)`, `RANK()` | `#ffb0cf` | `entity.name.function` |
| Column / table names | `#e8dfe8` (fallthrough) | unstyled |
| `'Alice'`, `'active'` string literals | `#a8d8a8` | `string` |
| Numeric literals `49.99`, `10` | `#e8c98a` | `constant.numeric` |
| Type names `INTEGER`, `VARCHAR(255)`, `TIMESTAMP` | mostly fallthrough | partial coverage |
| `--` line + `/* block */` comments | `#a8919e` italic | `comment` |

### 15-regex.js — regex sub-scope showcase

| What to look for | Expected hex | Scope |
|---|---|---|
| Regex body between `/…/` | `#9ed0c4` | `string.regexp` |
| Character classes `[a-z0-9]`, `[\t\r\n\f\v ]` | `#ddb0ec` | `constant.other.character-class.regexp` |
| Quantifiers `*`, `+`, `?`, `{2,4}`, `{8,}` | `#ff7ba8` | `keyword.operator.quantifier.regexp` |
| Escape sequences `\d`, `\w`, `\s`, `\x00`, `\u…` | `#e8c98a` | `constant.character.escape` |
| Named groups `(?<scheme>…)`, backreferences `\1` | grammar-defined | mixed |
| Flags `i`, `g`, `u`, `gu`, `gimsuy` | varies | flag-specific scopes |
| Unicode property escapes `\p{L}`, `\P{N}` | varies | escape scope |
| Surrounding JS (`const`, `function`, strings, `//`) | per JS scopes | — |

## Palette → scopes (reverse lookup)

Parsed directly from `themes/pixel-berry-color-theme.json` (v0.1.3) by
iterating `tokenColors` and splitting composite `scope` strings on commas.
Every selector below appears verbatim in the JSON. 235 colored entries →
~395 distinct selector instances → 21 foreground hexes.

### `#ff7ba8` — Berry Pink / Keyword (43 scopes)

- `keyword`, `keyword.control`, `constant.language`, `storage` (+
  `storage.type.cs` / `.haskell`, `storage.modifier.import.groovy`,
  `storage.modifier.lifetime.rust`)
- word-form operators: `keyword.operator.new`, `.delete`, `.expression.*`
  (in/of/typeof/instanceof/keyof/void/delete), `.instanceof.java`,
  `.logical.python`, `.module`, `.optional`, `.ternary`
- `keyword.operator.quantifier.regexp`, `keyword.operator.sizeof.c` / `.cpp`
- `markup.italic`, `emphasis md`, `todo.emphasis`,
  `punctuation.definition.italic`
- template/embedded punctuation: `punctuation.definition.template-expression.begin`
  / `.end`, `punctuation.quasi.element`, `punctuation.section.embedded`
  (+ `.begin`, `.end`) *(conflict winner)*
- `source.json … constant.language.json` (array + dictionary)
- `meta.selector`, `selector.sass`, `token.storage`, `token.debug-token`,
  `constant.regexp.xi`, Laravel-blade embedded constant scope

### `#ffb0cf` — Rose / Function·Tag·Heading (39 scopes)

- `entity.name.function`, `entity.name.section` (+ `.markdown`),
  `entity.name.tag`, `entity.name.goto-label.php`, `entity.name.label.cs` *(conflict winner)*,
  `entity.other.attribute-name.id`
- `markup.heading` (+ `markup.heading punctuation.definition.heading`,
  `markup.heading.setext`, `.setext.1/.2.markdown`)
- `keyword.operator.expression.import`, `keyword.other.special-method`
- `meta.function-call.generic.python`, `meta.function-call.object.php` /
  `.php` / `.static.php`, `meta.function.decorator.python` /
  `.identifier.python`, `support.token.decorator.python`
- `meta.method.identifier.java`, `meta.method.groovy`,
  `punctuation.definition.annotation.java`, `storage.type.annotation.java`
- `meta.require`, `meta.diff.header.from-file` / `.to-file`,
  `punctuation.definition.from-file.diff` / `.to-file.diff`
- `support.function`, `support.function.any-method`, `support.function.console`,
  `support.function.std.rust`, `support.other.php`, `variable.function`
- `accent.xi`, `constant.character.xi`

### `#ddb0ec` — Orchid / Type (45 scopes)

- `constant.other.character-class.regexp`
- `entity.global.clojure`, `entity.name.class` (+ `.identifier.namespace.type`),
  `entity.name.function.xi`, `entity.name.label.cs` *(conflict — loses to `#ffb0cf`)*,
  `entity.name.lifetime.rust`,
  `entity.name.scope-resolution.function.call` / `.definition`,
  `entity.name.type` (+ `.class`, `.namespace`)
- `entity.other.inherited-class`, `markup.changed.diff`, `source.makefile`
- `keyword.other.type.php`, `keyword.other.array.phpdoc.php`,
  `meta.other.type.phpdoc.php`
- `storage.type.java`, `storage.type.generic.java`,
  `storage.type.object.array.java`, `storage.type.php`
- `support.class`, `support.constant.math`
- `support.type.builtin.ts` / `.tsx`, `support.type.primitive` (+ `.ts`, `.tsx`),
  `support.type.python`, `support.type.swift`, `support.type.vb.asp`,
  `support.type.type.flowtype`, `support.type.posix-reserved.c` / `.cpp`,
  `support.type.prelude.elm`, `support.type.*.hlsl`
  (fx/object/object.rw/sampler/texture), `support.variable.semantic.hlsl`
- `variable.other.class.js` / `.ts` / `.php`

### `#c0a6d8` — Grey-Lilac / Namespace (13 scopes)

- `entity.name.namespace`, `entity.name.package.go`, `entity.name.type.module`,
  `entity.name.type.namespace.php`
- `support.module.node`, `support.type.object.module`
- `support.other.namespace.php` / `.use.php` / `.use-as.php`,
  `entity.other.alias.php`, `meta.interface.php`
- `storage.modifier.import.java`, `storage.modifier.package.java`

### `#8fb0f2` — Cornflower / Constant (35 scopes)

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
- `meta.symbol.clojure`, `variable.other.constant`

### `#e8c98a` — Butter Yellow / Number (5 scopes)

- `constant.character.entity`
- `constant.character.escape`
- `constant.numeric`
- `keyword.other.unit`
- `token.warn-token`

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

### `#9ed0c4` — Teal-Mint / Regex literal (3 scopes)

- `entity.name.class.xi`
- `keyword.control.xi`
- `string.regexp`

### `#86c0cc` — Teal / Link (5 scopes)

- `markup.underline.link.image.markdown`
- `markup.underline.link.markdown`
- `string.other.link.description.markdown`
- `string.other.link.title.markdown`
- `token.info-token`

### `#e8c5d6` — Dusty Rose / Variable (31 scopes)

- `variable`, `variable.c`, `variable.interpolation`, `variable.language`
  (+ `.rust`), `variable.other.generic-type.haskell`
- `variable.parameter.function` (+ `.coffee`, `.js`, `.python`,
  `.language.python`, `.language.special.self.python`)
- `function.parameter` (+ `.cs`, `.ruby`)
- `entity.name.variable.local.cs`
- `meta.arguments.coffee`, `meta.definition.variable.name.groovy` / `.java`
- `meta.function.c` / `.cpp`, `meta.template.expression`
- `punctuation.section.embedded` *(conflict — loses to `#ff7ba8`)*
- `source.java`
- `support.type.object.console`, `support.type.object.dom`,
  `support.variable.magic.python`
- `text.bracketed`, `text.variable`, `token.variable.parameter.java`
- `constant.character.character-class.regexp.xi`

### `#c9b9cb` — Mauve-Grey / Property (14 scopes)

- `meta.object-literal.key`, `meta.property.object`
- `support.type.property-name` (+ `.json`, `.json punctuation`)
- `support.type.vendored.property-name.css`
- `source.json … dictionary.json > string.quoted.json` (+ `> punctuation.string`)
- `support.variable.dom`, `support.variable.object.node` / `.process`,
  `support.variable.property` (+ `.dom`, `.process`)

### `#aeb0a8` — Greige / Operator (43 scopes)

- `keyword.operator` (base) + arithmetic / assignment (+ compound) / bitwise
  (+ shift) / comparison / relational / logical / increment / decrement
  across c, cpp, php, go, js, ts, css, scss
- `keyword.operator.address.go`, `.channel`, `.assignment.go`,
  `.arithmetic.go`
- `keyword.operator.sigil.rust`, `.misc.rust`
- `keyword.operator.error-control.php`, `.heredoc.php`, `.nowdoc.php`,
  `.regexp.php`, `.type.php`
- `keyword.operator.less`, `keyword.operator.scss`, `control.elements`

### `#978d94` — Dim Grey / Punctuation (81 scopes)

- `punctuation.separator.*` (delimiter, key-value, period.java/.python,
  element.python, arguments.python, comma.css, c/cpp, unison pipe/delimiter)
- `punctuation.definition.list.*` (markdown, python, unison),
  `punctuation.definition.arguments.*.python`,
  `punctuation.parenthesis.begin/.end.python`,
  `punctuation.definition.block.sequence.item.yaml`,
  `punctuation.definition.heading.markdown`,
  `punctuation.definition.metadata.markdown` *(conflict winner)*,
  `punctuation.definition.hash.unison`, `.delayed.unison`, `.ability.*.unison`
- the Java `punctuation.*.java` family: block / method / class / inner-class
  `section.*` (+ `.bracket.curly`), `definition.method-parameters.*`,
  `separator.period.java`, `bracket.angle.java`, `terminator.java`
- the PHP `punctuation.*.php` family: `section.scope.*`, `section.array.*`,
  `definition.parameters/.arguments/.array/.storage-type.*.bracket.round`,
  `definition.*.bracket.curly`, `definition.section.switch-block.*`,
  `separator.delimiter.php`, `terminator.expression.php`
- `punctuation.section.block.*.c` / `.cpp`,
  `punctuation.section.parameters/.parens.*.c`,
  `punctuation.terminator.statement.c`
- `block.scope.begin` / `.end`, `function.brace`, `meta.brace.square`, `meta.tag`,
  `beginning.punctuation.definition.list.markdown`

### `#a8919e` — Comment Mauve (6 scopes)

- `comment` *(italic)*
- `comment markup.link`
- `punctuation.definition.comment` *(italic)*
- `markup.quote.markdown`
- `beginning.punctuation.definition.list.markdown.xi`
- `punctuation.definition.tag.xi`

### `#9e8a96` — Deprecated (1 scope)

- `invalid.deprecated` *(strikethrough)*

### `#f06a6a` — Error Red (5 scopes)

- `invalid.broken`
- `invalid.illegal`
- `invalid.illegal.bad-ampersand.html`
- `invalid.illegal.non-null-typehinted.php`
- `token.error-token`

### `#968ca0` — Unimplemented (1 scope)

- `invalid.unimplemented`

### Niche / legacy buckets

A few selectors keep colors that are now off the main palette — a dedicated
diff tone plus `.xi` (Xi-editor) grammar leftovers that no fixture here
triggers:

- `#d17b8b` — `markup.deleted.diff` (dedicated removed-diff red)
- `#e8dfe8` — `invalid.xi` (= body text `editor.foreground`)
- `#b8a3e8` — `wikiword.xi`
- `#ffffff` — `constant.other.color.rgb-value.xi`

## Semantic tokens

Semantic tokens are emitted by the language server, not the TextMate
grammar. They override TextMate scopes when active.

| Semantic token | Hex | What triggers it |
|---|---|---|
| `enumMember` | `#8fb0f2` | TS/Rust/Java/Python enum member refs — `Status.Active` (01), `Status::Active` (11), `Status.ACTIVE` (12), `Status.ACTIVE` (03) |
| `variable.constant` | `#8fb0f2` | Module/class-scope const names — `MAX_RETRIES`, `CACHE_DIR` (01/02/03/12) |
| `variable.defaultLibrary` | `#ddb0ec` | Standard-library globals — `Math`, `console`, `JSON`, `document`, `Array`, `Promise`, `System` |

`enumMember` and `variable.constant` share `#8fb0f2` (both are the
constant family); `variable.defaultLibrary` is `#ddb0ec` (the type family).
To confirm a color came from a semantic rule rather than a TextMate scope,
hover the token or set `"editor.semanticHighlighting.enabled": false` in
the Host's settings and watch which tokens change.

> Namespace note: the theme has no explicit `semanticTokenColors.namespace`
> override, but it does not need one — VS Code's standard semantic-token
> fallback maps the `namespace` token type to `entity.name.namespace`, which
> the theme colors `#c0a6d8`. So under an LSP (e.g. the Red Hat Java
> extension) namespace/package tokens render the same grey-lilac as they do
> via the TextMate path with the LSP off.

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
  01-..tsx … 15-..js, README.md   # live = current palette (v0.1.3)
  versions/
    v0.0.4/  …                    # frozen "before" (pre-redesign palette)
    v0.1.0/  …                    # frozen snapshot of the redesign palette
    v0.1.3/  …                    # frozen snapshot of this palette
```

`versions/` inherits the `test-fixtures/` `.vscodeignore` exclusion (never
shipped) and is git-ignored locally for side-by-side diffing, exactly like
the on-disk `themes/versions/` snapshots.

## Notes on the parse

- `themes/pixel-berry-color-theme.json` contains 235 colored `tokenColors`
  entries; many declare a composite `scope` string of comma-joined
  selectors. The reverse lookup breaks composites into individual selectors
  (~395 distinct instances across 21 foreground hexes).
- Three selectors are defined twice with different colors; TextMate
  evaluation is last-wins, so the winning color is the entry defined later
  in the JSON (flagged *(conflict)* above).
- To regenerate this reverse lookup after a theme edit, parse the JSON,
  split composite `scope` strings on `,`, and group by `foreground`.
