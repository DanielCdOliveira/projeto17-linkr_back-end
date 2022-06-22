create table link(
    "id" serial primary key,
    "title" text not null,
    "description" text,
    "image" text ,
    "url" text not null unique
);

create table users(
    "id" serial primary key,
    "email" text not null unique,
    "name" text not null,
    "password" text not null,
    "image" text not null,
    "createdAt" date not null default now()
);

create table posts(
    "id" serial primary key,
    "userId" integer not null references "users"("id"),
    "message" text not null,
    "linkId" integer not null references "link"("id"),
    "createdAt" date not null default now()
);

create table likes(
    "id" serial primary key,
    "userId" integer not null references "users"("id"),
    "postId" integer not null references "posts"("id"),
    "likeTime" date not null default now()
);

create table shares(
    "id" serial primary key,
    "userId" integer not null references "users"("id"),
    "postId" integer not null references "posts"("id"),
    "shareTime" date not null default now()
);

create table hashtags(
    "id" serial primary key,
    "name" text not null,
    "ranking" integer not null default 1,
    "createdAt" date not null default now()
);

CREATE TABLE sessions(
	"id" serial PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES "users"("id"),
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);