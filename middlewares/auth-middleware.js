const jwt = require("jsonwebtoken")
const { User } = require("../models/users")

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    console.log("미들웨어 들어옴")
    const [tokenType, tokenValue] = authorization.split(" ");
    console.log(tokenType)
    console.log(tokenValue)

    if (tokenType !== "Bearer") {
        res.status(401).send({
            success: false, msg: "로그인 후 사용하세요!;"
        });
        return;
    }
    //토큰 검증 
    //복호화 되면 유효한 토큰
    console.log("토큰 검증")
    try {
        const { userId } = jwt.verify(tokenValue, process.env.SECERTKEY);
        console.log(userId)
        //db에서 해당 userId와 맞는 유저 찾아서 그 유저를 locals에 넣어준다.

        //여기 검증이 안됨
        User.findById(userId).exec().then((user) => {
            //토큰 검증한 걸 userId에 넣어주고 
            res.locals.user = user;
            next();
        });

        //검증 실패시
    } catch {
        res.send({
            success: false, msg: "로그인 실패!;"
        });
        return;
    }

};