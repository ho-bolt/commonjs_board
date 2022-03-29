const mongoose = require("mongoose")
const autoIdSetter = require("./auto-id")

const comment = new mongoose.Schema({
    boardId: {
        type: Number,
        required: true,
    },

    nickName: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
})

autoIdSetter(comment, mongoose, 'comment', 'commentId')
module.exports = mongoose.model("comment", comment)