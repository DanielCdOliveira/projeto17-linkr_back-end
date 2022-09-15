<div align="center"><img style = "width:100%;"src="https://i.imgur.com/nw7WZJA.png"></img></div>
<hr>
<h2 align=center>Linkr (Back-End)</h2>
<h3 align=center>Web development Project</h3>
<hr>
<h4 align=center>A link-sharing social network</h4>
<h4 align=center>First project applying agile project management with Scrum</h4>
<h4 align=center>Check the <a href="https://github.com/DanielCdOliveira/projeto17-linkr_front-end">Front-end</a></h4>

<br>
<div align=center style="display:flex; justify-content: center; gap:5%">
    <img style = "height:250px;"src="https://i.imgur.com/xqaart2.png">
    <img style = "height:250px;"src="https://i.imgur.com/6pn0CHO.png">
    <img style = "height:250px;"src="https://i.imgur.com/M1NpnhK.png">
</div>
<br><hr>

## Features

- User can:
  - Register and login
  - Create posts
  - Like, share and comment posts
  - Use the hashtags to see similar posts
  - Search users by the name
  - Follow users

# API Reference 

#### SIGN-UP

```http
POST /sign-up
```

#### Request:

| Body       | Type     | Description               |
| :--------- | :------- | :------------------------ |
| `name`     | `string` | **Required**. name        |
| `email`    | `string` | **Required**. valid email |
| `password` | `string` | **Required**. password    |
| `imageUrl` | `string` | **Required**. image url    |

#

#### SIGN-IN

```http
POST /sign-in
```

#### Request:

| Body       | Type     | Description               |
| :--------- | :------- | :------------------------ |
| `email`    | `string` | **Required**. valid email |
| `password` | `string` | **Required**. password    |

</br>

#### Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbC26IkZhYnJjaW8yOUB5YWhvby5jb20iLCJpYXQiOjE2NTgxNzQwNTh9.dQ0JA1VMM7rAyFwaC-_AG9gDyrTDhOv1eoW1DNVpqOs"
}
```

<br/>

### Authorization

| Headers         | Type     | Description               |
| :-------------- | :------- | :------------------------ |
| `Authorization` | `string` | **Required**. valid token |

`Authorization format: Bearer jsonwebtoken`

<br/>

## Usage

Install my project with npm

> Clone the repository:

```bash
  git clone git@github.com:DanielCdOliveira/projeto17-linkr_back-end.git
```
>Install dependences:

```bash
  npm install
```
> Create a .env file like the .env.example file

> Run aplication:

```bash
  npm run dev
```

## Deploy

- Deploy using [Vercel](https://projeto17-linkr-front-end-inky.vercel.app/)

### Built with

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

### Contact

[![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/danielcdoliveira/
