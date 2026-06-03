<?php
// 13-php.php — namespaces, types, function calls, heredoc/nowdoc.
declare(strict_types=1);

namespace App\Repositories;

use App\Models\User;
use App\Contracts\Repository as RepositoryContract;
use RuntimeException;

const MAX_RETRIES = 3;

interface Identifiable
{
    public function getId(): int;
}

abstract class BaseRepository implements RepositoryContract
{
    protected array $cache = [];

    public function __construct(protected string $name)
    {
    }

    abstract public function load(int $id): ?Identifiable;

    public function getName(): string
    {
        return $this->name;
    }
}

final class UserRepository extends BaseRepository
{
    /**
     * Load a user by id, reading through to the JSON cache on a miss.
     *
     * @param  int $id  Positive identifier.
     * @return ?User    Null when the backing file is absent.
     * @throws RuntimeException When $id is negative.
     */
    public function load(int $id): ?User
    {
        if ($id < 0) {
            throw new RuntimeException("invalid id: {$id}");
        }

        if (isset($this->cache[$id])) {
            return $this->cache[$id];
        }

        $raw = @file_get_contents(__DIR__ . "/users/{$id}.json");
        if ($raw === false) {
            return null;
        }

        $decoded = json_decode($raw, true, flags: JSON_THROW_ON_ERROR);
        $user = new User($decoded['id'], $decoded['name']);
        $this->cache[$id] = $user;

        return $user;
    }

    public function describe(): string
    {
        $count = count($this->cache);
        return <<<EOT
Repository: {$this->name}
Cached entries: {$count}
File: {__FILE__}
EOT;
    }

    public function template(): string
    {
        return <<<'NOWDOC'
no interpolation: $this->name stays literal
NOWDOC;
    }
}

$repo = new UserRepository('users');
$user = $repo->load(1);

if ($user instanceof User) {
    echo $user->getId() . PHP_EOL;
}

echo $repo->describe();
