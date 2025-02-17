import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

dotenv.config();

const router = express.Router();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);
    res.status(201).send({ message: "User registered" });
  } catch (error) {
    res.status(500).send({ error: "User already exists" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  if (user.rows.length === 0)
    return res.status(400).send({ error: "Invalid credentials" });

  const isValid = await bcrypt.compare(password, user.rows[0].password);
  if (!isValid) return res.status(400).send({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.rows[0].id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  res.send({ token });
});

export default router;
