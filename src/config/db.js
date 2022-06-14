import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

// const db = {
//   	user: "postgres",
// 	password: process.env.PASSWORD,
// 	database: "linkr"
// }

const connection = new Pool({
  connectionString: process.env.DATABASE_URL
});

if (process.env.MODE === "PROD") {
  connection.ssl = {
    rejectUnauthorized: false,
  };
}

console.log("connected");
export default connection;
