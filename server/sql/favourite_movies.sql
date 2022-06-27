create table users(
    id serial not null primary key,
	firstname text not null,
    lastname  text not null,
    username text not null,
    password text not null

);
create table favourite_movies (
	id serial not null primary key,
	users_id int,
    playlist text not null,
	foreign key (users_id) references favourite_movies(id)
);