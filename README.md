# Name: Rhett Turner

## Description:


## Technologies:
* HTML
* CSS
* JS
* React
* Node.js
* Express.js
* CORS
* dotenv
* MySQL2
* bcrypt
* jsonwebtoken
* Render 
* MySQL Workbench
* Railway
* Axios
* Vercel

## Database Creation Script
create table users(
	id int auto_increment primary key,
    email varchar(100) not null unique,
    password_hash varchar(255) not null,
    created_at timestamp default current_timestamp
);

create table categories(
	id int auto_increment primary key,
    name varchar(100) not null,
    description text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table questions(
	id int auto_increment primary key,
    category_id int not null,
    question_text text not null,
    answer_text text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    foreign key (category_id) references categories(id)
		on delete cascade
);