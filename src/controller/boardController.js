import Boards from "../schemas/board"
import moment from "moment";
const { User } = require("../../models")
import Comment from "../schemas/comment"
import jwt from "jsonwebtoken"
const key = process.env.SECERTKEY


export const getBoard = async (req, res) => {
    const boards = await Boards.find().sort({ date: -1 })
    res.status(200).render('board', { boards, })
}

export const getWrite = (req, res) => {
    res.render('write')
}

export const deleteBoard = async (req, res) => {
    const { boardId } = req.params;

    await Boards.deleteOne({ boardId: Number(boardId) })
    return res.status(200).json({ msg: "게시글 삭제완료!", success: true })
}


export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    await Comment.deleteOne({ commentId: Number(commentId) })
    return res.status(200).json({ msg: "댓글 삭제!", success: true })
}

export const getDetailBoard = async (req, res) => {
    const { boardId } = req.params;
    const board = await Boards.findOne({ boardId: Number(boardId) }).exec()
    const comments = await Comment.find({ boardId: Number(boardId) }).sort({ date: -1 })
    res.render('detail', { board, comments, });
}

export const updateComment = async (req, res) => {
    const { user } = res.locals;
    const { cid } = req.params;
    const { content } = req.body;
    const date = moment().format("YYYY-MM-DD HH:mm");
    await Comment.updateOne({ commentId: Number(cid) }, { $set: { content, date } })
    return res.json({ msg: "수정 완료!", success: true, })
}

export const goUpdate = async (req, res) => {
    const { boardId } = req.params
    const [board] = await Boards.find({ boardId: Number(boardId) })
    res.render('write', { board })
}

export const updateBoard = async (req, res) => {
    const { boardId } = req.params;
    const { title, content } = req.body;
    const date = moment().format("YYYY-MM-DD HH:mm");
    await Boards.updateOne({ boardId: Number(boardId) }, { $set: { title, content, date } })

    return res.json({ msg: "수정 완료!", success: true })
}

export const postBoard = async (req, res) => {
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

export const postComment = async (req, res) => {
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

export const authCommentUser = async (req, res) => {
    const { user } = req
    const nickName = user.nickName
    const userEmail = user.userEmail
    const userNum = user.userNum

    res.json({ nickName, userEmail, userNum })
}