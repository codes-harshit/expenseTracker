import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`The server is running on the: ${port}`);
});
