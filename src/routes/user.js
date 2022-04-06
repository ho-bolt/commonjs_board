import express from "express"

import userVaild from "../helpers/userValid"
import authMiddleware from "../middlewares/auth-middleware";
import { getJoin, getAuth, postJoin, postAuth, checkAuth } from "../controller/userController"




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
router.post("/join", userVaild.PostUser, postJoin)
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