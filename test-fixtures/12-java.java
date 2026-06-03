// 12-java.java — package, imports, annotations, generics, inner class.
package com.example.pixelberry;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

/**
 * User repository with in-memory cache.
 */
public final class UserRepository<T extends UserRepository.Entity> {

    public static final int MAX_RETRIES = 3;
    private static final String DEFAULT_NAME = "anonymous";

    private final String name;
    private final Map<Integer, T> cache = new HashMap<>();

    public UserRepository(String name) {
        this.name = Objects.requireNonNullElse(name, DEFAULT_NAME);
    }

    public interface Entity {
        int getId();
        String getName();
    }

    public enum Status { ACTIVE, IDLE, DONE }

    public static class User implements Entity {
        private final int id;
        private final String name;
        private final Status status;
        private final List<String> tags;

        public User(int id, String name, List<String> tags) {
            this.id = id;
            this.name = name;
            this.status = Status.ACTIVE;
            this.tags = tags != null ? tags : new ArrayList<>();
        }

        @Override public int getId()       { return id; }
        @Override public String getName()  { return name; }

        @Override
        public String toString() {
            return String.format("User{id=%d, name=%s, status=%s, tags=%s}", id, name, status, tags);
        }
    }

    public Optional<T> findById(int id) {
        T value = cache.get(id);
        return Optional.ofNullable(value);
    }

    @SuppressWarnings("unchecked")
    public <U extends Entity> U insert(U entity) {
        if (entity instanceof User u) {
            cache.put(entity.getId(), (T) u);
        }
        return entity;
    }

    public int[] collectIds() {
        int[] ids = new int[cache.size()];
        int i = 0;
        for (Integer key : cache.keySet()) {
            ids[i++] = key;
        }
        return ids;
    }

    public static void main(String[] args) {
        var repo = new UserRepository<User>("default");
        repo.insert(new User(1, "alice", List.of("admin", "owner")));
        repo.insert(new User(2, "bob",   List.of("viewer")));

        for (int id : repo.collectIds()) {
            repo.findById(id).ifPresent(System.out::println);
        }
    }
}
