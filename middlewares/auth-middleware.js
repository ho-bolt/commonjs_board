const jwt = require("jsonwebtoken")
const User = require("../models/users")
const key = process.env.SECERTKEY


module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log("미들웨어 들어옴")
    const [tokenType, tokenValue] = authorization.split(' ');


    if (tokenType !== 'Bearer') {
        res.status(401).send({
            error: '로그인 후 사용하세요.'
        })
        return
    }
    //토큰 검증 
    //복호화 되면 유효한 토큰
    console.log("토큰 검증")
    try {
        const { userId } = jwt.verify(tokenValue, key);
        //db에서 해당 userId와 맞는 유저 찾아서 그 유저를 locals에 넣어준다.
        User.findOne({ userNum: Number(userId) }).then((user) => {
            //토큰 검증한 걸 userId에 넣어주고 
            res.locals.user = user;
            next();
        });
        //검증 실패시
    } catch {
        res.status(401).json({
            error: "로그인 먼저 해주세요!"
        });
        return;
    }

};