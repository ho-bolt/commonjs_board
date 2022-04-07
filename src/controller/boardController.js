// import Boards from "../schemas/board"
const Boards = require("../schemas/board")
const moment = require("moment")
// import moment from "moment";
const { User } = require("../../models")
const Comment = require("../schemas/comment")
// import Comment from "../schemas/comment"
const jwt = require("jsonwebtoken")
// import jwt from "jsonwebtoken"
const key = process.env.SECERTKEY


// const getBoard = async (req, res) => {
//     const boards = await Boards.find().sort({ date: -1 })
//     res.status(200).render('board', { boards, })
// }
function getBoard() {
    return async (req, res) => {
        const boards = await Boards.find().sort({ date: -1 })
        res.status(200).render('board', { boards, })
    }
}

function getWrite() {
    return (req, res) => {
        res.render('write')
    }
}

function deleteBoard() {
    return async (req, res) => {
        const { boardId } = req.params;

        await Boards.deleteOne({ boardId: Number(boardId) })
        return res.status(200).json({ msg: "게시글 삭제완료!", success: true })
    }
}

// const deleteBoard = async (req, res) => {
//     const { boardId } = req.params;

//     await Boards.deleteOne({ boardId: Number(boardId) })
//     return res.status(200).json({ msg: "게시글 삭제완료!", success: true })
// }

function deleteComment() {
    return async (req, res) => {
        const { commentId } = req.params;
        await Comment.deleteOne({ commentId: Number(commentId) })
        return res.status(200).json({ msg: "댓글 삭제!", success: true })
    }
}
// const deleteComment = async (req, res) => {
//     const { commentId } = req.params;
//     await Comment.deleteOne({ commentId: Number(commentId) })
//     return res.status(200).json({ msg: "댓글 삭제!", success: true })
// }

function getDetailBoard() {
    return async (req, res) => {
        const { boardId } = req.params;
        const board = await Boards.findOne({ boardId: Number(boardId) }).exec()
        const comments = await Comment.find({ boardId: Number(boardId) }).sort({ date: -1 })
        res.render('detail', { board, comments, });
    }
}
// const getDetailBoard = async (req, res) => {
//     const { boardId } = req.params;
//     const board = await Boards.findOne({ boardId: Number(boardId) }).exec()
//     const comments = await Comment.find({ boardId: Number(boardId) }).sort({ date: -1 })
//     res.render('detail', { board, comments, });
// }

function updateComment() {
    return async (req, res) => {
        const { user } = res.locals;
        const { cid } = req.params;
        const { content } = req.body;
        const date = moment().format("YYYY-MM-DD HH:mm");
        await Comment.updateOne({ commentId: Number(cid) }, { $set: { content, date } })
        return res.json({ msg: "수정 완료!", success: true, })
    }
}

// const updateComment = async (req, res) => {
//     const { user } = res.locals;
//     const { cid } = req.params;
//     const { content } = req.body;
//     const date = moment().format("YYYY-MM-DD HH:mm");
//     await Comment.updateOne({ commentId: Number(cid) }, { $set: { content, date } })
//     return res.json({ msg: "수정 완료!", success: true, })
// }

function goUpdate() {
    return async (req, res) => {
        const { boardId } = req.params
        const [board] = await Boards.find({ boardId: Number(boardId) })
        res.render('write', { board })
    }
}

// const goUpdate = async (req, res) => {
//     const { boardId } = req.params
//     const [board] = await Boards.find({ boardId: Number(boardId) })
//     res.render('write', { board })
// }

function updateBoard() {
    return async (req, res) => {
        const { boardId } = req.params;
        const { title, content } = req.body;
        const date = moment().format("YYYY-MM-DD HH:mm");
        await Boards.updateOne({ boardId: Number(boardId) }, { $set: { title, content, date } })

        return res.json({ msg: "수정 완료!", success: true })
    }
}
// const updateBoard = async (req, res) => {
//     const { boardId } = req.params;
//     const { title, content } = req.body;
//     const date = moment().format("YYYY-MM-DD HH:mm");
//     await Boards.updateOne({ boardId: Number(boardId) }, { $set: { title, content, date } })

//     return res.json({ msg: "수정 완료!", success: true })
// }


function postBoard() {
    return async (req, res) => {
        const { authorization } = req.headers
        const { title, content } = req.body;

        const date = moment().format("YYYY-MM-DD HH:mm");

        const { userNum } = jwt.verify(authorization.split(" ")[1], key);
        const { nickName } = await User.findOne({ where: { userNum } })

        const createBoards = await Boards.create({
            userNum,
            title,
            content,
            nickName,
            date,
        });

        res.status(201).json({ success: true, msg: "작성 완료!" })
    }
}

// const postBoard = async (req, res) => {
//     const { authorization } = req.headers
//     const { title, content } = req.body;

//     const date = moment().format("YYYY-MM-DD HH:mm");

//     const { userNum } = jwt.verify(authorization.split(" ")[1], key);
//     const { nickName } = await User.findOne({ where: { userNum } })

//     const createBoards = await Boards.create({
//         userNum,
//         title,
//         content,
//         nickName,
//         date,
//     });

//     res.status(201).json({ success: true, msg: "작성 완료!" })
// }


function postComment() {
    return async (req, res) => {
        const { authorization } = req.headers
        const [tokenType, tokenValue] = authorization.split(' ');
        if (tokenValue === "null") {
            res.json({
                msg: "로그인 먼저 해주세요!"
            })
            return;
        }

        const { boardId, content } = req.body;
        if (content === "") {
            res.json({
                success: false, msg: "댓글 내용을 입력해주세요!"
            })
            return;
        }

        const date = moment().format("YYYY-MM-DD HH:mm:ss")
        const { userId } = jwt.verify(authorization.split(" ")[1], key);
        const { nickName } = await User.findOne({ userNum: Number(userId) })

        await Comment.create({ boardId, content, nickName, date })

        res.status(201).json({ success: true, msg: "댓글 등록!" })
    }
}
// const postComment = async (req, res) => {
//     const { authorization } = req.headers
//     const [tokenType, tokenValue] = authorization.split(' ');
//     if (tokenValue === "null") {
//         res.json({
//             msg: "로그인 먼저 해주세요!"
//         })
//         return;
//     }

//     const { boardId, content } = req.body;
//     if (content === "") {
//         res.json({
//             success: false, msg: "댓글 내용을 입력해주세요!"
//         })
//         return;
//     }

//     const date = moment().format("YYYY-MM-DD HH:mm:ss")
//     const { userId } = jwt.verify(authorization.split(" ")[1], key);
//     const { nickName } = await User.findOne({ userNum: Number(userId) })

//     await Comment.create({ boardId, content, nickName, date })

//     res.status(201).json({ success: true, msg: "댓글 등록!" })
// }

function authCommentUser() {
    return async (req, res) => {
        const { user } = req
        const nickName = user.nickName
        const userEmail = user.userEmail
        const userNum = user.userNum

        res.json({ nickName, userEmail, userNum })
    }
}
// const authCommentUser = async (req, res) => {
//     const { user } = req
//     const nickName = user.nickName
//     const userEmail = user.userEmail
//     const userNum = user.userNum

//     res.json({ nickName, userEmail, userNum })
// }

module.exports = { authCommentUser, postComment, postBoard, updateBoard, goUpdate, getBoard, getWrite, updateComment, getDetailBoard, deleteComment, deleteBoard }