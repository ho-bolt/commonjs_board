const express = require("express")
const moment = require("moment")
const bcrypt = require('bcrypt')
const User = require("../models/users")
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middleware")
const Joi = require("joi")


//라우터 생성
const router = express.Router();


//유저관련

//회원가입 페이지
router.get("/join", async (req, res) => {
    console.log("join")
    res.render('join')
})

//로그인 페이지
router.get("/auth", async (req, res) => {
    res.render('auth')
})

//로그인 인증
router.get("/auth/me", authMiddleware, async (req, res) => {
    console.log("옴")
    console.log(res.locals)
    res.send({ user: res.locals.user });
})





// const postUsersSchema = Joi.object({
//     userEmail: Joi.string().required(),
//     nickName: Joi.string().required(),
//     password: Joi.string().required(),
//     confirmPassword: Joi.string().required()
// })

//회원가입
router.post("/join", async (req, res) => {
    const { userEmail, nickName, password, confirmPassword } = req.body;
    //비번 확인
    if (password !== confirmPassword) {
        res.json({
            success: false, msg: "비밀번호가 일치하지 않습니다",
        });
        return;
    }

    //email, nickname 중복검사
    const existUser = await User.findOne({
        $or: [{ userEmail }, { nickName }],
    });
    if (existUser) {
        res.json({
            success: false, msg: "이메일 또는 닉네임이 이미 존재합니다",
        });
        return;
    }
    const user = new User({ userEmail, nickName, password });
    await user.save()
    res.status(201).json({ success: true, msg: "회원가입 완료!" })
})




//로그인 

router.post("/auth", async (req, res) => {
    const { userEmail, password } = req.body;

    const user = await User.findOne({ userEmail });

    if (!user || password !== user.password) {
        res.json({
            success: false, msg: "이메일 또는 비밀번호가 틀렸습니다.",
        });
        return;
    }
    res.send({
        success: true, msg: "로그인성공",
        token: jwt.sign({ userId: user.userId }, "my-key")
    });
});





module.exports = router;