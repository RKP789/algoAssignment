import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/connectDb.js";
import router from "./routes/userRoutes.js";
import cors from "cors";


const app = express();

dotenv.config();

connectDb();

// Middleware to parse JSON
app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// app.use(cors({ origin: true, credentials: true }));

// Auth routes
app.use("/auth", router);

// CRUD user routes (protected by JWT)
app.use("/user", router);

// server is listning
app.listen(process.env.PORT, () => {
    console.log("server is running on some ...");
})

