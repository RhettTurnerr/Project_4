# Name: Rhett Turner

## Description:
This website has register and loging features that get data from a database in order to confirm those credentials. After logging in the user can then select things from various categories to see frequently asked questions and answers. The website pulls data from a database for this as well.

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

create database webapp;

use webapp;

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

## Database Test Data

insert into categories (name, description)
values
('Drums', 'common questions about drums'),
('Guitar', 'common questions about guitars'),
('Bass', 'common questions about bass');

insert into questions (category_id, question_text, answer_text)
values
(1, 'What drum set is recommended for beginners?', 'drum set 1'),
(2, 'Are acoustic or electric guitars recommended for beginners?', 'depend on preference'),
(3, 'What are some good pedals to use with an electric base', 'bass pedal 1');