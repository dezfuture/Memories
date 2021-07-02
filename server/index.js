import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// express middleware to connect and add a prefix 'posts' to the '/' route
app.use("/posts", postRoutes);

// The mongo atlas cluster db url
const CONNECTION_URL =
  "mongodb+srv://dez_future:DTedLzxgQrJwjxf3@cluster0.m8xrm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

// Connecting our mongoose database
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);