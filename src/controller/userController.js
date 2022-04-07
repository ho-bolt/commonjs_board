const { User } = require("../../models")
const bcrypt = require("bcrypt")
// import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken")
// import jwt from "jsonwebtoken"
const { Op } = require("sequelize")
const { key } = require("../env")
// import { key, saltNum } from "../env";

// const getJoin = (req, res) => res.render('join');


function getJoin() {
    return (req, res) => res.render('join');
}

function getAuth() {
    return (req, res) => res.render("auth")
}
// const getAuth = (req, res) => res.render("auth")

function postJoin() {
    return async (req, res) => {

        const { userEmail, nickName, password, confirmPassword } = req.body;
        //비번 확인
        if (password !== confirmPassword) {
            res.json({
                success: false, msg: "비밀번호가 일치하지 않습니다",
            });
            return;
        }

        console.log("@@@0", User)
        //email, nickname 중복검사
        const existUser = await User.findOne({
            where: {
                [Op.or]: [{ userEmail }, { nickName }]
            },
        });
        if (existUser) {
            res.json({
                success: false, msg: "이메일 또는 닉네임이 이미 존재합니다",
            });
            return;
        }
        const hashedPw = bcrypt.hashSync(password, 10);
        try {
            await User.create({
                userEmail,
                nickName,
                password: hashedPw
            });
            res.status(201).json({ success: true, msg: "회원가입 완료!" })
        } catch (error) {
            res.status(400).json({ success: false, msg: "에러발생!" })
        }

    }
}

// const postJoin = async (req, res) => {

//     const { userEmail, nickName, password, confirmPassword } = req.body;
//     //비번 확인
//     if (password !== confirmPassword) {
//         res.json({
//             success: false, msg: "비밀번호가 일치하지 않습니다",
//         });
//         return;
//     }

//     console.log("@@@0", User)
//     //email, nickname 중복검사
//     const existUser = await User.findOne({
//         where: {
//             [Op.or]: [{ userEmail }, { nickName }]
//         },
//     });
//     if (existUser) {
//         res.json({
//             success: false, msg: "이메일 또는 닉네임이 이미 존재합니다",
//         });
//         return;
//     }
//     const hashedPw = bcrypt.hashSync(password, 10);
//     try {
//         await User.create({
//             userEmail,
//             nickName,
//             password: hashedPw
//         });
//         res.status(201).json({ success: true, msg: "회원가입 완료!" })
//     } catch (error) {
//         res.status(400).json({ success: false, msg: "에러발생!" })
//     }

// }


function postAuth() {
    return async (req, res) => {
        const { userEmail, password } = req.body;
        if (userEmail === "" || password === "") {
            res.json({
                success: false, msg: "이메일과 비밀번호를 입력해주세요!"
            })
            return;
        }
        const existUser = await User.findOne({ where: { userEmail } })
        if (existUser === null) {
            res.json({
                success: false, msg: "해당하는 아이디가 혹은 비밀번호가 틀렸습니다."
            })
            return;
        }
        const decodedPassword = existUser.password;
        if (!bcrypt.compareSync(password, decodedPassword)) {
            res.json({
                success: false, msg: "이메일 또는 비밀번호가 틀렸습니다.",
            });
            return;
        }
        //입력한 이메일을 db에서 찾아서 user에 넣어줘

        const user = await User.findOne({ where: { userEmail } });
        console.log("#####", user)
        //토큰 생성
        const token = jwt.sign({ userNum: user.userNum, nickName: user.nickName }, key)

        res.status(201).send({
            success: true, token, msg: "로그인성공",
        });
    }
}

// const postAuth = async (req, res) => {
//     const { userEmail, password } = req.body;
//     if (userEmail === "" || password === "") {
//         res.json({
//             success: false, msg: "이메일과 비밀번호를 입력해주세요!"
//         })
//         return;
//     }
//     const existUser = await User.findOne({ where: { userEmail } })
//     if (existUser === null) {
//         res.json({
//             success: false, msg: "해당하는 아이디가 혹은 비밀번호가 틀렸습니다."
//         })
//         return;
//     }
//     const decodedPassword = existUser.password;
//     if (!bcrypt.compareSync(password, decodedPassword)) {
//         res.json({
//             success: false, msg: "이메일 또는 비밀번호가 틀렸습니다.",
//         });
//         return;
//     }
//     //입력한 이메일을 db에서 찾아서 user에 넣어줘

//     const user = await User.findOne({ where: { userEmail } });
//     console.log("#####", user)
//     //토큰 생성
//     const token = jwt.sign({ userNum: user.userNum, nickName: user.nickName }, key)

//     res.status(201).send({
//         success: true, token, msg: "로그인성공",
//     });
// }

function checkAuth() {
    return async (req, res) => {
        res.send({ user: res.locals.user, success: true, });
    }
}

// const checkAuth = async (req, res) => {
//     res.send({ user: res.locals.user, success: true, });
// }

module.exports = { getJoin, checkAuth, postAuth, postJoin, getAuth }