create table user_list(
    id serial not null primary key,
	firstname text not null,
    lastname  text not null,
    email text not null,
    password text not null

);
create table favourite_movies (
	id serial not null primary key,
	user_list_id int,
    playlist text not null,
	foreign key (user_list_id) references favourite_movies(id)
);