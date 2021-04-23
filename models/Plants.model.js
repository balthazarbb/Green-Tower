//importing the Schema and model
 
const { Schema, model } = require("mongoose");

//setting the plant Schema
let PlantsSchema = new Schema({
    plantname: String,
    description: String,
    timeToHarvest: Number,
    placement: String,
    plantType: String

});

const PlantsModel = model('Plants', PlantsSchema);

module.exports = PlantsModel;