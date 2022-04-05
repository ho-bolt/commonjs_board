const { string } = require("joi");
const mongoose = require("mongoose");
const autoIdSetter = require("./auto-id")

const User = new mongoose.Schema({
    userEmail: { type: String, required: true },
    nickName: { type: String, required: true },
    password: { type: String, required: true },

});



autoIdSetter(User, mongoose, 'userNum', 'userNum')
module.exports = mongoose.model("User", User);




// module.exports = postUsersSchema;