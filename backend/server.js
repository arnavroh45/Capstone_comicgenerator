require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const { connectToDb, getDb } = require("./db");
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');

app.use(cors());
let db;

// Connect to the database
connectToDb((err) => {
  if (!err) {
    db = getDb();
    app.listen(3000, () => {
      console.log("Server is running on port 3001");
    });
  } else {
    console.error("Database connection failed:", err);
  }
});
// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // If you need to handle JSON data
let otpData = {}; // Temporary in-memory storage for OTPs

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
  
});


// Sign-up route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await db.collection("Registration").findOne({ email });

    if (existingUser) {
      // If user exists, check if the password is correct
      if (existingUser.password === password) {
        return res.status(200).send("Sign-up successful");
      } else {
        return res.status(401).send("User exists but the password is incorrect.");
      }
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Error during signup. Please try again.");
  }
});

app.post('/send-email-otp', async (req, res) => {
  const { email } = req.body;
  
  
  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  otpData[email] = otp; // Store OTP temporarily

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your Comic Gen OTP',
    text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'OTP sent successfully!' });

    // Set OTP expiry (optional)
    setTimeout(() => {
      delete otpData[email];
    }, 5 * 60 * 1000); // OTP valid for 5 minutes
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Failed to send OTP', error });
  }
});

// Verify OTP
app.post('/verify-email-otp', (req, res) => {
  const { email, otp } = req.body;

  if (otpData[email] && otpData[email] === parseInt(otp, 10)) {
    delete otpData[email]; // Remove OTP after successful verification
    return res.status(200).send({ message: 'OTP verified successfully!' });
  }

  res.status(400).send({ message: 'Invalid OTP' });
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await db.collection("Registration").findOne({ email });

    if (existingUser) {
      // If user exists, check if the password is correct
      if (existingUser.password === password) {
        return res.status(200).send("Sign-up successful");
      } else {
        return res.status(401).send("User exists but the password is incorrect.");
      }
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