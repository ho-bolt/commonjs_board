import User from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { key, saltNum } from "../env";
export const getJoin = (req, res) => res.render('join');
export const getAuth = (req, res) => res.render("auth")

export const postLogin = async (req, res) => {
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
    const hashedPw = bcrypt.hashSync(password, saltNum);

    const user = new User({ userEmail, nickName, password: hashedPw });
    await user.save()
    res.status(201).json({ success: true, msg: "회원가입 완료!" })
}


export const postAuth = async (req, res) => {
    const { userEmail, password } = req.body;
    if (userEmail === "" || password === "") {
        res.json({
            success: false, msg: "이메일과 비밀번호를 입력해주세요!"
        })
        return;
    }
    const existUser = await User.findOne({ userEmail })
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

    const user = await User.findOne({ userEmail });
    //토큰 생성
    const token = jwt.sign({ userId: user.userNum, nickName: user.nickName }, key)

    res.status(201).send({
        success: true, token, msg: "로그인성공",
    });
}


export const checkAuth = async (req, res) => {
    res.send({ user: res.locals.user, success: true, });
}