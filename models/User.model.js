//importing the Schema
const { Schema, model } = require("mongoose");
require("./Towers.model");

//setting the user schema
let UsersSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  towerId: [{
    type: Schema.Types.ObjectId,
    ref: 'Tower',
  }],
});

const User = model("Users", UsersSchema);

module.exports = User;
