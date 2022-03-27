const express = require("express")
const moment = require("moment")
const bcrypt = require('bcrypt')
const User = require("../models/users")
const jwt = require("jsonwebtoken");
const userValid = require("../helpers/userValid")
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


// const postUsersSchema = Joi.object({
//     userEmail: Joi.string().required(),
//     nickName: Joi.string().required(),
//     password: Joi.string().required(),
//     confirmPassword: Joi.string().required()
// })

//회원가입
router.post("/join", userValid.PostUser, async (req, res) => {
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
    const hashedPw = bcrypt.hashSync(password, 10);

    const user = new User({ userEmail, nickName, password: hashedPw });
    await user.save()
    res.status(201).json({ success: true, msg: "회원가입 완료!" })
})




//로그인 

router.post("/auth", async (req, res) => {
    const { userEmail, password } = req.body;
    const decodedPassword = await User.findOne({ userEmail }).then((val) => { return val.password })

    if (!bcrypt.compareSync(password, decodedPassword)) {
        res.json({
            success: false, msg: "이메일 또는 비밀번호가 틀렸습니다.",
        });
        return;
    }
    const user = await User.findOne({ userEmail });
    //토큰 생성
    const token = jwt.sign({ userId: user.userNum }, process.env.SECERTKEY)
    res.status(201).send({
        success: true, token, msg: "로그인성공",
    });
});

//사용자 검증
router.get("/auth/me", authMiddleware, async (req, res) => {
    console.log("옴")
    console.log(res.locals)
    res.send({ user: res.locals.user, success: true, });
});





module.exports = router;