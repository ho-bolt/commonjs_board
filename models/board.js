const mongoose = require("mongoose")
const autoIdSetter = require("./auto-id")

const board = new mongoose.Schema({

    // boardId: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
})

autoIdSetter(board, mongoose, 'boards', 'boardId')

module.exports = mongoose.model("Boards", board)