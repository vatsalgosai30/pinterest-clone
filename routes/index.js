const express = require("express");
const router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const { render } = require("ejs");
const passport = require("passport");

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/feed", function (req, res, next) {
  res.render("feed");
});

router.get("/profile", isLoggedIn, function (req, res, next) {
  res.render("profile");
});
/*------without passport some apis ------------------*/

// router.get("/alluserpost", async function (req, res, next) {
//   let user = await userModel
//     .findOne({ _id: "65fa83bd1088d57d7a158703" })
//     .populate("posts");
//   res.send(user);
// });

// router.get("/createuser", async function (req, res, next) {
//   try {
//     const createdUser = await userModel.create({
//       username: "example",
//       password: "example",
//       posts: [],
//       email: "example@email.com",
//       fullname: "example given",
//     });
//     res.send(createdUser);
//   } catch (err) {
//     next(err); // Forward the error to the error handling middleware
//   }
// });

// router.get("/createpost", async function (req, res, next) {
//   try {
//     const createdPost = await postModel.create({
//       postText: "Hello kaise ho",
//       user: "65fa83bd1088d57d7a158703",
//     });
//     let user = await userModel.findOne({ _id: "65fa83bd1088d57d7a158703" });
//     user.posts.push(createdPost._id);
//     await user.save();
//     res.send(createdPost);
//   } catch (err) {
//     next(err); // Forward the error to the error handling middleware
//   }
// });

router.post("/register", function (req, res) {
  const { username, email, fullname } = req.body;
  const userData = userModel({ username, email, fullname });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
