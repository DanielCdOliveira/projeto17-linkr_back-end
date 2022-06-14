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
    "link" text not null,
    "createdAt" date not null default now()
);

create table likes(
    "id" serial primary key,
    "userId" integer not null references "users"("id"),
    "postId" integer not null references "posts"("id"),
    "likeTime" date not null default now()
);

create table hashtags(
    "id" serial primary key,
    "name" text not null,
    "ranking" INTEGER NOT NULL DEFAULT 1
);
