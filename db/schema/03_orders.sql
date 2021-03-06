DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP(2),
  items jsonb not null,
  order_status VARCHAR(255) DEFAULT 'new'
);
