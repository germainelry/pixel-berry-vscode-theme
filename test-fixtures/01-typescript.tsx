// 01-typescript.tsx — densest fixture. JSX, generics, decorators, enums, semantic tokens.
import React, { useState, useEffect, type FC } from 'react';
import * as fs from 'node:fs/promises';

/** Module-scope const → semantic `variable.constant` (periwinkle #b0a8ee). */
const MAX_RETRIES = 3;
const PI_APPROX = Math.PI;
const HEX_MASK = 0xff_ff_ff;
const BIG = 9_007_199_254_740_993n;
const RATE = 1.5e-3;

export enum Status { Active = 'active', Idle = 'idle', Done = 'done' }
//                   ^^^^^^   semantic `enumMember` → periwinkle #b0a8ee

export type ID = string | number;
export interface User<T = unknown> { id: ID; name: string; payload?: T; }

const log = (msg: string): void => console.log(`[${new Date().toISOString()}] ${msg}`);

function deprecated<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  ctx: ClassMethodDecoratorContext,
) {
  return function (this: This, ...args: Args): Return {
    console.warn(`${String(ctx.name)} is deprecated`);
    return target.call(this, ...args);
  };
}

abstract class Repository<T extends { id: ID }> {
  protected readonly cache = new Map<ID, T>();
  static #instances = 0;

  constructor(public readonly name: string) { Repository.#instances++; }

  abstract fetch(id: ID): Promise<T | null>;

  async getOrLoad(id: ID): Promise<T | null> {
    return this.cache.get(id) ?? (await this.fetch(id));
  }
}

class UserRepo extends Repository<User> implements AsyncIterable<User> {
  @deprecated
  async fetch(id: ID): Promise<User | null> {
    const raw = await fs.readFile(`./users/${id}.json`, 'utf8');
    const parsed = JSON.parse(raw) as User;
    return parsed?.id ? parsed : null;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<User> {
    for (const id of Array.from({ length: MAX_RETRIES }, (_, i) => i)) {
      const u = await this.getOrLoad(id);
      if (u) yield u;
    }
  }
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;
const escaped = "tab:\t newline:\n backslash:\\ unicode:ÿ";

interface ButtonProps { label: string; onClick?: () => void; variant?: 'primary' | 'ghost'; }

export const Button: FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  const [count, setCount] = useState<number>(0);
  useEffect(() => { document.title = `clicks: ${count}`; }, [count]);
  return (
    <button
      type="button"
      className={`btn btn--${variant}`}
      data-count={count}
      onClick={(e) => { setCount((c) => c + 1); onClick?.(); }}
    >
      <span>{label}</span>
      {count > 0 && <em>×{count}</em>}
    </button>
  );
};

const config = { "kebab-key": 1, nested: { keepAlive: true }, list: [1, 2, 3] as const };
const seen: ReadonlySet<keyof typeof config> = new Set(Object.keys(config) as Array<keyof typeof config>);
log(typeof window === 'undefined' ? 'server' : 'browser');
