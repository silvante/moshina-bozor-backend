const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const OTP = require("../models/OTP.model");
const nodemailer = require("nodemailer");
// const bcryptjs = require("bcryptjs");

const cyfer = bcryptjs.genSaltSync(8);

// mothod: get
// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).send("we have no users yet...");
    }
    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// mothod: get
// get a user
const getUser = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.find({ _id: id });
    if (!user) {
      res.status(404).send("user is not defined");
    }
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(err);
  }
};

// mothod: post
// add new user
const addUser = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      bio,
      password,
      avatar,
      verificated,
      mobile,
      telegram,
    } = req.body;

    const existingEmail = await User.find({ email });
    const existingUsername = await User.find({ username });

    if (existingEmail.length >= 1) {
      res.status(404).send("email is already used");
      return;
    }
    if (existingUsername.length >= 1) {
      res.send("username is already taken");
      return;
    } else {
      const newUser = await new User({
        name,
        username,
        email,
        bio,
        password: bcryptjs.hashSync(password, cyfer),
        avatar,
        verificated,
        mobile,
        telegram,
      });
      newUser.save().then((result) => {
        sendOTPverification(result, res);
      });
      // return res.status(201).send(newUser);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// mothod: put
// edit user by id
const editUser = async (req, res) => {
  const id = res.body.id;
  try {
    const {
      name,
      password,
      verificated,
      username,
      avatar,
      bio,
      email,
      mobile,
      telegram,
    } = req.body;
    const editedUser = await User.findByIdAndUpdate(id, {
      name,
      password: bcryptjs.hashSync(password, cyfer),
      verificated,
      username,
      avatar,
      bio,
      email,
      mobile,
      telegram,
    });
    return res.status(202).send(editedUser);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// mothod: delete
// delete user by id
const deleteUser = async (req, res) => {
  const removingUserId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(removingUserId);
    if (!deletedUser) {
      res.status(404).send("user is not defined...");
    }
    return res.status(203).send(deleteUser);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// transporter

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("ready for messages");
    console.log(success);
  }
});

// One Time Password

const sendOTPverification = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Emailni tekshirib oling",
      html: `<p>Sizning kodingiz <b>${otp}</b> uni saytga kirgizing va emailni verificatsiya qilib oling va uni hech kimga aytmang </p>`,
    };

    const saltRounds = 10;

    const hashedOTP = await bcryptjs.hash(otp, saltRounds);

    const newOTP = await new OTP({
      userid: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    await newOTP.save();

    transporter.sendMail(mailOptions);

    res.json({
      status: "KUTILMOQDA",
      message: "Verificatsiya code email ga jonatildi",
      data: {
        userid: _id,
        email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getUser,
  getUsers,
  addUser,
  editUser,
  deleteUser,
};
