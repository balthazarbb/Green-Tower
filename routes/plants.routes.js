const router = require("express").Router();
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

router.get("/plants/:id", authorize, (req, res, next) => {
  //  Plants.findById()
  const towerId = req.params.id;
  Plants.find()
    .then((plants) => {
      //  console.log(plants);
      TowerModel.findById(towerId).then((tower) => {
        let plantsInTower = tower.plantId;
        // magic will happend

        let clonedPlants = JSON.parse(JSON.stringify(plants));
        clonedPlants.forEach((plant) => {
          if (plantsInTower.includes(plant._id)) plant.isInTower = true;
        });
        console.log(clonedPlants);

        res.render("plants.hbs", { plants: clonedPlants, towerId }); // {{plants.name}}
      });
    })
    .catch((err) => {})
    .catch((err) => {
      console.log(err);
    });
});

router.post("/plants/:towerId/:plantId", authorize, (req, res, next) => {
  const plantId = req.params.plantId; // how do we send the id over with the button?
  const towerId = req.params.towerId;
  //if towerModel.plantId.length==3:msgTower is full, please create new tower

  TowerModel.findByIdAndUpdate(towerId, { $push: { plantId } }, { new: true })
    .then((updatedTower) => {
      if (updatedTower.plantId.length >= 3) {
        res.redirect(`/profile`);
      } else {
        // req.session.userInfo = updatedUser; //update the session
        res.redirect(`/plants/${towerId}`); //does it go through the router.get route line 87 if res.redirect?
      }
    })
    .catch((err) => {
      console.log(err);
    });
  //how to stay on plants but keep towerId that came from the profile? store in session?
});

module.exports = router;
