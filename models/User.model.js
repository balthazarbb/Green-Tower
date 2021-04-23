//importing the Schema
const { Schema, model } = require("mongoose");
const { schema } = require("./Plants.model");

//setting the user schema
let UsersSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    plantId: {
        type: Schema.Types.ObjectId,
        ref: PlantsModel
    },
    towerId: {
        type: Schema.Types.ObjectId,
        ref: TowersModel
    }
});

const UsersModel = model('Users', UsersSchema);

module.exports = UsersModel;