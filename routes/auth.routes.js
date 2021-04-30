const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  // check if input of password and username exists

  if (!username || !password) {
    res.render("auth/signup.hbs", { msg: "PLease enter all fields" });
    return;
  }
    const passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passRe.test(password)) {
    res.render("auth/signup.hbs", {
      msg:
        "Password must be 8 characters, must have a number, and an uppercase Letter",
    });
    return;
  }

  // encrypt the PW, create User in db:
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  User.create({ username, password: hash })
    .then(() => {
      res.redirect("/login");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  // validate input of PW and Username
  console.log(username);
  User.findOne({ username })
    .then((response) => {
      // when email does not exists, response will be an null
      if (!response) {
        console.log("Here", response);
        res.render("auth/login.hbs", {
          msg: "Username or password seems to be wrong",
        });
      } else {
        // 2. compare the password with bcrypt
        // response.password is the hashed password from the db
        // password is the one that the user typed in the input, we use from req.body
        console.log(password);
        console.log(response);
        bcrypt.compare(password, response.password).then((isMatching) => {
          //compare will return a true or a false
          if (isMatching) {
            req.session.userInfo = response;
            req.app.locals.isUserLoggedIn = true;
            res.redirect("/profile");
            console.log("worked");
          } else {
            res.render("auth/login", {
              msg: "Username or password seems to be wrong",
            });
          }
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/logout", (req, res, next) => {
  // set the global variable 'isUserLoggedIn' so that we can use it in hbs
  req.app.locals.isUserLoggedIn = false;

  // deletes a specific session from DB
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
