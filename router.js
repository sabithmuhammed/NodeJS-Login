const express = require("express");
const router = express.Router();
const credentials = {
  email: "sabith@gmail.com",
  password: "sabith123",
};
const products = require("./data");
router.post("/login", (req, res) => {
  if (
    req.body.email === credentials.email &&
    req.body.password === credentials.password
  ) {
    req.session.user = req.body.email;
    res.redirect("/route/home");
  } else {
    res.render("login", { message: "Username or Password is incorrect",title:'Login'});
  }
});
router.get("/home", (req, res) => {
  if (req.session.user) {
    res.render("home", {
      user: req.session.user,
      data: products,
      title: "home",
    });
  } else {
    res.redirect("/");
  }
});
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send("Error");
    } else {
      res.render("login", {
        message: "Logged out successfully",
        title: "Login",
      });
    }
  });
});
module.exports = router;
