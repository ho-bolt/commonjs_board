const { string } = require("joi");
const mongoose = require("mongoose");

const User = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    nickName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

User.virtual("userId").get(function () {
    return this._id.toHexString();
});
User.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("User", User);




// module.exports = postUsersSchema;