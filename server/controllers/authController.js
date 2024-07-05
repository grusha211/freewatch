const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const mandrilltransport = require('nodemailer-mandrill-transport');

const generatePassword = (firstname, lastname, mobile) => {
    const firstPart = firstname.slice(0, 2);
    const lastPart = lastname.slice(-2);
    const mobile_str = mobile.toString();
    const mobilePart = mobile_str.slice(-4);
    return `${firstPart}${lastPart}${mobilePart}`;
  };

const registerUser = async (req, res) => {
  const { firstname, lastname, mobile, email } = req.body;

  const password = generatePassword(firstname,lastname,mobile);
  console.log(password);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      firstname,
      lastname,
      mobile,
      email,
      password: hashedPassword,
    });

    await newUser.save();

   
    const transporter = nodemailer.createTransport(mandrilltransport({
      auth: {
        apiKey: process.env.MANDRILLKEY
      }
    }));

    const mailOptions = {
      from: process.env.MAIL_EMAIL,
      to: email,
      subject: 'Welcome to our platform',
      text: `Hello ${firstname},Thank you for registering. your password is ${password}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'User registered and email sent' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { registerUser, loginUser };