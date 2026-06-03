// 02-javascript.js — plain JS scopes (no TS-only rules). Node + DOM + Math + JSON.
'use strict';

const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

const CACHE_DIR = path.join(process.cwd(), '.cache');
const MAX_SIZE = Math.pow(2, 20);

/*
 * Keys are restricted to lowercase slugs so they map cleanly onto cache
 * filenames. Enforced on every write in Store#set below.
 */
const KEY_RE = /^[a-z][a-z0-9_-]*$/;

class Store extends EventEmitter {
  #data = new Map();

  constructor(name) {
    super();
    this.name = name;
    this.createdAt = Date.now();
  }

  static from(obj) {
    const s = new Store(obj.name ?? 'anon');
    for (const [k, v] of Object.entries(obj.entries || {})) s.set(k, v);
    return s;
  }

  get size() { return this.#data.size; }

  set(key, value) {
    if (!KEY_RE.test(key)) throw new Error(`invalid key: ${key}`);
    if (this.#data.size >= MAX_SIZE) throw new Error('store full');
    this.#data.set(key, value);
    this.emit('change', { key, value });
    return this;
  }

  get(key) { return this.#data.get(key); }

  toJSON() {
    return { name: this.name, entries: Object.fromEntries(this.#data) };
  }
}

function loadStore(file) {
  try {
    const raw = fs.readFileSync(path.resolve(CACHE_DIR, file), 'utf8');
    const obj = JSON.parse(raw);
    return Store.from(obj);
  } catch (err) {
    if (err.code === 'ENOENT') return new Store(file);
    throw err;
  } finally {
    console.debug('loadStore done');
  }
}

const store = loadStore('users.json');
store.set('first', 'alice').set('second', 'bob');

console.log(`store has ${store.size} entries`, JSON.stringify(store, null, 2));
console.info('pid:', process.pid, 'platform:', process.platform);

if (typeof document !== 'undefined') {
  document.querySelector('#root')?.addEventListener('click', () => {
    window.location.reload();
  });
}

module.exports = { Store, loadStore };
