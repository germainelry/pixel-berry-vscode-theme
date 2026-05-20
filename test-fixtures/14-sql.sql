-- 14-sql.sql — DDL, DML, joins, aggregates, CTEs, window functions.

/* Schema setup */
CREATE TABLE users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) UNIQUE NOT NULL,
    status     VARCHAR(32)  NOT NULL DEFAULT 'active',
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id         INTEGER PRIMARY KEY,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount     DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    placed_at  TIMESTAMP NOT NULL
);

CREATE INDEX idx_orders_user_id ON orders (user_id);

-- Seed data
INSERT INTO users (name, email, status) VALUES
    ('Alice', 'alice@example.com', 'active'),
    ('Bob',   'bob@example.com',   'idle'),
    ('Carol', 'carol@example.com', 'active');

INSERT INTO orders (id, user_id, amount, placed_at)
SELECT 1, id, 49.99, CURRENT_TIMESTAMP FROM users WHERE name = 'Alice';

-- Read query: top customers with window function
WITH customer_totals AS (
    SELECT
        u.id,
        u.name,
        COUNT(o.id) AS order_count,
        COALESCE(SUM(o.amount), 0) AS total_spent
    FROM users u
    LEFT JOIN orders o ON o.user_id = u.id
    WHERE u.status = 'active'
    GROUP BY u.id, u.name
    HAVING COUNT(o.id) > 0
)
SELECT
    name,
    order_count,
    total_spent,
    RANK() OVER (ORDER BY total_spent DESC) AS rank,
    AVG(total_spent) OVER ()                AS avg_spent
FROM customer_totals
ORDER BY rank ASC
LIMIT 10;

-- Update / delete
UPDATE users SET status = 'idle' WHERE created_at < NOW() - INTERVAL '90 days';
DELETE FROM orders WHERE amount = 0;
