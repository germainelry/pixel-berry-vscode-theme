# Pixel Berry — syntax color test fixtures

A passive learning aid: open these files in the Extension Development Host
with **Pixel Berry** selected, and use this README to learn which TextMate
scope (and which entry in `pixel-berry-color-theme.json`) produced each
on-screen color.

The fixtures live in `test-fixtures/` and are excluded from the packaged
`.vsix` via `.vscodeignore`. Nothing here is shipped to end users.

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

## Scope fallthrough — read this first

TextMate scopes are nested (e.g. `keyword.control.import.python` is a
specialization of `keyword.control`, which is a specialization of
`keyword`). When multiple theme rules match the same token, the
**most-specific** scope wins.

A few details that will trip you up:

- **Unstyled tokens** fall back to `editor.foreground` = `#e8dfe8`.
  This is the *same hex* as the pale grey used for most punctuation
  (`keyword.operator`, `meta.tag`, `punctuation.separator.delimiter`,
  etc.), so an unstyled token and a deliberately-styled-grey token are
  visually identical. (The UI chrome uses a different near-white
  `#f0e8f0` — the `colors.foreground` key — but editor text does not.)
- **Italic-without-color** entries inherit color from a parent scope
  but render italic. See
  [italic-without-color rules](#italic-without-color-rules).
- **Semantic tokens** (emitted by language servers) override TextMate
  scopes when the LSP is active. The theme defines three — see the
  [Semantic tokens](#semantic-tokens) table. To verify a color came
  from a semantic rule rather than a scope, toggle
  `"editor.semanticHighlighting.enabled": false` in the Host's
  settings.
- **Conflicting entries**: two scopes are defined twice with different
  colors. The *later* entry in the JSON wins:
  - `keyword.operator.less` → final color `#b8a3e8` (later) not
    `#9bd4b9` (earlier)
  - `punctuation.section.embedded` (no `.begin`/`.end`) → final color
    `#ff6b9d` (later) not `#e8c5d6` (earlier)

## Per-file walkthrough

### 01-typescript.tsx — 38 scope categories (densest)

Open this file first. It exercises more theme rules than any other.

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| `import`, `export`, `from` keywords | line 2–3 | `#ff6b9d` italic-via-parent | `keyword.control` |
| `MAX_RETRIES`, `PI_APPROX` (module-scope const refs) | line 6–10 | `#b8a3e8` lavender | semantic `variable.constant` |
| `Math.PI` | line 7 | `Math` = `#d6a3e8`, `.PI` = `#b8a3e8` | `support.constant.math` + `support.constant.property.math` |
| Numbers (`0xff_ff_ff`, `9_007_199_254_740_993n`, `1.5e-3`) | line 8–10 | `#b8a3e8` lavender | `constant.numeric` |
| `enum Status { Active, Idle, Done }` members | line 12 | `#9bd4b9` teal | semantic `enumMember` |
| `interface`, `type`, `extends`, `implements` | line 14–43 | `#ff6b9d` | `keyword.control` / `storage.type` |
| `User`, `Repository`, `UserRepo` class/type names | line 14–58 | `#d6a3e8` bright purple | `entity.name.type.class`, `entity.name.class` |
| `string`, `number`, `unknown`, `void` primitives | line 14–24 | `#d6a3e8` | `support.type.primitive.ts` |
| `@deprecated` decorator | line 47 | `@` styled via punctuation rule | decorator scopes |
| Template literal `` `[${date}] ${msg}` `` | line 16 | backticks `#a8d8a8` sage, `${`/`}` `#ff6b9d` hot pink, interior expression resets to `#e8dfe8` | `keyword.other.template.*`, `punctuation.definition.template-expression.*`, `meta.template.expression` |
| Regex `/^[a-z0-9]+(?:-…)*$/i` | line 60 | body `#9bd4b9` teal, `[a-z0-9]` `#e8c5d6`, `+`/`*` `#b8a3e8` | `string.regexp`, `constant.other.character-class.regexp`, `keyword.operator.quantifier.regexp` |
| Escape chars `\t \n \\` inside strings | line 61 | `#9bd4b9` teal | `constant.character.escape` |
| JSX `<button>` `<span>` tags | line 67–77 | tag name `#e8c5d6` dusty rose | `entity.name.tag` |
| JSX attributes `type=` `className=` `data-count=` | line 68–72 | italic-via-parent, color `#e8c5d6` | `entity.other.attribute-name.tsx` italic |
| `document.querySelector`, `console.log`, `Array.from` | various | object `#d6a3e8`, method `#ffa3c7` | semantic `variable.defaultLibrary` |
| Object literal keys `"kebab-key"`, `nested`, `list` | line 79 | `#e8c5d6` | `meta.object-literal.key` |

### 02-javascript.js — 21 scope categories

This isolates the **JS-only** scopes that don't fire in TypeScript.

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| `require('fs')` | line 4–6 | `#ffa3c7` light pink | `meta.require` |
| `process.cwd()`, `process.pid`, `process.platform` | line 8, 57 | `process` `#e8c5d6`, properties `#b8a3e8` | `support.variable.object.process`, `support.variable.property.process` |
| `Math.pow` | line 9 | `Math` `#d6a3e8`, `pow` `#ffa3c7` | `support.constant.math` |
| Class `Store extends EventEmitter` | line 11 | class name `#d6a3e8`, `extends` `#ff6b9d` | `variable.other.class.js`, `entity.other.inherited-class` |
| `console.log`, `console.info`, `console.debug` | line 49, 55 | `console` `#e8c5d6`, method `#ffa3c7` | `support.type.object.console`, `support.function.console` |
| `JSON.stringify`, `JSON.parse` | line 45, 49 | `#b8a3e8` lavender | `support.constant.json` |
| `document.querySelector`, `window.location` | line 51–54 | DOM object `#e8c5d6`, property `#9bd4b9` (`.querySelector`) | `support.type.object.dom`, `support.variable.property.dom` |
| `module.exports` | line 61 | `#d6a3e8` | `support.module.node` |

### 03-python.py — 22 scope categories

Italic test-bed: control keywords are italic without explicit color.

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| `from`, `import` | line 3–6 | parent color + italic | `keyword.control.import.python` italic |
| `if`, `for`, `with`, `return`, `yield` | various | parent color + italic | `keyword.control.flow.python` italic |
| `@dataclass`, `@property`, `@staticmethod` decorators | line 11, 27, 31 | `@` `#ffa3c7`, identifier `#9bd4b9` | `meta.function.decorator.python`, `meta.function.decorator.identifier.python` |
| `self` parameter | line 18, 26, … | `#d6a3e8` bright purple | `variable.parameter.function.language.special.self.python` |
| `str`, `int`, `list`, `dict` type hints | line 13–15 | `#9bd4b9` teal | `support.type.python` |
| `__post_init__`, `__init__`, `__name__` | line 18, 26, 60 | `#e8c5d6` dusty rose | `support.variable.magic.python` |
| `and`, `or`, `not` keywords | (used in `if … and …`) | `#ff6b9d` hot pink (not generic operator) | `keyword.operator.logical.python` |
| f-string format spec `{value:.2f}` | line 22, 54 | placeholder `#b8a3e8` | `constant.character.format.placeholder.other.python` |
| Module-scope `CACHE_DIR`, `MAX_RETRIES` | line 9–10 | `#b8a3e8` | semantic `variable.constant` |

### 04-markdown.md — 18 scope categories (the original motivator)

This is the file that started the investigation. Look at it carefully.

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| `# H1 … ###### H6` heading **text** | line 1–11 | `#e8c5d6` dusty rose | `markup.heading`, `entity.name.section.markdown` |
| Leading `#` marker characters | line 1–11 | `#ffa3c7` light pink | `markup.heading punctuation.definition.heading` (overrides the dusty-rose heading rule) |
| Setext `==` and `--` underlines | line 13, 16 | `#e8dfe8` pale grey | `markup.heading.setext` |
| `**bold**` text | line 23 | `#b8a3e8` lavender | `markup.bold` |
| `**` markers around bold | line 23 | `#b8a3e8` (markdown-specific) | `punctuation.definition.bold.markdown` |
| `*italic*`, `_italic_` text | line 23 | `#ff6b9d` hot pink | `markup.italic` |
| `` `inline code` `` | line 23 | `#a8d8a8` sage green | `markup.inline.raw.markdown` |
| `> blockquote` | line 27–30 | `#7a6580` dim mauve | `markup.quote.markdown` |
| List markers `-`, `*`, `+`, `1.` | line 36–52 | `#e8c5d6` | `punctuation.definition.list.markdown` |
| `[link text](url "title")` | line 58 | text `#ffa3c7`, brackets `#e8c5d6` | `string.other.link.title.markdown`, `markup.underline.link.markdown` |
| `&amp;`, `&copy;` entities | line 73 | `#e8c5d6` | `constant.character.entity` |
| Fenced code (`` ```ts ``) | line 78–89 | content uses embedded grammar | language-specific scopes apply |

### 05-json.json — 8 scope categories

Demonstrates JSON-specific scopes (`source.json …`) that other languages
don't trigger.

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| Property keys (`"name"`, `"version"`) | throughout | `#e8c5d6` dusty rose | `support.type.property-name.json` |
| String values (`"pixel-berry-fixture"`) | line 2 | `#a8d8a8` sage | `… > value.json > string.quoted.json` |
| Booleans `true` / `false`, `null` | line 4, 41, 39 | `#9bd4b9` teal | `… > constant.language.json` |
| Numbers `1.0.0`, `30000`, `4.5` | line 24, 36, 47 | `#b8a3e8` | `constant.numeric` |

### 06-css.css — 25 scope categories

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| `@import`, `@charset`, `@media`, `@keyframes` | various | `#ff6b9d` | `keyword.control` / at-rule scopes |
| Element selectors `html`, `body`, `button` | line 17, 36 | `#e8c5d6` | `entity.name.tag` |
| `#app`, `#root` ID selectors | line 24 | `#ffa3c7` light pink, `fontStyle: normal` (italic disabled) | `entity.other.attribute-name.id` |
| `.btn`, `.container` class selectors | line 26, 31–34 | `#b8a3e8` lavender, `fontStyle: normal` | `entity.other.attribute-name.class.css` |
| `:hover`, `:focus-visible`, `::before`, `:disabled` pseudo | line 42–53 | `#9bd4b9` teal | `entity.other.attribute-name.pseudo-class`, `.pseudo-element` |
| CSS property names (`display`, `padding`, `color`) | throughout | `#9bd4b9` teal | `support.type.vendored.property-name.css` |
| Named colors (`hotpink`, `white`) | line 22, 52 | `#b8a3e8` | `support.constant.color.w3c-standard-color-name.css` |
| Property values (`flex`, `none`, `column`) | line 25–28 | `#b8a3e8` | `support.constant.property-value.css` |
| Units (`px`, `rem`, `em`, `vw`, `ms`) | throughout | `#e8c5d6` | `keyword.other.unit` |
| Hex color literals `#ff6b9d` | line 6 | `#9bd4b9` teal | `rgb-value` |
| Selector combinators `>`, `+`, `~` | line 24 | `#9bd4b9` | `keyword.operator.css` |
| `var(--color-primary)`, `--color-primary` declaration | throughout | constant/keyword | `constant`, var dashes |

### 07-html.html — 12 scope categories

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| Tag names (`<html>`, `<head>`, `<header>`, `<button>`) | throughout | `#e8c5d6` dusty rose | `entity.name.tag` |
| Attributes (`lang=`, `class=`, `href=`, `aria-label=`) | throughout | `#b8a3e8` lavender | `entity.other.attribute-name` |
| `id="top"`, `id="root"`, `id="name"` | line 18, 38 | `#ffa3c7` light pink | `entity.other.attribute-name.id` |
| `<`, `>`, `/`, `=` tag punctuation | throughout | `#e8dfe8` pale grey | `meta.tag` |
| Entities (`&mdash;`, `&amp;`, `&copy;`, `&nbsp;`) | line 19, 24, 33 | `#e8c5d6` | `constant.character.entity` |
| `<!-- comment -->` | line 17 | `#7a6580` italic | `comment` |
| Embedded `<style>` block | line 9–12 | CSS scopes inside | nested CSS grammar |
| Embedded `<script type="module">` | line 49–53 | JS scopes inside | nested JS grammar |

### 08-yaml.yaml — 9 scope categories

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| Keys (`name:`, `version:`) | throughout | varies by grammar | `entity.name.tag.yaml` or generic |
| List `-` markers | line 6, 9, 39 | `#e8dfe8` | `punctuation.definition.block.sequence.item.yaml` |
| Quoted strings (`"https://…"`) | line 23 | `#a8d8a8` | `string` |
| Anchors `&defaults` and aliases `*defaults` | line 14, 19, 23 | `#b8a3e8` for `&` / `#` constants | `constant` rule |
| Booleans `true`/`false`, `null`/`~` | line 4, 40 | `#9bd4b9` | `constant.language` |
| Numbers | line 41–46 | `#b8a3e8` | `constant.numeric` |
| `# comment` lines | line 1, 50 | `#7a6580` italic | `comment` |
| Block scalars `|`, `>` | line 25, 30 | varies | `keyword.operator` family |
| Multi-doc separator `---` | line 2, 49 | varies | `punctuation` |

### 09-shell.sh — 8 scope categories

The theme defines no shell-specific scopes; everything falls through to
generic categories. Use this file to see what "no language-specific
styling" looks like.

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| `#!/usr/bin/env bash` shebang and `# comments` | line 1–2 | `#7a6580` italic | `comment` |
| `if`, `then`, `fi`, `for`, `do`, `done`, `case`, `esac`, `return` | throughout | `#ff6b9d` | `keyword.control` |
| `local`, `readonly` | line 6, 13 | `#ff6b9d` | `storage` |
| Single-quoted strings (no expansion) | line 53 | `#a8d8a8` sage | `string.quoted.single` |
| Double-quoted strings with `$var` | throughout | sage + variable inside | `string.quoted.double` |
| `${BASH_SOURCE[0]}`, `$@`, `$$` | line 8, 50, 47 | varies | `variable` |
| Heredoc `<<EOF` vs `<<'EOF'` | line 47–55 | content as string | grammar-defined |

### 10-go.go — 14 scope categories

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| `package main` | line 2 | `main` = `#d6a3e8` bright purple | `entity.name.package.go` |
| `:=` short var declaration | throughout | `#d6a3e8` | `keyword.operator.assignment.go` |
| `&user`, `*int` address/pointer | line 88, 60 | `#ff6b9d` hot pink | `keyword.operator.address.go` |
| `+`, `-`, `*`, `/` arithmetic | various | `#ff6b9d` (Go-specific) | `keyword.operator.arithmetic.go` |
| Channel `<-`, `chan int` | line 81–93 | `#9bd4b9` teal | `keyword.operator.channel` |
| `iota` enum pattern | line 18–23 | `iota` is a constant | `constant` |
| Struct tags `` `json:"id"` `` | line 41–43 | tag string is `#a8d8a8` | `string` |
| `defer`, `go`, `select` | throughout | `#ff6b9d` | `keyword.control` |
| Generics `[T any]`, `Store[T]` | line 47, 56 | `T` color, type params | type/identifier scopes |

### 11-rust.rs — 16 scope categories

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| `'static`, `'a` lifetime annotations | line 6, 23, 33 | `#d6a3e8` | `entity.name.lifetime.rust` |
| `&` borrow, `*` deref sigils | throughout | `#ff6b9d` | `keyword.operator.sigil.rust` |
| `self`, `Self` | line 26, 35–43 | `#e8c5d6` | `variable.language.rust` |
| `println!`, `vec!`, `write!`, `format!` macros | line 17, 90 | `#ffa3c7` | `support.function.std.rust` |
| `Some`, `None`, `Ok`, `Err`, `Result` | line 34, 86 | `#b8a3e8` | `support.constant.core.rust` |
| `?` try operator, `..` range, `..=` inclusive | line 78, 82 | `#e8dfe8` pale grey | `keyword.operator.misc.rust` |
| `#[derive(…)]`, `#[allow(…)]` attributes | line 5, 71 | attribute name color | attribute scopes |
| `impl`, `trait`, `pub`, `fn`, `let`, `mut` | throughout | `#ff6b9d` | `keyword.control` / `storage` |

### 12-java.java — 22 scope categories

The Pixel Berry theme has the most language-specific rules for Java.

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| `package com.example.pixelberry;` | line 2 | source-wide `#e8c5d6` | `source.java` |
| `import java.util.…;` | line 4–9 | `import` `#d6a3e8` | `storage.modifier.import.java` |
| `@Override`, `@SuppressWarnings` annotations | line 41–42, 54 | `#d6a3e8` bright purple | `storage.type.annotation.java` |
| Generics `<T extends …>`, `<U extends …>` | line 13, 53 | type names purple, brackets pale | `storage.type.generic.java`, `punctuation.bracket.angle.java` |
| Method definitions (`public final class`, `public Optional<T>`) | line 53 | method name `#ffa3c7` | `meta.method.java` |
| `int[]`, `String[]` array types | line 65 | `[]` `#d6a3e8` | `storage.type.object.array.java` |
| `instanceof` operator | line 58 | `#ff6b9d` | `keyword.operator.instanceof.java` |
| Local variable names | line 67–68 | `#e8c5d6` | `meta.definition.variable.name.java` |
| Method bodies, `;`, `{`, `}` | throughout | `#e8dfe8` pale grey | massive `java modifier.import` punctuation rule |

### 13-php.php — 22 scope categories

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| `namespace App\Repositories;` | line 5 | namespace name purple | `support.other.namespace.php` |
| `use App\Models\User;` | line 7–9 | `#d6a3e8` | `support.other.namespace.use.php` |
| `use … as Alias` aliases | line 8 | `#d6a3e8` | `support.other.namespace.use-as.php`, `entity.other.alias.php` |
| `interface Identifiable` | line 13 | `#d6a3e8` | `meta.interface.php` |
| `extends BaseRepository`, `implements RepositoryContract` | line 31, 17 | `#d6a3e8` | inherited / interface scopes |
| Type hints (`string`, `int`, `array`, `?User`) | throughout | `#d6a3e8` | `storage.type.php`, `keyword.other.type.php` |
| `$this` | throughout | `#e8c5d6` | `variable.other.class.php` |
| `@file_get_contents(…)` (the `@` error suppression) | line 47 | `@` = `#ff6b9d` | `keyword.operator.error-control.php` |
| `instanceof` | line 79 | `#ff6b9d` | `keyword.operator.type.php` |
| Method calls (`$this->cache`, `$repo->load(1)`) | various | method name `#ffa3c7` | `meta.function-call.object.php` |
| `PHP_EOL`, `__FILE__`, `__DIR__` magic constants | line 80, 46, 62 | `#b8a3e8` | `support.constant.core.php`, `.parser-token.php` |
| `<<<EOT … EOT;` heredoc, `<<<'NOWDOC' … NOWDOC;` nowdoc | line 60–66, 70–72 | `<<<` = `#ff6b9d`, content = `#a8d8a8` (heredoc interpolated) | `keyword.operator.heredoc.php`, `.nowdoc.php` |
| `{$this->name}` interpolation in heredoc | line 62 | embedded punctuation `#ff6b9d` | `punctuation.section.embedded.begin/.end` |

### 14-sql.sql — 8 scope categories

The theme has only two SQL-specific scopes (`text.variable`,
`text.bracketed`); the rest fall through to generic keywords/strings.

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| `CREATE`, `SELECT`, `INSERT`, `UPDATE`, `WHERE`, `GROUP BY`, `HAVING`, `WITH`, `JOIN`, `RANK() OVER` | throughout | `#ff6b9d` | `keyword` |
| Column / table names | throughout | falls back to `editor.foreground` | unstyled |
| `'Alice'`, `'active'` string literals | line 24–26 | `#a8d8a8` | `string` |
| Numeric literals `49.99`, `10` | line 28, 50 | `#b8a3e8` | `constant.numeric` |
| `--` line comments and `/* block */` comments | line 1, 3 | `#7a6580` italic | `comment` |
| `COUNT(…)`, `SUM(…)`, `AVG(…)`, `RANK()` | line 33–47 | `#ffa3c7` | `entity.name.function` |
| Type names `INTEGER`, `VARCHAR(255)`, `TIMESTAMP` | line 5–9 | varies — most fall through | partial coverage |

### 15-regex.js — regex showcase

Every line is a regex literal. Use this to confirm what each
regex sub-scope looks like.

| What to look for | Where | Expected hex | Scope |
|---|---|---|---|
| Regex body between `/…/` | throughout | `#9bd4b9` teal | `string.regexp` |
| Character classes `[a-z0-9]`, `[\t\r\n\f\v ]` | throughout | `#e8c5d6` dusty rose | `constant.other.character-class.regexp` |
| Quantifiers `*`, `+`, `?`, `{2,4}`, `{8,}` | throughout | `#b8a3e8` lavender | `keyword.operator.quantifier.regexp` |
| Escape sequences `\d`, `\w`, `\s`, `\t`, ` `, `\x00` | throughout | `#9bd4b9` | `constant.character.escape` |
| Named groups `(?<scheme>…)`, backreferences `\1` | line 11, 35 | mixed | grammar-defined |
| Flags `i`, `g`, `u`, `gu`, `gimsuy` | throughout | varies | flag-specific scopes |
| Unicode property escape `\p{Emoji_Presentation}`, `\P{N}` | line 27–29 | varies | escape scope |

## Palette → scopes (reverse lookup)

Parsed directly from `themes/pixel-berry-color-theme.json` by iterating
`tokenColors` and splitting composite scopes by comma. Every selector
below appears verbatim in the JSON.

### `#7a6580` — Dim Mauve (6 scopes)

- `beginning.punctuation.definition.list.markdown.xi`
- `comment` *(italic)*
- `comment markup.link`
- `markup.quote.markdown`
- `punctuation.definition.comment` *(italic)*
- `punctuation.definition.tag.xi`

### `#9bd4b9` — Teal / Mint (40 scopes)

- `constant.character.escape`
- `constant.keyword.clojure`
- `constant.language.symbol.elixir`
- `constant.language.symbol.ruby`
- `constant.other.symbol`
- `entity.name.class.xi`
- `entity.other.attribute-name.pseudo-class`
- `entity.other.attribute-name.pseudo-element`
- `keyword.control.xi`
- `keyword.operator.arithmetic`
- `keyword.operator.arithmetic.php`
- `keyword.operator.assignment`
- `keyword.operator.assignment.compound.js`
- `keyword.operator.assignment.compound.ts`
- `keyword.operator.bitwise`
- `keyword.operator.bitwise.php`
- `keyword.operator.channel`
- `keyword.operator.comparison`
- `keyword.operator.comparison.php`
- `keyword.operator.css`
- `keyword.operator.decrement`
- `keyword.operator.increment`
- `keyword.operator.less` *(conflict — see below)*
- `keyword.operator.logical`
- `keyword.operator.logical.php`
- `keyword.operator.relational`
- `keyword.operator.scss`
- `meta.function.decorator.identifier.python`
- `rgb-value`
- `source.json meta.structure.array.json > constant.language.json`
- `source.json meta.structure.dictionary.json > constant.language.json`
- `string.regexp`
- `support.function`
- `support.token.decorator.python`
- `support.type.object.dom`
- `support.type.posix-reserved.c`
- `support.type.posix-reserved.cpp`
- `support.type.prelude.elm`
- `support.type.python`
- `support.type.vendored.property-name.css`

### `#a8d8a8` — Sage Green (17 scopes)

- `beginning.punctuation.definition.quote.markdown.xi`
- `keyword.other.substitution.begin`
- `keyword.other.substitution.end`
- `keyword.other.template.begin`
- `keyword.other.template.end`
- `markup.inline.raw.markdown`
- `markup.inline.raw.string.markdown`
- `markup.inserted.diff`
- `meta.definition.class.inherited.classes.groovy`
- `punctuation.definition.string.begin`
- `punctuation.definition.string.end`
- `source.ini`
- `source.json meta.structure.array.json > value.json > string.quoted.json`
- `source.json meta.structure.array.json > value.json > string.quoted.json > punctuation`
- `source.json meta.structure.dictionary.json > value.json > string.quoted.json`
- `source.json meta.structure.dictionary.json > value.json > string.quoted.json > punctuation`
- `string`

### `#b8a3e8` — Lavender (34 scopes)

- `constant`
- `constant.character.format.placeholder.other.python`
- `constant.numeric`
- `control.elements`
- `entity.other.attribute-name`
- `entity.other.attribute-name.class.css` *(fontStyle: normal)*
- `inline-color-decoration rgb-value`
- `keyword.operator.less` *(conflict winner — last in JSON)*
- `keyword.operator.quantifier.regexp`
- `less rgb-value`
- `markup.bold`
- `punctuation.definition.bold.markdown`
- `punctuation.definition.constant`
- `storage.type.haskell`
- `support.constant.color.w3c-standard-color-name.css`
- `support.constant.color.w3c-standard-color-name.scss`
- `support.constant.core.php`
- `support.constant.core.rust`
- `support.constant.elm`
- `support.constant.ext.php`
- `support.constant.font-name`
- `support.constant.json`
- `support.constant.parser-token.php`
- `support.constant.property.math`
- `support.constant.property-value.css`
- `support.constant.property-value.scss`
- `support.constant.std.php`
- `support.variable.property.process`
- `todo.bold`
- `token.warn-token`
- `variable.parameter.function.language.python`
- `variable.parameter.function.python`
- `wikiword.xi`

### `#d6a3e8` — Bright Purple (55 scopes)

- `entity.global.clojure`
- `entity.name.class`
- `entity.name.class.identifier.namespace.type`
- `entity.name.function.xi`
- `entity.name.label.cs`
- `entity.name.lifetime.rust`
- `entity.name.namespace`
- `entity.name.package.go`
- `entity.name.scope-resolution.function.call`
- `entity.name.scope-resolution.function.definition`
- `entity.name.type`
- `entity.name.type.class`
- `entity.name.type.module`
- `entity.name.type.namespace`
- `entity.other.alias.php`
- `entity.other.inherited-class`
- `import.storage.java`
- `keyword.operator.assignment.go`
- `keyword.other.array.phpdoc.php`
- `keyword.other.type.php`
- `markup.changed.diff`
- `meta.interface.php`
- `meta.other.type.phpdoc.php`
- `punctuation.definition.bold`
- `source.makefile`
- `storage.modifier.import.groovy`
- `storage.modifier.import.java`
- `storage.type.annotation.java`
- `storage.type.cs`
- `storage.type.generic.java`
- `storage.type.java`
- `storage.type.object.array.java`
- `storage.type.php`
- `support.class`
- `support.constant.math`
- `support.module.node`
- `support.other.namespace.php`
- `support.other.namespace.use.php`
- `support.other.namespace.use-as.php`
- `support.type.builtin.ts`
- `support.type.builtin.tsx`
- `support.type.object.module`
- `support.type.primitive`
- `support.type.primitive.ts`
- `support.type.primitive.tsx`
- `support.type.swift`
- `support.type.vb.asp`
- `support.variable.semantic.hlsl`
- `token.storage.type.java`
- `variable.language`
- `variable.other.class.js`
- `variable.other.class.ts`
- `variable.other.constant`
- `variable.parameter.function.language.special.self.python`

### `#e8c5d6` — Dusty Rose (61 scopes)

- `beginning.punctuation.definition.list.markdown`
- `constant.character.character-class.regexp.xi`
- `constant.character.entity`
- `constant.other.character-class.regexp`
- `entity.name.label.cs`
- `entity.name.section.markdown`
- `entity.name.tag`
- `entity.name.variable.local.cs`
- `keyword.other.unit`
- `markup.deleted.diff`
- `markup.heading`
- `markup.heading.setext.1.markdown`
- `markup.heading.setext.2.markdown`
- `meta.arguments.coffee`
- `meta.definition.variable.name.groovy`
- `meta.definition.variable.name.java`
- `meta.function.c`
- `meta.function.cpp`
- `meta.object-literal.key`
- `meta.property.object`
- `meta.scope.prerequisites.makefile`
- `meta.symbol.clojure`
- `punctuation.definition.ability.begin.unison`
- `punctuation.definition.ability.end.unison`
- `punctuation.definition.delayed.unison`
- `punctuation.definition.hash.unison`
- `punctuation.definition.heading.markdown`
- `punctuation.definition.list.begin.markdown`
- `punctuation.definition.list.begin.unison`
- `punctuation.definition.list.end.unison`
- `punctuation.definition.list.markdown`
- `punctuation.definition.metadata.markdown`
- `punctuation.definition.string.begin.markdown`
- `punctuation.definition.string.end.markdown`
- `punctuation.operator.assignment.as.unison`
- `punctuation.section.embedded` *(conflict — see below)*
- `punctuation.separator.delimiter.unison`
- `punctuation.separator.pipe.unison`
- `selector.sass`
- `source.java`
- `source.json meta.structure.dictionary.json > string.quoted.json`
- `source.json meta.structure.dictionary.json > string.quoted.json > punctuation.string`
- `support.type.object.console`
- `support.type.property-name.json`
- `support.type.property-name.json punctuation`
- `support.variable.dom`
- `support.variable.magic.python`
- `support.variable.object.node`
- `support.variable.object.process`
- `support.variable.property`
- `support.variable.property.dom`
- `text.bracketed`
- `text.variable`
- `variable`
- `variable.interpolation`
- `variable.language.rust`
- `variable.other.class.php`
- `variable.other.readwrite`
- `variable.parameter.function.coffee`
- `variable.parameter.function.js`

### `#e8dfe8` — Pale Grey (86 scopes, includes `editor.foreground` fallback)

- `block.scope.begin`
- `block.scope.end`
- `function.brace`
- `function.parameter`
- `function.parameter.cs`
- `function.parameter.ruby`
- `invalid.illegal.bad-ampersand.html`
- `invalid.xi`
- `keyword.operator`
- `keyword.operator.misc.rust`
- `markup.heading.setext`
- `meta.brace.square`
- `meta.method.body.java`
- `meta.method.identifier.java`
- `meta.method-call.java`
- `meta.tag`
- `meta.template.expression`
- `punctuation.bracket.angle.java`
- `punctuation.definition.annotation.java`
- `punctuation.definition.arguments.begin.bracket.round.php`
- `punctuation.definition.arguments.begin.python`
- `punctuation.definition.arguments.end.bracket.round.php`
- `punctuation.definition.arguments.end.python`
- `punctuation.definition.array.begin.bracket.round.php`
- `punctuation.definition.array.end.bracket.round.php`
- `punctuation.definition.begin.bracket.curly.php`
- `punctuation.definition.begin.bracket.round.php`
- `punctuation.definition.block.sequence.item.yaml`
- `punctuation.definition.end.bracket.curly.php`
- `punctuation.definition.end.bracket.round.php`
- `punctuation.definition.list.begin.python`
- `punctuation.definition.list.end.python`
- `punctuation.definition.method-parameters.begin.java`
- `punctuation.definition.method-parameters.end.java`
- `punctuation.definition.parameters.begin.bracket.round.php`
- `punctuation.definition.parameters.end.bracket.round.php`
- `punctuation.definition.section.switch-block.begin.bracket.curly.php`
- `punctuation.definition.section.switch-block.end.bracket.curly.php`
- `punctuation.definition.section.switch-block.start.bracket.curly.php`
- `punctuation.definition.storage-type.begin.bracket.round.php`
- `punctuation.definition.storage-type.end.bracket.round.php`
- `punctuation.parenthesis.begin.python`
- `punctuation.parenthesis.end.python`
- `punctuation.section.array.begin.php`
- `punctuation.section.array.end.php`
- `punctuation.section.block.begin.bracket.curly.c`
- `punctuation.section.block.begin.bracket.curly.cpp`
- `punctuation.section.block.begin.java`
- `punctuation.section.block.end.bracket.curly.c`
- `punctuation.section.block.end.bracket.curly.cpp`
- `punctuation.section.block.end.java`
- `punctuation.section.class.begin.bracket.curly.java`
- `punctuation.section.class.begin.java`
- `punctuation.section.class.end.bracket.curly.java`
- `punctuation.section.class.end.java`
- `punctuation.section.inner-class.begin.java`
- `punctuation.section.inner-class.end.java`
- `punctuation.section.method.begin.bracket.curly.java`
- `punctuation.section.method.begin.java`
- `punctuation.section.method.end.bracket.curly.java`
- `punctuation.section.method.end.java`
- `punctuation.section.parameters.begin.bracket.round.c`
- `punctuation.section.parameters.end.bracket.round.c`
- `punctuation.section.parens.begin.bracket.round.c`
- `punctuation.section.parens.end.bracket.round.c`
- `punctuation.section.scope.begin.php`
- `punctuation.section.scope.end.php`
- `punctuation.separator.arguments.python`
- `punctuation.separator.delimiter`
- `punctuation.separator.delimiter.php`
- `punctuation.separator.element.python`
- `punctuation.separator.key-value`
- `punctuation.separator.list.comma.css`
- `punctuation.separator.period.java`
- `punctuation.separator.period.python`
- `punctuation.terminator.expression.php`
- `punctuation.terminator.java`
- `punctuation.terminator.statement.c`
- `storage.modifier.lifetime.rust`
- `support.constant.property-value`
- `support.type.property-name`
- `token.package`
- `token.variable.parameter.java`
- `variable.c`
- `variable.parameter.function`

### `#ff6b9d` — Berry Pink (71 scopes)

- `constant.regexp.xi`
- `emphasis md`
- `keyword`
- `keyword.control`
- `keyword.operator.address.go`
- `keyword.operator.arithmetic.go`
- `keyword.operator.assignment.c`
- `keyword.operator.assignment.compound`
- `keyword.operator.assignment.cpp`
- `keyword.operator.bitwise.shift.c`
- `keyword.operator.bitwise.shift.cpp`
- `keyword.operator.c`
- `keyword.operator.comparison.c`
- `keyword.operator.comparison.cpp`
- `keyword.operator.cpp`
- `keyword.operator.decrement.c`
- `keyword.operator.decrement.cpp`
- `keyword.operator.delete`
- `keyword.operator.error-control.php`
- `keyword.operator.expression.delete`
- `keyword.operator.expression.in`
- `keyword.operator.expression.instanceof`
- `keyword.operator.expression.keyof`
- `keyword.operator.expression.of`
- `keyword.operator.expression.typeof`
- `keyword.operator.expression.void`
- `keyword.operator.heredoc.php`
- `keyword.operator.increment.c`
- `keyword.operator.increment.cpp`
- `keyword.operator.instanceof.java`
- `keyword.operator.logical.python`
- `keyword.operator.module`
- `keyword.operator.new`
- `keyword.operator.nowdoc.php`
- `keyword.operator.optional`
- `keyword.operator.regexp.php`
- `keyword.operator.sigil.rust`
- `keyword.operator.sizeof.c`
- `keyword.operator.sizeof.cpp`
- `keyword.operator.ternary`
- `keyword.operator.type.php`
- `markup.italic`
- `markup.underline.link.image.markdown`
- `markup.underline.link.markdown`
- `meta.selector`
- `punctuation.definition.italic`
- `punctuation.definition.template-expression.begin`
- `punctuation.definition.template-expression.end`
- `punctuation.quasi.element`
- `punctuation.section.embedded` *(conflict winner — last in JSON)*
- `punctuation.section.embedded.begin`
- `punctuation.section.embedded.end`
- `punctuation.separator.c`
- `punctuation.separator.cpp`
- `storage`
- `support.constant.edge`
- `support.type.fx.hlsl`
- `support.type.object.hlsl`
- `support.type.object.rw.hlsl`
- `support.type.sampler.hlsl`
- `support.type.texture.hlsl`
- `text.html.laravel-blade source.php.embedded.line.html entity.name.tag.laravel-blade`
- `text.html.laravel-blade source.php.embedded.line.html support.constant.laravel-blade`
- `todo.emphasis`
- `token.debug-token`
- `token.package.keyword`
- `token.storage`
- `variable.other.generic-type.haskell`

### `#ffa3c7` — Light Pink (31 scopes)

- `accent.xi`
- `constant.character.xi`
- `entity.name.function`
- `entity.name.goto-label.php`
- `entity.name.section`
- `entity.other.attribute-name.id` *(fontStyle: normal)*
- `keyword.operator.expression.import`
- `keyword.other.special-method`
- `markup.heading punctuation.definition.heading`
- `meta.diff.header.from-file`
- `meta.diff.header.to-file`
- `meta.function.decorator.python`
- `meta.function-call.generic.python`
- `meta.function-call.object.php`
- `meta.function-call.php`
- `meta.function-call.static.php`
- `meta.method.groovy`
- `meta.method.java`
- `meta.require`
- `punctuation.definition.from-file.diff`
- `punctuation.definition.to-file.diff`
- `string.other.link.description.markdown`
- `string.other.link.title.markdown`
- `support.function.any-method`
- `support.function.console`
- `support.function.std.rust`
- `support.other.php`
- `support.type.type.flowtype`
- `token.info-token`
- `variable.function`

### `#ffffff` — White (5 scopes, error states)

- `constant.other.color.rgb-value.xi`
- `invalid.broken`
- `invalid.deprecated`
- `invalid.illegal`
- `invalid.unimplemented`

### `#f44747` — Red (2 scopes, error states)

- `invalid.illegal.non-null-typehinted.php`
- `token.error-token`

## Semantic tokens

Semantic tokens are emitted by the language server, not by the TextMate
grammar. They override TextMate scopes when active.

| Semantic token | Hex | What triggers it |
|---|---|---|
| `enumMember` | `#9bd4b9` | TS enum member references — see `Status.Active` in `01-typescript.tsx` |
| `variable.constant` | `#b8a3e8` | Module-scope `const` names (e.g. `MAX_RETRIES`, `CACHE_DIR`) in TS / Python |
| `variable.defaultLibrary` | `#d6a3e8` | References to standard-library globals: `Math`, `console`, `Array`, `Promise`, `JSON`, `document`, `window` |

To confirm a color came from a semantic rule rather than a TextMate
scope, hover the token (VS Code shows "(default library) variable" or
similar) or temporarily set `"editor.semanticHighlighting.enabled":
false` in the Host's settings.

## Italic-without-color rules

These rules set `fontStyle: italic` but no `foreground`. The token's
color is inherited from a parent scope; only the italic styling is
added.

- `comment` *(also gets `#7a6580` from a colored entry — the italic
  here is redundant but explicit)*
- `comment.block.documentation`
- `comment.line.double-slash`
- `entity.other.attribute-name.js`
- `entity.other.attribute-name.jsx`
- `entity.other.attribute-name.ts`
- `entity.other.attribute-name.tsx`
- `keyword.control.flow.python`
- `keyword.control.import.python`
- `markup.italic.markdown`
- `variable.language.super`
- `variable.parameter`

If something looks italic in the editor and you can't find a colored
rule that explains the italic, it's almost certainly from this list.

## Notes on the parse

- `themes/pixel-berry-color-theme.json` contains ~170 `tokenColors`
  entries; many entries declare a composite `scope` string of
  comma-joined selectors (one entry can style 20+ selectors). The
  reverse lookup above breaks composites into individual selectors —
  the total count of distinct selectors is ~420.
- A handful of selectors appear under more than one hex bucket because
  the theme defines them twice. TextMate evaluation order is
  last-wins, so the winning color is the entry defined later in the
  JSON. Both bucket placements are kept in this README and flagged
  with *(conflict)*.
- This README was generated by parsing
  `pixel-berry-color-theme.json` programmatically. To regenerate it
  after a theme edit, re-run the same parse (PowerShell:
  `Get-Content … | ConvertFrom-Json`, iterate `tokenColors`, split
  composite scope strings on `,`, group by foreground hex).
