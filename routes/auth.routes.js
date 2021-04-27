const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const TowerModel = require("../models/Towers.model");
const Plants = require("../models/Plants.model");

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
    TowerModel.find({ _id: { $in: [...user.towerId] } })
      .populate("plantId")
      .then((towers) => {
        let clonedTowers = JSON.parse(JSON.stringify(towers));
        clonedTowers.forEach((singleTower) => {
          // or can be of length 2
          // or can be of lenght 1
          // or can have no Plants
          console.log(singleTower.plantId);
          if (singleTower.plantId.length == 2) {
            singleTower.plantId.push({ showButton: true });
          }
          if (singleTower.plantId.length == 1) {
            singleTower.plantId.push({ showButton: true });
            singleTower.plantId.push({ showButton: true });
          }
          if (singleTower.plantId.length == 0) {
            singleTower.plantId.push({ showButton: true });
            singleTower.plantId.push({ showButton: true });
            singleTower.plantId.push({ showButton: true });
          }
          console.log(singleTower.plantId);
        });
        res.render("profile.hbs", { naming, towers: clonedTowers });
      });
  });

  //else show card with towername
  //  res.render("/profile.hbs", {towername});   can we use towername here already? because input is in line 95
});

//create a new tower above the tower cards
router.get("/create-new-tower", authorize, (req, res, next) => {
  const userId = req.session.userInfo._id;

  //if tower exi
  User.findById(userId).then((user) => {
    TowerModel.find({ _id: { $in: [...user.towerId] } }).then((towers) => {
      res.render("profile.hbs", { naming: true, towers });
    });
  });
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
      console.log(err);
    });
});

//Plants Routes

router.get("/plants/:id", authorize, (req, res, next) => {
  //  Plants.findById()
  const towerId = req.params.id;
  Plants.find()
    .then((plants) => {
      console.log(plants);
      res.render("plants.hbs", { plants, towerId }); // {{plants.name}}
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/plants/:towerId/:plantId", authorize, (req, res, next) => {
  const plantId = req.params.plantId; // how do we send the id over with the button?
  const towerId = req.params.towerId;
  TowerModel.findByIdAndUpdate(
    towerId,
    { $push: { plantId } },
    { new: true }
  ).then((updatedTower) => {
    // req.session.userInfo = updatedUser; //update the session
    res.redirect(`/plants/${towerId}`); //does it go through the router.get route line 87 if res.redirect?
  }); //how to stay on plants but keep towerId that came from the profile? store in session?
});

router.get("/logout", (req, res, next) => {
  // set the global variable 'isUserLoggedIn' so that we can use it in hbs
  req.app.locals.isUserLoggedIn = false;

  // deletes a specific session from DB
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
