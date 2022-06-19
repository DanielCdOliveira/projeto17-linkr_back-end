import bcrypt from "bcrypt";
import connection from "../config/db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

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
      [user.name, user.email, passwordHash, user.image]
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
      const key = process.env.JWT_SECRET;
      const expiresAt = { expiresIn: 60 * 60 * 24 };

      const sessionId = (
        await connection.query(
          `
      INSERT INTO sessions
      ("userId") 
      VALUES ($1)
      RETURNING id
      `,
          [user.id]
        )
      ).rows[0].id;
      const token = jwt.sign({ sessionId, userId:user.id }, key, expiresAt);
      return res.status(200).send({ token, userId:user.id, image: user.image, name:user.name });
    }
    return res.sendStatus(401);
  } catch (error) {
    return res.sendStatus(500);
  }
}
