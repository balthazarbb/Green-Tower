const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const TowerModel = require("../models/Towers.model");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

router.post("/signup", (req, res, next) => {
  console.log("testtesttest");
  const { username, password } = req.body;
  // check if input of password and username exists
  console.log(`TESTEETSETEESTSS, ${username}`);
  if (!username || !password) {
    res.render("auth/signup.hbs", { msg: "PLease enter all fields" });
    return;
  }
  /*  const passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passRe.test(password)) {
    res.render("auth/signup.hbs", {
      msg:
        "Password must be 8 characters, must have a number, and an uppercase Letter",
    });
    return;
  }
*/
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

// Authorized
const authorize = (req, res, next) => {
  console.log("See I'm here");
  if (req.session.userInfo) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/profile", authorize, (req, res, next) => {
  const naming = !req.session?.userInfo?.towerId?.length; //use optional chaining with ? //using !! to convert num to booleans
  const userId = req.session.userInfo._id;
  console.log(naming);
  //if tower exi
  User.findById(userId).then((user) => {
    TowerModel.find({ _id: { $in: [...user.towerId] } }).then((towers) => {
      res.render("profile.hbs", { naming, towers });
    });
  });

  //else show card with towername
  //  res.render("/profile.hbs", {towername});   can we use towername here already? because input is in line 95
});

router.post("/create-tower", authorize, (req, res, next) => {
  const { towername } = req.body;
  const userId = req.session.userInfo._id;
  console.log(req.body);
  console.log(towername);
  TowerModel.create({ towername })
    .then((tower) => {
      User.findByIdAndUpdate(
        userId,
        { $push: { towerId: tower._id } },
        { new: true }
      ) //$push =pushing into array //new: true for the updatedUser=updated
        .then((updatedUser) => {
          //push towername to user in db
          //
          req.session.userInfo = updatedUser; //update the session
          res.redirect("/profile"); //does it go through the router.get route line 87 if res.redirect?
        });
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
});

router.get("/plants", authorize, (req, res, next) => {
  res.render("plants.hbs");
});

//router.post("/plants")

module.exports = router;
