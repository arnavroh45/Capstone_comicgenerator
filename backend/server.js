const express = require("express");
const bodyParser = require("body-parser");
const { connectToDb, getDb } = require("./db");

const app = express();
const cors = require('cors');

app.use(cors());

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // If you need to handle JSON data

let db;

// Connect to the database
connectToDb((err) => {
  if (!err) {
    db = getDb();
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } else {
    console.error("Database connection failed:", err);
  }
});

// Sign-up route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await db.collection("Registration").findOne({ email });

    if (existingUser) {
      return res.status(400).send("User already exists. Please, login");
    }

    // Insert new user
    await db.collection("Registration").insertOne({
      user_name: name,
      email: email,
      password: password
    });
    console.log("Success");

    res.status(200).send("Sign-up successful");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Error during signup. Please try again.");
  }
});


app.listen(3001, () => {
  console.log("Server started");
});