//importing the Schema
const { Schema, model } = require("mongoose");

//setting the user schema
let UsersSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});

const UsersModel = model('Users', UsersSchema);

module.exports = UsersModel;