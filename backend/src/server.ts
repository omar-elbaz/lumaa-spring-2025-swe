import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { Pool } from "pg";

dotenv.config();

const app = express();
const port = process.env.port || 5001;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// import authRoutes from "./routes/auth";
// import taskRoutes from "./routes/tasks";

// app.use("/auth", authRoutes);
// app.use("/tasks", taskRoutes);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Test Server
app.get("/", (req, res) => {
  res.send("The backend talking");
});
app.get("/auth", (req, res) => {
  res.send("sample route");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// // SampleQuery REMOVE LATER
// app.get("/users", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM users");
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// });
