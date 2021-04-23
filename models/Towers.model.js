//importing the Schema

const { Schema, model } = require("mongoose");

//setting the user Schema
let TowerSchema = new Schema({
    towername: String,
    maxPlants: Number
});

const TowerModel = model('Tower', TowerSchema);

module.exports = TowerModel;