require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const { connectToDb, getDb } = require("./db");
const nodemailer = require('nodemailer');
const app = express();
app.set('view engine', 'ejs');
const cors = require('cors');
const jwt=require('jsonwebtoken');
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials:true}));
let db;
let uname;
let eid;
const cookieParser = require('cookie-parser');
app.use(cookieParser());
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
let otpData = {}; 
const key="Capstone@16";
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD, 
  },
  
});



app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  uname=name;
  eid=email;
  try {
    // Check if the user exists in the database by email and username
    const existingUser = await db.collection("Registration").findOne({ email: email, user_name: name });

    if (!existingUser) {
      // If the user does not exist, send an error
      return res.status(404).send("User does not exist.");
    }

    // Check if the provided password matches the stored password
    if (existingUser.password !== password) {
      // If passwords do not match, send an error
      return res.status(401).send("Invalid password.");
    }

    // Generate the JWT token after successful verification of user credentials
    function generateJwt(user_email, user_name, expiresDelta = 7) {
      const payload = {
        email: user_email,
        name: user_name,
        exp: Math.floor(Date.now() / 1000) + expiresDelta * 24 * 60 * 60,
        iat: Math.floor(Date.now() / 1000),
      };

      return jwt.sign(payload, key, { algorithm: 'HS256' });
    }

    const token = generateJwt(existingUser.email, existingUser.user_name);
    return res.status(200).json({
      message: "Login successful",
      token,
    });
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
  const existingUser = await db.collection("Registration").findOne({ email });
  if (existingUser) {
      console.log("already exits");
      return res.status(400).send("User already exists, please signup");
  }else
  {
    const otp = Math.floor(100000 + Math.random() * 900000); 
    otpData[email] = otp; 

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your Comic Gen OTP',
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send({ message: 'OTP sent successfully!' });
      setTimeout(() => {
        delete otpData[email];
      }, 5 * 60 * 1000);
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send({ message: 'Failed to send OTP', error });
    }
  }
});
app.post('/verify-email-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpData[email] && otpData[email] === parseInt(otp, 10)) {
    delete otpData[email]; 
    return res.status(200).send({ message: 'OTP verified successfully!' });
  }
  res.status(400).send({ message: 'Invalid OTP' });
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Generate a unique identifier
  const uid = name + email;

  try {
    // Check if the user already exists
    const existingUser = await db.collection("Registration").findOne({ email: email, user_name: name });
    if (existingUser) {
      return res.status(409).send("User already exists.");
    }

    // Insert the new user into the database
    await db.collection("Registration").insertOne({
      user_name: name,
      email: email,
      password: password, 
      uid: uid,
    });

    console.log("User registered successfully.");
    return res.status(201).json({ message: "Sign-up successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).send("Internal server error during registration.");
  }
});

app.post("/reset-send",async (req,res)=>{
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  }
  const existingUser = await db.collection("Registration").findOne({ email });
  if (existingUser) {
    const otp = Math.floor(100000 + Math.random() * 900000); 
    otpData[email] = otp; 

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your Comic Gen OTP',
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send({ message: 'OTP sent successfully!' });
      setTimeout(() => {
        delete otpData[email];
      }, 5 * 60 * 1000);
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send({ message: 'Failed to send OTP', error });
    }
  }
});
app.post('/reset-verify', (req, res) => {
  const { email, otp } = req.body;
  if (otpData[email] && otpData[email] === parseInt(otp, 10)) {
    delete otpData[email]; 
    return res.status(200).send({ message: 'OTP verified successfully!' });
  }
  res.status(400).send({ message: 'Invalid OTP' });
});

app.post('/reset', async (req, res) => {
  const { email, password, repassword } = req.body;
  console.log(email);
  console.log(password);
  console.log(repassword);  
  if (!email || !password || !repassword) {
    return res.status(400).send({ message: 'All fields are required!' });
  }

  if (password !== repassword) {
    return res.status(400).send({ message: 'Passwords do not match!' });
  }

  try {
    const result = await db.collection("Registration").updateOne(
      { email: email },
      { $set: { password: password } }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).send({ message: 'Password reset successfully!' });
    } else {
      return res.status(404).send({ message: 'Email not found!' });
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

app.post("/publish",async (req,res)=>{
    const {title,description}=req.body;
    console.log(title);
    console.log(description);
});
app.get('/comics', async (req, res) => {
  try {
      const comicsData = await db.collection('Comics').find({}).toArray();
      return res.status(200).send({ message: 'Success', comics: comicsData });
  } catch (error) {
      console.error('Error fetching comics:', error);
      return res.status(500).send({ message: 'Failed to fetch comics', error: error.message });
  }
});

app.get('/user_comics1',async(req,res)=>{
  const uid=uname+eid;
  try {
    const comicsData = await db.collection('Comics').find({user_id:uid}).toArray();
    return res.status(200).send({ message: 'Success', comics: comicsData });
} catch (error) {
    console.error('Error fetching comics:', error);
    return res.status(500).send({ message: 'Failed to fetch comics', error: error.message });
}
});
app.post('/vote', async (req, res) => {
  console.log("Voting starts here");

  try {
      const { title, comicId, type } = req.body;
      console.log(comicId);

      const incrementValue = type === "Upvote" ? 1 : -1;

      // Step 1: Initialize vote if it doesn't exist
      await db.collection('Comics').updateOne(
          { title: title, user_id: comicId, vote: { $exists: false } },
          { $set: { vote: 0 } }
      );

      // Step 2: Increment or decrement the vote
      const result = await db.collection('Comics').updateOne(
          { title: title, user_id: comicId },
          { $inc: { vote: incrementValue } }
      );

      // Step 3: Ensure vote is at least 0
      if (result.modifiedCount > 0) {
          await db.collection('Comics').updateOne(
              { title: title, user_id: comicId, vote: { $lt: 0 } },
              { $set: { vote: 0 } }
          );
          return res.status(200).send({ message: 'Vote updated successfully' });
      } else {
          return res.status(404).send({ message: 'Comic not found or no changes made' });
      }
  } catch (error) {
      console.error('Error updating vote:', error);
      return res.status(500).send({ message: 'Failed to update vote', error: error.message });
  }
});
app.get('/popular', async (req, res) => {
  try {
      const popularComics = await db.collection('Comics').aggregate([
          { $sort: { vote: -1 } },
          { $limit: 5 }
      ]).toArray();

      return res.status(200).send({ message: 'Top 5 Popular Comics', comics: popularComics });
  } catch (error) {
      console.error('Error fetching popular comics:', error);
      return res.status(500).send({ message: 'Failed to fetch popular comics', error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server started");
});