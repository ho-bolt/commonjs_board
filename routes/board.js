const express = require("express")
const moment = require("moment")
const bcrypt = require('bcrypt')
const Joi = require("joi")
const User = require("../models/users");
const Comment = require("../models/comment")
const jwt = require("jsonwebtoken");
//게시판 모델
const Boards = require("../models/board");
const authMiddleware = require("../middlewares/auth-middleware");
const key = process.env.SECERTKEY


//라우터 생성
const router = express.Router();


// /board가 들어온다

// 전체 게시글 조회 
router.get("/", async (req, res) => {
    const boards = await Boards.find().sort({ date: -1 })

    res.status(200).render('board', { boards })

});

//작성페이지
router.get("/write", async (req, res) => {
    res.render('../views/write')
});





// //게시글 로그인 후 작성하게 하기
// router.get("/auth", async (req, res) => {

// })


// //게시글 삭제
router.delete("/:boardId", async (req, res) => {
    const { boardId } = req.params;

    // const [board] = await Boards.find({ boardId: Number(boardId) })
    await Boards.deleteOne({ boardId: Number(boardId) })
    return res.status(200).json({ msg: "게시글 삭제완료!", success: true })

});

//댓글 삭제
router.delete("/comment/:commentId", async (req, res) => {
    const { commentId } = req.params;
    console.log("commenttttttttttt", commentId)
    await Comment.deleteOne({ commentId: Number(commentId) })
    return res.status(200).json({ msg: "댓글 삭제!", success: true })
})




// 게시글 상세 조회 

router.get("/:boardId", async (req, res) => {

    const { boardId } = req.params;
    const board = await Boards.findOne({ boardId: Number(boardId) }).exec()
    const comments = await Comment.find({ boardId: Number(boardId) })
    res.render('detail', {
        board, comments,
    });
});




//댓글 수정
router.patch("/comment/:cid", async (req, res) => {
    const { cid } = req.params;
    const { content } = req.body;
    const date = moment().format("YYYY-MM-DD HH:mm");
    await Comment.updateOne({ commentId: Number(cid) }, { $set: { content, date } })
    return res.json({ msg: "수정 완료!", success: true })

})



//수정하기로 가기 
router.get("/write/:boardId", async (req, res) => {
    const { boardId } = req.params
    const [board] = await Boards.find({ boardId: Number(boardId) })
    res.render('write', { board })
});

//쿼리로 board.nickName을 같이 보내고 
//만약 nickName이 게시된 글의 있는 nickName과 일치하면 버튼을 보여주고 아니면 안보여주고


//게시글 수정 
router.put("/:boardId", async (req, res) => {
    const { boardId } = req.params;
    const { title, content } = req.body;
    const date = moment().format("YYYY-MM-DD HH:mm");
    const [existBoard] = await Boards.find({ boardId: Number(boardId) })

    await Boards.updateOne({ boardId: Number(boardId) }, { $set: { title, content, date } })
    return res.status(201).json({ msg: "수정 완료!", success: true })
});



//로그인 확인 여부
router.get("/auth", authMiddleware, async (req, res) => {
    const { user } = req
    const nickName = user.nickName
    const userEmail = user.userEmail
    const userNum = user.userNum

    res.json({ nickName, userEmail, userNum })
})

//게시글 작성 
router.post("/write", async (req, res) => {
    const { authorization } = req.headers
    const { title, content } = req.body;

    const date = moment().format("YYYY-MM-DD HH:mm");

    const { userId } = jwt.verify(authorization.split(" ")[1], key);
    const { nickName } = await User.findOne({ userNum: Number(userId) })

    const createBoards = await Boards.create({
        userId,
        title,
        content,
        nickName,
        date,
    });

    res.status(201).json({ success: true, msg: "작성 완료!" })
});

//댓글 달기
router.post("/comment", async (req, res) => {
    const { authorization } = req.headers
    const { boardId, content } = req.body;
    const date = moment().format("YYYY-MM-DD HH:mm:ss")
    const { userId } = jwt.verify(authorization.split(" ")[1], key);
    const { nickName } = await User.findOne({ userNum: Number(userId) })

    const comment = await Comment.create({ boardId, content, nickName, date })

    res.status(201).json({ success: true, msg: "댓글 등록!" })
})


module.exports = router;