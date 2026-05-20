# Pixel Berry — Markdown showcase

The motivating fixture: the file that started this whole investigation.

## H2 atx heading

### H3 atx heading

#### H4

##### H5

###### H6

Setext heading 1
================

Setext heading 2
----------------

Plain paragraph text — should render as `editor.foreground`. Within prose
you can use **bold (markup.bold)**, *italic with asterisks*, _italic with
underscores_, ***bold italic***, ~~strikethrough~~, and `inline code`.

> Blockquote — `markup.quote.markdown`, dimmed mauve.
> Second line still inside the quote.
>
> > Nested blockquote.

### Lists

Unordered:

- first item
- second item with **bold** inside
  - nested with `code`
  - another nested line
* alternate marker style
+ another alternate

Ordered:

1. step one
2. step two
   1. nested ordered
   2. nested second
3. step three

### Links and images

A [link with title](https://example.com "Example title") inline, and a
bare URL <https://example.com>. Reference-style: [click here][ref-1].

![alt text for image](./screenshot.png "Image title")

[ref-1]: https://example.com "Referenced"

### Inline HTML and entities

The ampersand `&amp;`, the copyright `&copy;`, and a literal <kbd>Ctrl</kbd>
tag mid-sentence.

### Fenced code blocks

```ts
const greeting: string = `hello, ${name}`;
function add(a: number, b: number): number { return a + b; }
```

```python
def greet(name: str) -> str:
    return f"hello, {name}"
```

```sh
#!/usr/bin/env bash
echo "running" && ls -la
```

### Horizontal rule

---

### Tables (GFM)

| Column A | Column B |
|----------|----------|
| cell 1   | cell 2   |
| cell 3   | cell 4   |
