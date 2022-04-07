// import express from "express"
const express = require("express")
const { getBoard,
    getWrite,
    authCommentUser,
    deleteBoard,
    postComment,
    deleteComment,
    postBoard,
    getDetailBoard,
    updateComment,
    goUpdate,
    updateBoard } = require("../controller/boardController")

const authMiddleware = require("../middlewares/auth-middleware")
// import {
//     getBoard,
//     getWrite,
//     authCommentUser,
//     deleteBoard,
//     postComment,
//     deleteComment,
//     postBoard,
//     getDetailBoard,
//     updateComment,
//     goUpdate,
//     updateBoard
// } from "../controller/boardController"
// import authMiddleware from "../middlewares/auth-middleware";



//라우터 생성

const router = express.Router();


// /board가 들어온다

// 전체 게시글 조회 
router.get("/", getBoard())
// #swagger.tags = ["Board"]
// #swagger.summary = "전체 게시글 조회 "

//작성페이지
router.get("/write", getWrite());
// #swagger.tags = ["Board"]
// #swagger.summary = "작성 페이지"

// //게시글 삭제
router.delete("/:boardId", deleteBoard())
// #swagger.tags = ["Board"]
// #swagger.summary = "게시글 삭제"

//댓글 삭제
router.delete("/comment/:commentId", deleteComment());


// 게시글 상세 조회 
router.get("/:boardId", getDetailBoard())
// #swagger.tags = ["Board"]
// #swagger.summary = "게시글 상세 조회"


//댓글 수정
router.patch("/comment/:cid", authMiddleware, updateComment())
// #swagger.tags = ["Comment"]
// #swagger.summary = "댓글 수정"


//수정하기로 가기 
router.get("/write/:boardId", goUpdate())
// #swagger.tags = ["Board"]
// #swagger.summary = "수정하기로 가기 "


//게시글 수정 
router.put("/:boardId", updateBoard())
// #swagger.tags = ["Board"]
// #swagger.summary = "게시글 수정"


//로그인 확인 여부
router.get("/auth", authMiddleware, async (req, res) => {
    // #swagger.tags = ["User"]
    // #swagger.summary = "로그인 확인 여부"

})

router.get("/comment/auth", authMiddleware, authCommentUser())
// #swagger.tags = ["Comment"]
// #swagger.summary = "댓글 사용자 인증"



//게시글 작성 
router.post("/write", postBoard())
// #swagger.tags = ["Board"]
// #swagger.summary = "게시글 작성"


//댓글 달기
router.post("/comment", postComment())
// #swagger.tags = ["Comment"]
// #swagger.summary = "댓글 달기"



module.exports = router;