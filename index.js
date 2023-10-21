const express = require("express");
const app = express();
const port = 5001;

const mongoose = require("mongoose");
require('dotenv').config();
// Middleware to parse JSON bodies
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://Ayush:${process.env.PASS}@cluster0.fohsg.mongodb.net/testnet`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("DB connected");

    // Define a schema
    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      favorites: [{ title: String, author: String }]
    });

    // Define a model based on the schema
    const User = mongoose.model("User", userSchema);

    // Example: Creating a new user
    app.post("/users", (req, res) => {
      const { name, email, favorites } = req.body;
      const user = new User({ name, email, favorites });

      user.save()
        .then(() => res.status(201).json({ message: "User created successfully" }))
        .catch((err) => res.status(500).json({ error: err.message }));
    });

    // Example: Getting all users
    app.get("/users", (req, res) => {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json({ error: err.message }));
    });

    app.get("/", (req, res) => {
      res.send({ message: "This server is up with grace of krishna" });
    });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
