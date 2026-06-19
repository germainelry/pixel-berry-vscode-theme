"""03-python.py — decorators, dataclasses, type hints, f-strings, magic vars."""

from __future__ import annotations

import json
import os
from dataclasses import dataclass, field
from enum import Enum
from typing import Iterable, Optional

CACHE_DIR: str = os.path.join(os.getcwd(), ".cache")
MAX_RETRIES = 3


class Status(Enum):
    ACTIVE = "active"
    IDLE = "idle"
    DONE = "done"


@dataclass(frozen=True)
class User:
    id: int
    name: str
    status: Status = Status.ACTIVE  # member ref → semantic enumMember (#8fb0f2)
    tags: list[str] = field(default_factory=list)

    def __post_init__(self) -> None:
        if self.id < 0:
            raise ValueError(f"bad id: {self.id!r}")

    def render(self) -> str:
        return f"<User id={self.id} name={self.name!s} status={self.status.value} tags={len(self.tags):d}>"


class Repo:
    def __init__(self, path: str, *, lazy: bool = True) -> None:
        self._path = path
        self._cache: dict[int, User] = {}
        self.lazy = lazy

    @property
    def size(self) -> int:
        return len(self._cache)

    @staticmethod
    def from_file(path: str) -> "Repo":
        repo = Repo(path)
        with open(path, encoding="utf-8") as fh:
            for line in fh:
                data = json.loads(line)
                repo._cache[data["id"]] = User(**data)
        return repo

    def find(self, *ids: int, **filters: str) -> Iterable[User]:
        for uid in ids:
            user = self._cache.get(uid)
            if user is not None and all(getattr(user, k, None) == v for k, v in filters.items()):
                yield user


def main() -> None:
    raw = r"C:\Users\name\file.txt"
    blob = b"\x00\x01\xff"
    pi = 3.14159
    items = [1, 2, 3, 4, 5]
    # double the even numbers, drop the rest
    total = sum(x * 2 for x in items if x % 2 == 0)
    print(f"raw={raw!r} blob_len={len(blob)} pi={pi:.2f} total={total}")
    repo = Repo.from_file("users.jsonl")
    for u in repo.find(1, 2, 3, name="alice"):
        print(u.render())


if __name__ == "__main__":
    main()


# arithmetic + comparison + boolean chaining
a, b, c = 7, 3, 10
result = (a + b * 2 - c // 3) >= 5 and (a != b) or (c % 2 == 0)
print(result)

# assignment operators (augmented + walrus)
count = 1
count += 4
count *= 2
if (n := count - 3) > 0:
    print(n)