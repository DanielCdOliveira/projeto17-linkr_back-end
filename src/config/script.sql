create table users(
    "id" serial primary key,
    "email" text not null unique,
    "name" text not null,
    "password" text not null,
    "image" text not null,
    "createdAt" date not null default now()
)

create table posts(
    "id" serial primary key,
    "userId" integer not null references "user"("id"),
    "message" text not null,
    "link" text not null,
    "createdAt" date not null default now()
)

create table likes(
    "id" serial primary key,
    "userId" integer not null references "user"("id"),
    "postId" integer not null references "posts"("id"),
    "likeTime" date not null default now()
)