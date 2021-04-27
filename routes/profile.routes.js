const router = require("express").Router();
const User = require("../models/User.model");

const TowerModel = require("../models/Towers.model");
const Plants = require("../models/Plants.model");

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

  //if tower exists
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
//delete tower
router.post("/delete-tower/:id", (req, res, next)=>{
  const{id} = req.params
  TowerModel.findByIdAndDelete(id)
  .then(() => {
    User.findByIdAndUpdate(req.session.userInfo._id, { $pull: { towerId: id } })
    .then(()=>{
      res.redirect("/profile");
    })
    .catch((err)=>{
      console.log(err)
    })
    
  }).catch((err) => {
    console.log(err)
  });
})



module.exports = router;
