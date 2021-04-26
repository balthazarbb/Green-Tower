//importing the Schema

const { Schema, model } = require("mongoose");
require('./Plants.model')
//setting the user Schema
let TowerSchema = new Schema({
    towername: String,
    maxPlants: Number,
    plantId: [{
        type: Schema.Types.ObjectId,
        ref: 'Plants',
      }]
});

const TowerModel = model('Tower', TowerSchema);

module.exports = TowerModel;