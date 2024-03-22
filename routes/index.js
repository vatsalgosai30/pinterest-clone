const express = require("express");
const router = express.Router();
const userModel = require("./users");
const postModel = require("./post");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/alluserpost", async function (req, res, next) {
  let user = await userModel
    .findOne({ _id: "65fa83bd1088d57d7a158703" })
    .populate("posts");
  res.send(user);
});

router.get("/createuser", async function (req, res, next) {
  try {
    const createdUser = await userModel.create({
      username: "example",
      password: "example",
      posts: [],
      email: "example@email.com",
      fullname: "example given",
    });
    res.send(createdUser);
  } catch (err) {
    next(err); // Forward the error to the error handling middleware
  }
});

router.get("/createpost", async function (req, res, next) {
  try {
    const createdPost = await postModel.create({
      postText: "Hello kaise ho",
      user: "65fa83bd1088d57d7a158703",
    });
    let user = await userModel.findOne({ _id: "65fa83bd1088d57d7a158703" });
    user.posts.push(createdPost._id);
    await user.save();
    res.send(createdPost);
  } catch (err) {
    next(err); // Forward the error to the error handling middleware
  }
});

module.exports = router;
