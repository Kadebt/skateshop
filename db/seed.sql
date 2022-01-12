create table useres (
    id serial primary key,
    email varchar(100),
    hash text
);

create table user_info(
    id serial primary key,
    username VARCHAR(20),
    user_id int unique references users(id)
);

create table if not exists products(
    id serial primary key,
    name varchar(20),
    price int,
    content varchar(250)
);

create table cart (
    id serial primary key,
    user_id in references users(id)
);

create table cart_products(
    cart_id int references cart(id),
    products_id int references products(id)
);

CREATE TABLE reviews(
    id serial primary key,
    user_id INT references users(id),
    product_id int references products(id)
)