// 15-regex.js — regex showcase. Every literal exercises string.regexp scopes.
'use strict';

// Anchors, char classes, quantifiers
const SLUG       = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;
const HEX_COLOR  = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/;
const ISO_DATE   = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const ZIP_US     = /^\d{5}(?:-\d{4})?$/;

// Named capture groups, alternation
const URL_RE = /^(?<scheme>https?):\/\/(?<host>[\w.-]+)(?::(?<port>\d{1,5}))?(?<path>\/[^\s?#]*)?(?:\?(?<query>[^\s#]*))?(?:#(?<frag>\S*))?$/i;

// Lookahead / lookbehind
const PASSWORD_OK = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
const PRICE      = /(?<=\$)\d+(?:\.\d{2})?/g;
const NOT_FOLLOWED_BY_PX = /\d+(?!px)/g;
const NOT_PRECEDED_BY_AT = /(?<!@)\w+/g;

// Escape sequences (hit constant.character.escape)
const ESCAPES = /\\[ntr0fbv]|\\u[0-9a-fA-F]{4}|\\x[0-9a-fA-F]{2}|\\\\/;
const WHITESPACE = /[\t\r\n\f\v ]+/g;
const META_CHARS = /[\.\^\$\*\+\?\(\)\[\]\{\}\|\\\/]/g;

// Backreferences
const DOUBLED_WORD = /\b(\w+)\s+\1\b/i;
const SINGLE_QUOTED = /(['"])(?:\\.|(?!\1).)*\1/g;

// Unicode property escapes (ES2018+)
const EMOJI       = /\p{Emoji_Presentation}/u;
const LETTERS_ANY = /\p{L}+/gu;
const DIGITS_ANY  = /\P{N}/gu;

// Common patterns
const EMAIL = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,24}$/i;
const IPV4  = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
const SEMVER = /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?:-(?<pre>[\w.-]+))?(?:\+(?<build>[\w.-]+))?$/;

function highlight(text) {
  return text
    .replace(WHITESPACE, ' ')
    .replace(/(?<=^|\s)(TODO|FIXME|XXX)(?=\s|:|$)/g, '«$1»')
    .replace(SINGLE_QUOTED, (m) => `‘${m.slice(1, -1)}’`);
}

const inputs = [
  'pixel-berry-theme',
  '#ff6b9d',
  '2026-05-20',
  'https://example.com:8080/path?q=1#top',
  'StrongP@ss1',
  'alice@example.com',
];

for (const x of inputs) {
  console.log(x, SLUG.test(x), HEX_COLOR.test(x), ISO_DATE.test(x));
}
