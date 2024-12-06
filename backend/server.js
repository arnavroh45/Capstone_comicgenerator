require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const { connectToDb, getDb } = require("./db");
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');

app.use(cors());
let db;

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

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD, 
  },
  
});


app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await db.collection("Registration").findOne({email:email,user_name:name });
    if (existingUser) {
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
  const uid=name+email;
  try {
    const existingUser = await db.collection("Registration").findOne({ email });
    if (existingUser) {
      if (existingUser.password === password) {
        return res.status(200).send("Sign-up successful");
      } else {
        return res.status(401).send("User exists but the password is incorrect.");
      }
    }
    await db.collection("Registration").insertOne({
      user_name: name,
      email: email,
      password: password,
      uid:uid
    });
    console.log("Success");
    res.status(200).send("Sign-up successful");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Error during signup. Please try again.");
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


app.listen(3001, () => {
  console.log("Server started");
});