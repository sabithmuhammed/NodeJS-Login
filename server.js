const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session");
const nocache = require("nocache");
const { v4: uuidv4 } = require("uuid");
const router = require("./router");
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);
app.use(nocache());

app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/route", router);
app.get("/", (req, res) => {
  res.render("login", { title: "login" });
});

app.listen(3000);
