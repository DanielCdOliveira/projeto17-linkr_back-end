import jwt from "jsonwebtoken";
import connection from "../config/db.js";
export default async function tokenValidator(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) return res.sendStatus(401);
  const key = process.env.JWT_SECRET;
  try {
    const data = jwt.verify(token, key);
    console.log(data.sessionId);
    const {userId} = ( await connection.query(`
    SELECT "userId" 
    FROM sessions
    WHERE id=$1   
    `,[data.sessionId])).rows[0]
    res.locals.userId = userId
    next()
  } catch (error) {
    if (error.message === "invalid token") {
      return res.status(401).send(error);
    }
    res.sendStatus(500)
  }
}
