import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import connection from "../config/db.js";

export async function signUp(req, res) {
  const user = req.body;
  try {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(user.password, SALT);
    await connection.query(
      `
      INSERT INTO users
      (name,email,password,image)
      VALUES ($1,$2,$3,$4)    
    `,
      [user.name, user.email, passwordHash,user.image]
    );

    return res.sendStatus(201);
  } catch (error) {
    if (error.code === "23505") return res.status(409).send(error.detail);
    return res.status(500).send(error);
  }
}

export async function signIn(req, res) {
  try {
    const user = (
      await connection.query(
        `
        SELECT * FROM users
        WHERE email = $1
        `,
      [req.body.email]
      )
    ).rows[0];
    if (!user) return res.sendStatus(401);

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = uuid();
      await connection.query(
        `
        INSERT INTO sessions
        ("userId", token) VALUES ($1,$2)
        `,
      [user.id, token]
      );
        
      return res.status(200).send({token});
    }
    return res.sendStatus(401)
  } catch (error) {
    return res.sendStatus(500);
  }
}