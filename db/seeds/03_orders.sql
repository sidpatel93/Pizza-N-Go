INSERT INTO orders (user_id,order_time,status,isComplete)
VALUES (2,NOW()::TIMESTAMP,'In Progress',false);

INSERT INTO orders (user_id,order_time,status,isComplete)
VALUES (3,NOW()::TIMESTAMP,'In Progress',false);

INSERT INTO orders (user_id,order_time,status,isComplete)
VALUES (4,NOW()::TIMESTAMP,'New',false);

INSERT INTO orders (user_id,order_time,status,isComplete)
VALUES (5,NOW()::TIMESTAMP,'New',false);

INSERT INTO orders (user_id,order_time,status,isComplete)
VALUES (2,NOW()::TIMESTAMP,'Complete',true);

INSERT INTO orders (user_id,order_time,status,isComplete)
VALUES (2,NOW()::TIMESTAMP,'Complete',true);
