const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

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
    const newUser = await User.create({
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
    return res.status(201).send(newUser);
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

module.exports = {
  getUser,
  getUsers,
  addUser,
  editUser,
  deleteUser,
};
