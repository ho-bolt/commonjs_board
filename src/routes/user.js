import express from "express"

import userVaild from "../helpers/userValid"
import * as dotenv from 'dotenv'
import authMiddleware from "../middlewares/auth-middleware";
import { getJoin, getAuth, postLogin, postAuth, checkAuth } from "../controller/userController"
dotenv.config()
const salt = process.env.SALTNUM
const secretkey = process.env.SECERTKEY


//라우터 생성
const router = express.Router();


//유저관련

//회원가입 페이지
router.get("/join", getJoin);
// #swagger.tags = ["User"]
// #swagger.summary = "회원가입 페이지"



//로그인 페이지
router.get("/auth", getAuth)
// #swagger.tags = ["User"]
// #swagger.summary = "로그인 페이지"



//회원가입
router.post("/join", userVaild.PostUser, postLogin)
// #swagger.tags = ["User"]
// #swagger.summary = "회원가입 하기"





//로그인
router.post("/auth", postAuth)
// #swagger.tags = ["User"]
// #swagger.summary = "로그인 하기"


//사용자 검증
router.get("/auth/me", authMiddleware, checkAuth)
// #swagger.tags = ["User"]
// #swagger.summary = "사용자 검증"




module.exports = router;